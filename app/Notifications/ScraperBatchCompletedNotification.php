<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ScraperBatchCompletedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly int    $batchId,
        public readonly int    $totalJobs,
        public readonly int    $completedJobs,
        public readonly int    $failedJobs,
        public readonly int    $foundLeads,
        public readonly string $status,
    ) {}

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        $isSuccess  = $this->status === 'completed';
        $statusText = $isSuccess ? 'completed successfully' : 'completed with errors';
        $emoji      = $isSuccess ? '✅' : '⚠️';

        $mail = (new MailMessage)
            ->subject("{$emoji} Lead Batch #{$this->batchId} {$statusText}")
            ->greeting('Hello ' . ($notifiable->name ?? 'User') . ',')
            ->line("Your lead generation batch has {$statusText}.")
            ->line('')
            ->line("**Batch ID:** #{$this->batchId}")
            ->line("**Total Jobs:** {$this->totalJobs}")
            ->line("**Completed:** {$this->completedJobs}")
            ->line("**Failed:** {$this->failedJobs}")
            ->line("**Leads Found:** {$this->foundLeads}");

        if ($this->failedJobs > 0) {
            $mail->line('');
            $mail->line("{$this->failedJobs} job(s) failed. You may re-run the generator for the affected keywords or locations.");
        }

        return $mail
            ->action('View Generator', url('/admin/generator-new'))
            ->line('Thank you for using Customer Near Me.');
    }

    public function toArray($notifiable): array
    {
        $isSuccess = $this->status === 'completed';

        return [
            'type'           => 'scraper_batch_completed',
            'title'          => $isSuccess
                ? "Batch #{$this->batchId} Completed"
                : "Batch #{$this->batchId} Finished with Errors",
            'message'        => "Found {$this->foundLeads} leads across {$this->completedJobs}/{$this->totalJobs} jobs." .
                                ($this->failedJobs > 0 ? " ({$this->failedJobs} failed)" : ''),
            'batch_id'       => $this->batchId,
            'total_jobs'     => $this->totalJobs,
            'completed_jobs' => $this->completedJobs,
            'failed_jobs'    => $this->failedJobs,
            'found_leads'    => $this->foundLeads,
            'status'         => $this->status,
            'link'           => url('/admin/generator-new'),
        ];
    }
}
