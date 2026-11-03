<?php

namespace App\Http\Controllers\Web;

use App\Domains\Lead\Jobs\GenerateLeadsJob;
use App\Http\Controllers\Controller;
use App\Http\Requests\Lead\LeadSearchRequest;
use App\Models\Lead;
use App\Models\LeadCategory;
use App\Models\LeadScraperBatch;
use App\Models\LeadScraperLog;
use App\Models\SavedSearch;
use App\Models\Search;
use App\Services\ScraperService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LeadSearchController extends Controller
{
    /**
     * Render the search and generator form.
     */
    public function create(Request $request): Response
    {
        $user = $request->user();

        // Check for an active batch in progress for this user
        $activeBatch = LeadScraperBatch::where('user_id', $user->id)
            ->whereIn('status', ['processing', 'queued'])
            ->latest('id')
            ->first();

        // Recent scraper batches for this user
        $recentBatches = LeadScraperBatch::where('user_id', $user->id)
            ->withCount('leads')
            ->latest('id')
            ->limit(15)
            ->get()
            ->map(fn ($b) => [
                'id'             => $b->id,
                'query'          => $b->query,
                'location'       => $b->location,
                'status'         => $b->status,
                'total_jobs'     => $b->total_jobs,
                'completed_jobs' => $b->completed_jobs,
                'failed_jobs'    => $b->failed_jobs,
                'found_leads'    => $b->found_leads,
                'leads_count'    => $b->leads_count,
                'created_at'     => $b->created_at?->toDateTimeString(),
            ]);

        // Predefined categories from database
        $predefinedCategories = LeadCategory::orderBy('name')
            ->pluck('name')
            ->values();

        return Inertia::render('Leads/Search', [
            'predefined_categories' => $predefinedCategories,
            'australian_states'     => [
                ['code' => 'NSW', 'name' => 'New South Wales'],
                ['code' => 'VIC', 'name' => 'Victoria'],
                ['code' => 'QLD', 'name' => 'Queensland'],
                ['code' => 'WA',  'name' => 'Western Australia'],
                ['code' => 'SA',  'name' => 'South Australia'],
                ['code' => 'TAS', 'name' => 'Tasmania'],
                ['code' => 'ACT', 'name' => 'Australian Capital Territory'],
                ['code' => 'NT',  'name' => 'Northern Territory'],
            ],
            'recent_batches'  => $recentBatches,
            'active_batch_id' => $activeBatch?->id,
            'recent_searches' => $user->searches()
                ->latest()
                ->limit(5)
                ->get(['id', 'query', 'city', 'country', 'status', 'results_count', 'created_at']),
            'saved_searches'  => $user->savedSearches()
                ->latest()
                ->limit(10)
                ->get(['id', 'name', 'filters']),
        ]);
    }

    /**
     * Start a new Python Lead Generator batch from the client portal.
     */
    public function startGenerator(Request $request, ScraperService $scraperService): JsonResponse
    {
        $validated = $request->validate([
            'keywords'          => ['required', 'array', 'min:1'],
            'keywords.*'        => ['required', 'string', 'max:100'],
            'selected_states'   => ['nullable', 'array'],
            'selected_states.*' => ['string', 'max:100'],
            'custom_location'   => ['nullable', 'string', 'max:255'],
            'limit'             => ['required', 'integer', 'min:10', 'max:500'],
        ]);

        $keywords = array_values(array_unique(array_filter(array_map('trim', $validated['keywords']))));
        if (empty($keywords)) {
            return response()->json(['message' => 'Please provide at least one valid keyword or category.'], 422);
        }

        $locations = [];
        if (! empty($validated['selected_states'])) {
            foreach ($validated['selected_states'] as $state) {
                $locations[] = "{$state}, Australia";
            }
        }

        if (! empty($validated['custom_location']) && trim($validated['custom_location']) !== '') {
            $locations[] = trim($validated['custom_location']);
        }

        if (empty($locations)) {
            return response()->json(['message' => 'Please select at least one state or enter a custom location.'], 422);
        }

        $totalJobs = count($keywords) * count($locations);
        $limitPerJob = max(1, (int) ceil($validated['limit'] / $totalJobs));

        // Create linked Search model for user search history
        $firstLocation = $locations[0];
        $search = $request->user()->searches()->create([
            'query'           => implode(', ', $keywords),
            'city'            => count($locations) === 1 ? $firstLocation : 'Multiple Locations',
            'country'         => 'Australia',
            'status'          => 'running',
            'radius_km'       => 10,
            'metadata'        => [
                'generator'       => true,
                'keywords'        => $keywords,
                'locations'       => $locations,
                'total_requested' => $validated['limit'],
            ],
        ]);

        $batch = $scraperService->dispatchBatch(
            categories:     $keywords,
            locations:      $locations,
            limit:          $limitPerJob,
            userId:         $request->user()->id,
            searchId:       $search->id,
            source:         'google_maps',
            queue:          config('scraper.queue', 'default'),
            totalRequested: $validated['limit'],
        );

        return response()->json([
            'success'    => true,
            'batch_id'   => $batch->id,
            'search_id'  => $search->id,
            'total_jobs' => $batch->total_jobs,
            'message'    => "Dispatched {$batch->total_jobs} job(s) for {$validated['limit']} leads.",
        ]);
    }

    /**
     * AJAX status endpoint for real-time polling of a generator batch.
     */
    public function batchStatus(Request $request, LeadScraperBatch $batch): JsonResponse
    {
        $user = $request->user();
        if ($user && ! $user->isAdmin() && $batch->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this batch.');
        }

        $done = $batch->completed_jobs + $batch->failed_jobs;
        $progress = $batch->total_jobs > 0
            ? min(100, (int) round(($done / $batch->total_jobs) * 100))
            : 0;

        $isFinished = in_array($batch->status, ['completed', 'failed', 'cancelled'], true);

        // Fetch recent logs
        $logs = LeadScraperLog::where('lead_scraper_batch_id', $batch->id)
            ->latest('id')
            ->limit(40)
            ->get(['id', 'level', 'message', 'context', 'created_at'])
            ->map(fn ($log) => [
                'id'         => $log->id,
                'level'      => $log->level,
                'message'    => $log->message,
                'created_at' => $log->created_at?->format('H:i:s'),
            ])
            ->reverse()
            ->values();

        // Fetch recent leads scraped in this batch
        $leads = Lead::where('lead_scraper_batch_id', $batch->id)
            ->latest('id')
            ->limit(50)
            ->get([
                'id',
                'business_name',
                'category',
                'phone',
                'email',
                'website',
                'city',
                'state',
                'rating',
                'reviews_count',
                'ai_score',
                'ai_category',
            ]);

        return response()->json([
            'id'             => $batch->id,
            'status'         => $batch->status,
            'total_jobs'     => $batch->total_jobs,
            'completed_jobs' => $batch->completed_jobs,
            'failed_jobs'    => $batch->failed_jobs,
            'found_leads'    => $batch->found_leads,
            'progress'       => $progress,
            'is_finished'    => $isFinished,
            'logs'           => $logs,
            'leads'          => $leads,
        ]);
    }

    /**
     * Download CSV export for a generator batch.
     */
    public function batchExport(Request $request, LeadScraperBatch $batch): StreamedResponse
    {
        $user = $request->user();
        if ($user && ! $user->isAdmin() && $batch->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this batch.');
        }

        $fileName = "leads_batch_{$batch->id}_" . date('Ymd_His') . ".csv";

        return response()->streamDownload(function () use ($batch) {
            $handle = fopen('php://output', 'w');

            // Header row
            fputcsv($handle, [
                'ID',
                'Business Name',
                'Category',
                'Phone',
                'Website',
                'Address',
                'City',
                'State',
                'Country',
                'Rating',
                'Reviews Count',
                'AI Score',
                'AI Category',
                'Google Place ID',
                'Scraped At',
            ]);

            Lead::where('lead_scraper_batch_id', $batch->id)
                ->chunk(100, function ($leads) use ($handle) {
                    foreach ($leads as $lead) {
                        fputcsv($handle, [
                            $lead->id,
                            $lead->business_name,
                            $lead->category,
                            $lead->phone,
                            $lead->website,
                            $lead->address,
                            $lead->city,
                            $lead->state,
                            $lead->country,
                            $lead->rating,
                            $lead->reviews_count,
                            $lead->ai_score,
                            $lead->ai_category,
                            $lead->google_place_id,
                            $lead->created_at?->toDateTimeString(),
                        ]);
                    }
                });

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    /**
     * Cancel a running generator batch.
     */
    public function batchCancel(Request $request, LeadScraperBatch $batch): JsonResponse
    {
        $user = $request->user();
        if ($user && ! $user->isAdmin() && $batch->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this batch.');
        }

        if (in_array($batch->status, ['processing', 'queued'], true)) {
            $batch->update(['status' => 'cancelled']);
            LeadScraperLog::warning($batch->id, 'Batch cancelled by user.');
            if ($batch->search) {
                $batch->search->update(['status' => 'cancelled']);
            }
        }

        return response()->json(['success' => true, 'message' => 'Batch cancelled.']);
    }

    /**
     * Submit a new classic search → queue the scrape.
     */
    public function store(LeadSearchRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $saveName = $data['save_search_name'] ?? null;
        $shouldSave = ! empty($data['save_search']);
        unset($data['save_search'], $data['save_search_name']);

        $search = $request->user()->searches()->create($data);

        if ($shouldSave) {
            SavedSearch::create([
                'user_id' => $request->user()->id,
                'name'    => $saveName ?: ($data['query'].' in '.$data['city']),
                'filters' => $data,
            ]);
        }

        GenerateLeadsJob::dispatch($search);

        return redirect()->route('leads.searches.show', $search)
            ->with('success', 'Search started. Leads will appear here as they are scraped.');
    }

    /**
     * List of all user's searches.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Leads/SearchHistory', [
            'searches' => $request->user()->searches()
                ->latest()
                ->paginate(20)
                ->through(fn ($s) => [
                    'id'               => $s->id,
                    'query'            => $s->query,
                    'city'             => $s->city,
                    'country'          => $s->country,
                    'status'           => $s->status,
                    'results_count'    => $s->results_count,
                    'duration_seconds' => $s->duration_seconds,
                    'created_at'       => $s->created_at,
                ]),
        ]);
    }

    /**
     * Show a single search with its current status + leads.
     */
    public function show(Request $request, Search $search): Response
    {
        abort_unless($search->user_id === $request->user()->id, 403);

        return Inertia::render('Leads/SearchDetail', [
            'search' => $search,
            'leads'  => $search->leads()
                ->paginate(50)
                ->through(fn ($lead) => $this->formatLead($lead)),
        ]);
    }

    /**
     * AJAX poll endpoint for live progress on search status.
     */
    public function status(Request $request, Search $search)
    {
        abort_unless($search->user_id === $request->user()->id, 403);

        return response()->json([
            'status'        => $search->status,
            'results_count' => $search->results_count,
            'error_message' => $search->error_message,
        ]);
    }

    /**
     * Cancel a running search (if still queued).
     */
    public function cancel(Request $request, Search $search): RedirectResponse
    {
        abort_unless($search->user_id === $request->user()->id, 403);

        if (in_array($search->status, ['queued', 'running'], true)) {
            $search->update(['status' => 'cancelled']);
        }

        return back()->with('message', 'Search cancelled.');
    }

    protected function formatLead($lead): array
    {
        return [
            'id'            => $lead->id,
            'business_name' => $lead->business_name,
            'category'      => $lead->category,
            'phone'         => $lead->phone,
            'email'         => $lead->email,
            'website'       => $lead->website,
            'city'          => $lead->city,
            'rating'        => $lead->rating,
            'reviews_count' => $lead->reviews_count,
            'ai_score'      => $lead->ai_score,
            'ai_category'   => $lead->ai_category,
        ];
    }
}
