<?php

namespace App\Filament\Pages;

use App\Models\Lead;
use App\Models\LeadCategory;
use App\Models\LeadScraperBatch;
use App\Models\LeadScraperLog;
use App\Services\ScraperService;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;

class GeneratorNew extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-sparkles';
    protected static ?string $navigationGroup = 'Lead Generation';
    protected static ?string $navigationLabel = 'Google Maps Generator';
    protected static ?string $title = 'Lead Generator (Google Maps)';
    protected static ?string $slug = 'generator-new';

    protected static string $view = 'filament.pages.generator-new';

    public static function canAccess(): bool
    {
        $user = Auth::user();

        return $user && $user->status === 'active';
    }

    // Keyword & Category State
    public array  $keywords             = [];
    public string $categoryInput        = '';
    public array  $predefinedCategories = [];

    // Location State
    public array  $selectedStates       = [];
    public string $customLocation       = '';

    // Generation Parameters
    public int    $limit                = 50;

    // Batch & Progress Tracking
    public ?int   $batchId              = null;
    public bool   $isProcessing         = false;
    public bool   $generationFinished   = false;
    public int    $batchProgress        = 0;
    public int    $batchTotalJobs       = 0;
    public int    $batchCompletedJobs   = 0;
    public int    $batchFailedJobs      = 0;
    public int    $batchTotalLeads      = 0;

    // History & Logs Inspection
    public ?int   $viewingBatchId       = null;
    public array  $viewingBatchLogs     = [];
    public string $activeTab            = 'generator'; // 'generator' | 'history'

    const STATES = [
        ['name' => 'Queensland',                   'short' => 'QLD'],
        ['name' => 'New South Wales',              'short' => 'NSW'],
        ['name' => 'Victoria',                     'short' => 'VIC'],
        ['name' => 'Western Australia',            'short' => 'WA'],
        ['name' => 'South Australia',              'short' => 'SA'],
        ['name' => 'Tasmania',                     'short' => 'TAS'],
        ['name' => 'Northern Territory',           'short' => 'NT'],
        ['name' => 'Australian Capital Territory', 'short' => 'ACT'],
    ];

    public function mount(): void
    {
        $this->loadCategories();

        // Check if there is an active running batch for the user
        $runningBatch = LeadScraperBatch::where('user_id', Auth::id())
            ->whereIn('status', ['pending', 'processing'])
            ->latest()
            ->first();

        if ($runningBatch) {
            $this->batchId            = $runningBatch->id;
            $this->isProcessing       = true;
            $this->batchTotalJobs     = $runningBatch->total_jobs;
            $this->batchCompletedJobs = $runningBatch->completed_jobs;
            $this->batchFailedJobs    = $runningBatch->failed_jobs;
            $this->batchTotalLeads    = $runningBatch->found_leads;
            $this->checkProgress();
        }
    }

    public function loadCategories(): void
    {
        $this->predefinedCategories = LeadCategory::orderBy('name')->pluck('name')->toArray();
    }

    public function saveCustomCategory(string $name): void
    {
        $name = Str::title(trim($name));
        if ($name === '') return;

        LeadCategory::firstOrCreate(['name' => $name]);
        $this->loadCategories();

        if (!in_array($name, $this->keywords, true)) {
            $this->keywords[] = $name;
        }
    }

    public function toggleKeyword(string $cat): void
    {
        if (in_array($cat, $this->keywords, true)) {
            $this->keywords = array_values(array_filter($this->keywords, fn($k) => $k !== $cat));
        } else {
            $this->keywords[] = $cat;
        }
    }

    public function selectAllKeywords(): void
    {
        $this->keywords = array_unique(array_merge($this->keywords, $this->predefinedCategories));
    }

    public function clearAllKeywords(): void
    {
        $this->keywords = [];
    }

    public function toggleState(string $state): void
    {
        if (in_array($state, $this->selectedStates, true)) {
            $this->selectedStates = array_values(array_filter($this->selectedStates, fn($s) => $s !== $state));
        } else {
            $this->selectedStates[] = $state;
        }
    }

    public function selectAllStates(): void
    {
        $this->selectedStates = array_column(self::STATES, 'name');
    }

    public function clearAllStates(): void
    {
        $this->selectedStates = [];
    }

    public function generate(): void
    {
        $this->validate([
            'keywords' => 'required|array|min:1',
            'limit'    => 'required|integer|min:10|max:200',
        ], [
            'keywords.required' => 'Select at least one category or keyword.',
            'keywords.min'      => 'Select at least one category or keyword.',
            'limit.min'         => 'Minimum lead limit is 10.',
            'limit.max'         => 'Maximum lead limit is 200.',
        ]);

        $locations = [];

        foreach ($this->selectedStates as $state) {
            $locations[] = "{$state}, Australia";
        }

        if (trim($this->customLocation) !== '') {
            $locations[] = trim($this->customLocation);
        }

        if (empty($locations)) {
            $this->addError('selectedStates', 'Select at least one state or enter a custom location.');
            return;
        }

        $totalJobs   = count($this->keywords) * count($locations);
        $limitPerJob = max(1, (int) ceil($this->limit / $totalJobs));

        $batch = app(ScraperService::class)->dispatchBatch(
            categories:     $this->keywords,
            locations:      $locations,
            limit:          $limitPerJob,
            userId:         Auth::id(),
            searchId:       null,
            source:         'google_maps',
            queue:          config('scraper.queue', 'default'),
            totalRequested: $this->limit,
        );

        $this->batchId            = $batch->id;
        $this->batchTotalJobs     = $totalJobs;
        $this->batchCompletedJobs = 0;
        $this->batchFailedJobs    = 0;
        $this->batchTotalLeads    = 0;
        $this->batchProgress      = 0;
        $this->isProcessing       = true;
        $this->generationFinished = false;

        Notification::make()
            ->title('Lead Generator Started')
            ->body("Dispatched {$totalJobs} job(s) for {$this->limit} leads.")
            ->success()
            ->send();
    }

    public function checkProgress(): void
    {
        if (!$this->batchId) return;

        $batch = LeadScraperBatch::find($this->batchId);
        if (!$batch) return;

        $this->batchTotalJobs     = $batch->total_jobs;
        $this->batchCompletedJobs = $batch->completed_jobs;
        $this->batchFailedJobs    = $batch->failed_jobs;
        $this->batchTotalLeads    = $batch->found_leads;

        $done = $batch->completed_jobs + $batch->failed_jobs;
        $this->batchProgress = $batch->total_jobs > 0
            ? min(99, (int) floor(($done / $batch->total_jobs) * 100))
            : 0;

        if ($batch->status === 'completed' || ($batch->total_jobs > 0 && $done >= $batch->total_jobs)) {
            $this->isProcessing       = false;
            $this->generationFinished = true;
            $this->batchProgress      = 100;

            Notification::make()
                ->title('Lead Generation Completed')
                ->body("Found {$batch->found_leads} leads across {$batch->completed_jobs} job(s).")
                ->success()
                ->send();
        } elseif ($batch->status === 'failed') {
            $this->isProcessing       = false;
            $this->generationFinished = true;

            Notification::make()
                ->title('Lead Generation Failed')
                ->body("Batch failed. Check execution logs for details.")
                ->danger()
                ->send();
        }
    }

    public function resetGenerator(): void
    {
        $this->batchId            = null;
        $this->isProcessing       = false;
        $this->generationFinished = false;
        $this->batchProgress      = 0;
        $this->batchTotalJobs     = 0;
        $this->batchCompletedJobs = 0;
        $this->batchFailedJobs    = 0;
        $this->batchTotalLeads    = 0;
    }

    public function viewLogs(int $batchId): void
    {
        $user = Auth::user();
        $batch = LeadScraperBatch::findOrFail($batchId);

        if ($user && !$user->isAdmin() && $batch->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this batch.');
        }

        $this->viewingBatchId = $batchId;
        $this->viewingBatchLogs = LeadScraperLog::where('lead_scraper_batch_id', $batchId)
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(fn($log) => [
                'level'      => $log->level,
                'message'    => $log->message,
                'context'    => $log->context,
                'created_at' => $log->created_at?->format('H:i:s'),
            ])
            ->toArray();
    }

    public function closeLogsModal(): void
    {
        $this->viewingBatchId   = null;
        $this->viewingBatchLogs = [];
    }

    public function exportBatchCsv(int $batchId): StreamedResponse
    {
        $user = Auth::user();
        $batch = LeadScraperBatch::findOrFail($batchId);

        if ($user && !$user->isAdmin() && $batch->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this batch.');
        }

        $fileName = "leads_batch_{$batchId}_" . date('Ymd_His') . ".csv";

        return response()->streamDownload(function () use ($batchId) {
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

            Lead::where('lead_scraper_batch_id', $batchId)
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

    public function getViewData(): array
    {
        $user = Auth::user();
        $isAdmin = $user && $user->isAdmin();

        $batchesQuery = LeadScraperBatch::withCount('leads')->latest();
        if (!$isAdmin && $user) {
            $batchesQuery->where('user_id', $user->id);
        }
        $recentBatches = $batchesQuery->take(20)->get();

        if ($this->batchId) {
            $recentLeads = Lead::where('lead_scraper_batch_id', $this->batchId)->latest()->take(25)->get();
        } else {
            $leadsQuery = Lead::latest();
            if (!$isAdmin && $user) {
                $leadsQuery->where(function ($q) use ($user) {
                    $q->whereHas('batch', fn ($b) => $b->where('user_id', $user->id))
                      ->orWhereHas('users', fn ($u) => $u->where('users.id', $user->id));
                });
            }
            $recentLeads = $leadsQuery->take(10)->get();
        }

        return [
            'states'        => self::STATES,
            'recentBatches' => $recentBatches,
            'recentLeads'   => $recentLeads,
        ];
    }
}
