<?php

namespace App\Domains\Lead\Jobs;

use App\Domains\Lead\Scrapers\EmailExtractor;
use App\Domains\Lead\Services\LeadScoringService;
use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Throwable;

class EnrichLeadJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 2;
    public $timeout = 120;

    public function __construct(public Lead $lead)
    {
        $this->onQueue('enrichment');
    }

    public function handle(EmailExtractor $extractor, LeadScoringService $scoring): void
    {
        if (empty($this->lead->website) || ! empty($this->lead->email)) {
            return;
        }

        try {
            $email = $extractor->extract($this->lead->website);

            if ($email) {
                $this->lead->update(['email' => $email]);
                $scoring->scoreAndPersist($this->lead->fresh());
            }
        } catch (Throwable $e) {
            Log::warning("EnrichLeadJob failed for lead {$this->lead->id}: {$e->getMessage()}");
            // Soft-fail — enrichment is best-effort
        }
    }
}
