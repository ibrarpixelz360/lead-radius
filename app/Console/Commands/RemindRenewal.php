<?php

namespace App\Console\Commands;

use App\Models\Subscription;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class RemindRenewal extends Command
{
    protected $signature = 'subscriptions:remind-renewal';
    protected $description = 'Email users whose subscriptions are about to expire (5 days, 2 days).';

    public function handle(): int
    {
        // Reminders at 5 days and 2 days before expiry
        foreach ([5, 2] as $daysOut) {
            $start = now()->addDays($daysOut)->startOfDay();
            $end = now()->addDays($daysOut)->endOfDay();

            $subs = Subscription::with('user')
                ->whereIn('status', ['active', 'trial'])
                ->whereBetween('ends_at', [$start, $end])
                ->get();

            foreach ($subs as $sub) {
                // In a future phase, replace with proper notification class.
                // For now, log so we know it ran.
                $this->info("Reminder: {$sub->user->email} expires in {$daysOut} days.");
            }
        }

        return self::SUCCESS;
    }
}
