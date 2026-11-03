<?php

namespace App\Models;

use App\Notifications\ScraperBatchCompletedNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LeadScraperBatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'search_id',
        'source',
        'query',
        'location',
        'total_jobs',
        'completed_jobs',
        'failed_jobs',
        'found_leads',
        'total_requested',
        'status',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'started_at'   => 'datetime',
        'completed_at' => 'datetime',
        'query'        => 'array',
        'location'     => 'array',
    ];

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function search(): BelongsTo
    {
        return $this->belongsTo(Search::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(LeadScraperLog::class, 'lead_scraper_batch_id')->orderBy('created_at', 'desc');
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class, 'lead_scraper_batch_id');
    }

    // -------------------------------------------------------
    // Computed Attributes
    // -------------------------------------------------------

    public function getProgressAttribute(): int
    {
        if ($this->total_jobs === 0) {
            return 0;
        }

        $done = $this->completed_jobs + $this->failed_jobs;
        return (int) min(100, floor(($done / $this->total_jobs) * 100));
    }

    public function isFinished(): bool
    {
        return in_array($this->status, ['completed', 'failed'], true);
    }

    // -------------------------------------------------------
    // State Transitions
    // -------------------------------------------------------

    public function markCompleted(): void
    {
        $this->update([
            'status'       => 'completed',
            'completed_at' => now(),
        ]);

        $this->notifyUser('completed');
    }

    public function markFailed(): void
    {
        $this->update([
            'status'       => 'failed',
            'completed_at' => now(),
        ]);

        $this->notifyUser('failed');
    }

    public function incrementCompleted(int $foundLeads = 0): void
    {
        $this->increment('completed_jobs');
        if ($foundLeads > 0) {
            $this->increment('found_leads', $foundLeads);
        }
        $this->tryFinalize();
    }

    public function incrementFailed(): void
    {
        $this->increment('failed_jobs');
        $this->tryFinalize();
    }

    private function tryFinalize(): void
    {
        $this->refresh();
        $done = $this->completed_jobs + $this->failed_jobs;

        if ($done >= $this->total_jobs && $this->total_jobs > 0) {
            if ($this->failed_jobs > 0 && $this->completed_jobs === 0) {
                $this->markFailed();
            } else {
                $this->markCompleted();
            }
        }
    }

    private function notifyUser(string $status): void
    {
        if (!$this->user_id) {
            return;
        }

        $user = User::find($this->user_id);
        if (!$user) {
            return;
        }

        $this->refresh();

        try {
            $user->notify(new ScraperBatchCompletedNotification(
                batchId:       $this->id,
                totalJobs:     $this->total_jobs,
                completedJobs: $this->completed_jobs,
                failedJobs:    $this->failed_jobs,
                foundLeads:    $this->found_leads,
                status:        $status,
            ));
        } catch (\Throwable $e) {
            // Notification failure should never crash the batch completion
            \Illuminate\Support\Facades\Log::warning("Failed to dispatch scraper completion notification: " . $e->getMessage());
        }
    }
}
