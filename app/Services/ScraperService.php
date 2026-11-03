<?php

namespace App\Services;

use App\Domains\Lead\Jobs\EnrichLeadJob;
use App\Domains\Lead\Services\LeadDeduplicator;
use App\Domains\Lead\Services\LeadScoringService;
use App\Jobs\RunLeadScraperJob;
use App\Models\Lead;
use App\Models\LeadScraperBatch;
use App\Models\LeadScraperLog;
use App\Models\LeadUser;
use App\Models\Search;
use Illuminate\Support\Facades\Log;

class ScraperService
{
    public function __construct(
        private readonly PythonProcessService $python,
        private readonly LeadDeduplicator     $deduplicator,
        private readonly LeadScoringService   $scoringService,
    ) {}

    /**
     * Create a new LeadScraperBatch for multi-category and multi-location run.
     */
    public function createBatch(
        array   $categories,
        array   $locations,
        int     $limit,
        ?int    $userId         = null,
        ?int    $searchId       = null,
        string  $source         = 'google_maps',
        ?int    $totalRequested = null,
    ): LeadScraperBatch {
        $totalJobs = max(1, count($categories) * count($locations));

        $batch = LeadScraperBatch::create([
            'user_id'         => $userId,
            'search_id'       => $searchId,
            'query'           => array_values($categories),
            'location'        => array_values($locations),
            'source'          => $source,
            'total_jobs'      => $totalJobs,
            'completed_jobs'  => 0,
            'failed_jobs'     => 0,
            'found_leads'     => 0,
            'total_requested' => $totalRequested ?? $limit,
            'status'          => 'processing',
            'started_at'      => now(),
        ]);

        LeadScraperLog::info($batch->id, "Batch created: {$totalJobs} jobs queued", [
            'categories' => $categories,
            'locations'  => $locations,
            'limit'      => $limit,
            'source'     => $source,
        ]);

        return $batch;
    }

    /**
     * Create batch + dispatch one RunLeadScraperJob per category & location pair.
     */
    public function dispatchBatch(
        array   $categories,
        array   $locations,
        int     $limit,
        ?int    $userId         = null,
        ?int    $searchId       = null,
        string  $source         = 'google_maps',
        ?string $queue          = null,
        ?int    $totalRequested = null,
    ): LeadScraperBatch {
        $queueName = $queue ?? config('scraper.queue', 'default');
        $batch = $this->createBatch($categories, $locations, $limit, $userId, $searchId, $source, $totalRequested);

        $totalJobs = max(1, count($categories) * count($locations));
        $effectiveLimit = $limit;

        foreach ($categories as $category) {
            foreach ($locations as $location) {
                $locationStr = is_array($location) ? ($location['address'] ?? '') : $location;

                RunLeadScraperJob::dispatch(
                    query:      (string) $category,
                    location:   (string) $locationStr,
                    limit:      $effectiveLimit,
                    batchId:    $batch->id,
                    userId:     $userId,
                    searchId:   $searchId,
                    source:     $source,
                )->onQueue($queueName);
            }
        }

        LeadScraperLog::info($batch->id, "All jobs dispatched to queue [{$queueName}]");

        return $batch;
    }

    /**
     * Run a single query + location scrape job (called from RunLeadScraperJob).
     *
     * @return int Number of newly inserted or updated leads.
     */
    public function scrape(
        string  $query,
        string  $location,
        int     $limit,
        int     $batchId,
        ?int    $userId   = null,
        ?int    $searchId = null,
        string  $source   = 'google_maps',
    ): int {
        $batch = LeadScraperBatch::find($batchId);

        LeadScraperLog::info($batchId, "Scrape started: '{$query}' at '{$location}'");

        try {
            $result    = $this->python->runScraper($query, $location, $limit, $batchId, $source);
            $rawLeads  = $result['leads'] ?? [];
            $meta      = $result['meta'] ?? [];
            $found     = $meta['total_found'] ?? count($rawLeads);

            LeadScraperLog::info($batchId, "Playwright scraper extracted {$found} leads", $meta);

            $processedCount = 0;
            $newLeadsCount  = 0;

            foreach ($rawLeads as $raw) {
                $leadData = $this->transformRawLead($raw, $query, $location, $batchId);

                // Use LeadRadius Deduplicator
                [$lead, $wasCreated] = $this->deduplicator->upsert($leadData);

                // Assign batch if not assigned
                if (!$lead->lead_scraper_batch_id) {
                    $lead->lead_scraper_batch_id = $batchId;
                    $lead->saveQuietly();
                }

                // AI scoring
                $this->scoringService->scoreAndPersist($lead);

                // Attach to user if authenticated
                if ($userId) {
                    LeadUser::firstOrCreate(
                        ['user_id' => $userId, 'lead_id' => $lead->id],
                        [
                            'search_id'   => $searchId,
                            'status'      => 'new',
                            'is_favorite' => false,
                            'is_archived' => false,
                        ]
                    );
                }

                // Attach to search if linked
                if ($searchId) {
                    $search = Search::find($searchId);
                    $search?->leads()->syncWithoutDetaching([$lead->id]);
                }

                // Optional enrichment: if lead has website but no email
                if (!empty($lead->website) && empty($lead->email)) {
                    try {
                        EnrichLeadJob::dispatch($lead)->onQueue('enrichment');
                    } catch (\Throwable) {
                        // ignore queue connection quirks for secondary enrichment
                    }
                }

                if ($wasCreated) {
                    $newLeadsCount++;
                }
                $processedCount++;
            }

            LeadScraperLog::info($batchId, "Ingested {$processedCount} leads ({$newLeadsCount} new, " . ($processedCount - $newLeadsCount) . " updated/matched)");

            $batch?->incrementCompleted($processedCount);

            return $processedCount;

        } catch (\Throwable $e) {
            LeadScraperLog::error($batchId, "Scrape execution failed: " . $e->getMessage(), [
                'query'    => $query,
                'location' => $location,
            ]);

            Log::error('ScraperService::scrape failed', [
                'batch_id' => $batchId,
                'query'    => $query,
                'location' => $location,
                'error'    => $e->getMessage(),
            ]);

            $batch?->incrementFailed();

            throw $e;
        }
    }

