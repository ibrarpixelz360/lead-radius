<?php

namespace App\Jobs;

use App\Models\LeadScraperBatch;
use App\Models\LeadScraperLog;
use App\Services\ScraperService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class RunLeadScraperJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 1980; // 33 min
    public int $tries   = 2;
    public int $backoff = 90;

    public function __construct(
        public readonly string  $query,
        public readonly string  $location,
        public readonly int     $limit,
        public readonly int     $batchId,
        public readonly ?int    $userId   = null,
        public readonly ?int    $searchId = null,
        public readonly string  $source   = 'google_maps',
    ) {}

    public function handle(ScraperService $service): void
    {
        Log::info('RunLeadScraperJob: starting execution', [
            'query'    => $this->query,
            'location' => $this->location,
            'batch_id' => $this->batchId,
            'attempt'  => $this->attempts(),
        ]);

        $service->scrape(
            query:    $this->query,
            location: $this->location,
            limit:    $this->limit,
            batchId:  $this->batchId,
            userId:   $this->userId,
            searchId: $this->searchId,
            source:   $this->source,
        );
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('RunLeadScraperJob: permanently failed', [
            'query'    => $this->query,
            'batch_id' => $this->batchId,
            'error'    => $exception->getMessage(),
        ]);

        LeadScraperLog::error(
            $this->batchId,
            "Job failed for '{$this->query}' @ '{$this->location}': " . $exception->getMessage(),
            ['trace' => substr($exception->getTraceAsString(), 0, 1000)]
        );

        $batch = LeadScraperBatch::find($this->batchId);
        if (!$batch) return;

        $batch->incrementFailed();
    }

    public function uniqueId(): string
    {
        return "scraper:{$this->batchId}:" . md5("{$this->query}:{$this->location}");
    }
}
