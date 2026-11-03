<?php

namespace App\Console\Commands;

use App\Models\Device;
use Illuminate\Console\Command;

class CleanupStaleDevices extends Command
{
    protected $signature = 'devices:cleanup-stale';
    protected $description = 'Revoke devices not seen in the last 90 days.';

    public function handle(): int
    {
        $count = Device::whereNull('revoked_at')
            ->where('last_seen_at', '<', now()->subDays(90))
            ->update(['revoked_at' => now()]);

        $this->info("Revoked {$count} stale devices.");
        return self::SUCCESS;
    }
}
