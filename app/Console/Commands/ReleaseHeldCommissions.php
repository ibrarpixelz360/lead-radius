<?php

namespace App\Console\Commands;

use App\Models\Commission;
use Illuminate\Console\Command;

class ReleaseHeldCommissions extends Command
{
    protected $signature = 'commissions:release-holds';
    protected $description = 'Release pending commissions whose hold period has elapsed.';

    public function handle(): int
    {
        $count = Commission::where('status', 'pending')
            ->whereNotNull('hold_until')
            ->where('hold_until', '<', now())
            ->update(['status' => 'approved']);

        $this->info("Released {$count} commissions from hold.");
        return self::SUCCESS;
    }
}
