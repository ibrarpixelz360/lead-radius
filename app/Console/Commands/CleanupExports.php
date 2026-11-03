<?php

namespace App\Console\Commands;

use App\Models\Export;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CleanupExports extends Command
{
    protected $signature = 'exports:cleanup';
    protected $description = 'Delete export files older than 30 days.';

    public function handle(): int
    {
        $count = 0;
        Export::where('created_at', '<', now()->subDays(30))->chunkById(100, function ($exports) use (&$count) {
            foreach ($exports as $export) {
                if ($export->file_path) {
                    Storage::disk('exports')->delete($export->file_path);
                }
                $export->delete();
                $count++;
            }
        });

        $this->info("Cleaned up {$count} expired exports.");
        return self::SUCCESS;
    }
}
