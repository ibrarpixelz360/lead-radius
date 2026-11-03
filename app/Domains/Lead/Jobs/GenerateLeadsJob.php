<?php

namespace App\Domains\Lead\Jobs;

use App\Domains\Lead\Scrapers\GoogleMapsScraper;
use App\Domains\Lead\Services\LeadDeduplicator;
use App\Domains\Lead\Services\LeadScoringService;
use App\Models\Lead;
use App\Models\LeadUser;
use App\Models\Search;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Throwable;

class GenerateLeadsJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $timeout = 600;
    public $backoff = 60;

    public function __construct(public Search $search)
    {
        $this->onQueue('scraping');
    }

    public function uniqueId(): string
    {
        return "search-{$this->search->id}";
    }

    public function uniqueFor(): int
    {
        return 3600;
    }

    public function handle(
        GoogleMapsScraper $scraper,
        LeadDeduplicator $dedup,
        LeadScoringService $scoring,
    ): void {
        // Idempotency guard
        if ($this->search->status === 'completed') {
            return;
        }

        $start = microtime(true);
        $this->search->update(['status' => 'running']);

        try {
            $rawLeads = $scraper->scrape($this->search);

            $created = 0;
            $matched = 0;

            foreach ($rawLeads as $data) {
                if (! $this->passesFilters($data)) continue;

                [$lead, $wasCreated] = $dedup->upsert($data);
                $scoring->scoreAndPersist($lead);

                $this->attachToUser($lead);
                $this->maybeEnrich($lead);

                $wasCreated ? $created++ : $matched++;
            }

            $this->search->update([
                'status' => 'completed',
                'results_count' => $created + $matched,
                'duration_seconds' => (int) (microtime(true) - $start),
                'error_message' => null,
            ]);

            Log::info("GenerateLeadsJob completed", [
                'search_id' => $this->search->id,
                'created' => $created,
                'matched' => $matched,
            ]);
        } catch (Throwable $e) {
            $this->search->update([
                'status' => 'failed',
                'error_message' => substr($e->getMessage(), 0, 500),
            ]);
            throw $e;
        }
    }

    /**
     * Apply user-specified filters (require_email/phone/website, min_rating, min_reviews).
     */
    protected function passesFilters(array $data): bool
    {
        if ($this->search->require_email && empty($data['email'])) {
            // Email might be filled by enrichment job — don't reject here yet.
        }
        if ($this->search->require_phone && empty($data['phone'])) return false;
        if ($this->search->require_website && empty($data['website'])) return false;

        if ($this->search->min_rating !== null
            && (($data['rating'] ?? null) === null || (float) $data['rating'] < (float) $this->search->min_rating)) {
            return false;
        }
        if ($this->search->min_reviews !== null
            && (int) ($data['reviews_count'] ?? 0) < (int) $this->search->min_reviews) {
            return false;
        }
        return true;
    }

    protected function attachToUser(Lead $lead): void
    {
        // 1. User ownership — unique per (user, lead). Use firstOrCreate to avoid
        //    overwriting the user's existing relationship data (notes, status, etc.)
        LeadUser::firstOrCreate(
            ['user_id' => $this->search->user_id, 'lead_id' => $lead->id],
            [
                'search_id' => $this->search->id,
                'status' => 'new',
                'is_favorite' => false,
                'is_archived' => false,
            ]
        );

        // 2. Search→lead mapping — dedicated table, unique per (search, lead).
        //    This is what $search->leads() queries, independently of user ownership.
        $this->search->leads()->syncWithoutDetaching([$lead->id]);
    }

    protected function maybeEnrich(Lead $lead): void
    {
        if (! empty($lead->website) && empty($lead->email)) {
            EnrichLeadJob::dispatch($lead)->onQueue('enrichment');
        }
    }

    public function failed(Throwable $e): void
    {
        $this->search->update([
            'status' => 'failed',
            'error_message' => substr($e->getMessage(), 0, 500),
        ]);
    }
}
