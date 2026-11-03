<?php

namespace App\Console\Commands;

use App\Models\Subscription;
use Illuminate\Console\Command;

class ExpireTrials extends Command
{
    protected $signature = 'trials:expire';
    protected $description = 'Mark expired trial subscriptions as expired.';

    public function handle(): int
    {
        $count = Subscription::where('status', 'trial')
            ->where('ends_at', '<', now())
            ->update(['status' => 'expired']);

        $this->info("Expired {$count} trial subscriptions.");
        return self::SUCCESS;
    }
}