    /**
     * Transform raw scraper dictionary into standard Lead Radius lead schema.
     */
    public function transformRawLead(array $raw, string $query, string $location, int $batchId): array
    {
        $businessName = trim((string) ($raw['displayName'] ?? $raw['name'] ?? ''));
        if ($businessName === '') {
            $businessName = 'N/A';
        }

        // Parse location components
        $parsedLoc = $this->parseLocationString($location);

        $state = !empty($raw['state']) ? trim($raw['state']) : $parsedLoc['state'];
        $city  = $parsedLoc['city'];
        $country = $parsedLoc['country'];

        $category = !empty($raw['business_type']) ? $raw['business_type'] : null;
        if (empty($category) && !empty($raw['types']) && is_array($raw['types'])) {
            $category = implode(', ', $raw['types']);
        }
        if (empty($category)) {
            $category = $query;
        }

        $phone = !empty($raw['internationalPhoneNumber']) ? substr(trim($raw['internationalPhoneNumber']), 0, 40) : null;
        $website = !empty($raw['websiteUri']) ? substr(trim($raw['websiteUri']), 0, 500) : null;
        $address = !empty($raw['formattedAddress']) ? substr(trim($raw['formattedAddress']), 0, 500) : null;
        $placeId = !empty($raw['google_id']) ? substr(trim($raw['google_id']), 0, 120) : null;

        $rating = isset($raw['rating']) && is_numeric($raw['rating']) ? round((float) $raw['rating'], 1) : null;
        if ($rating !== null) {
            $rating = max(0.0, min(5.0, $rating));
        }

        $reviewsCount = isset($raw['user_rating_count']) && is_numeric($raw['user_rating_count']) ? max(0, (int) $raw['user_rating_count']) : 0;

        return [
            'lead_scraper_batch_id' => $batchId,
            'google_place_id'       => $placeId,
            'business_name'         => substr($businessName, 0, 255),
            'category'              => $category ? substr($category, 0, 120) : null,
            'phone'                 => $phone,
            'website'               => $website,
            'email'                 => null, // Enrichment fills this later
            'address'               => $address,
            'city'                  => substr($city ?: 'Unknown', 0, 120),
            'state'                 => $state ? substr($state, 0, 120) : null,
            'country'               => substr($country ?: 'Australia', 0, 80),
            'rating'                => $rating,
            'reviews_count'         => $reviewsCount,
            'hours'                 => null,
            'social_links'          => null,
            'photos'                => null,
        ];
    }

    /**
     * Parse city, state, country from strings like:
     * - "Brisbane QLD, Australia"
     * - "Sydney NSW, Australia"
     * - "Melbourne VIC, Australia"
     * - "Perth, Australia"
     */
    private function parseLocationString(string $location): array
    {
        $country = 'Australia';
        $state   = null;
        $city    = trim($location);

        if (str_contains($location, ',')) {
            $parts = array_map('trim', explode(',', $location));
            if (count($parts) >= 2) {
                $country = end($parts);
                $firstPart = $parts[0];

                // Check for state in the first part, e.g. "Brisbane QLD"
                $auStates = ['QLD', 'NSW', 'VIC', 'WA', 'SA', 'TAS', 'NT', 'ACT'];
                foreach ($auStates as $s) {
                    if (preg_match('/\b' . $s . '\b/i', $firstPart)) {
                        $state = strtoupper($s);
                        $city = trim(preg_replace('/\b' . $s . '\b/i', '', $firstPart));
                        break;
                    }
                }

                if (!$state) {
                    $city = $firstPart;
                }
            }
        }

        return [
            'city'    => $city,
            'state'   => $state,
            'country' => $country,
        ];
    }
}
