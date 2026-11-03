<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            if (!Schema::hasColumn('leads', 'lead_scraper_batch_id')) {
                $table->foreignId('lead_scraper_batch_id')
                    ->nullable()
                    ->after('id')
                    ->constrained('lead_scraper_batches')
                    ->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            if (Schema::hasColumn('leads', 'lead_scraper_batch_id')) {
                $table->dropForeign(['lead_scraper_batch_id']);
                $table->dropColumn('lead_scraper_batch_id');
            }
        });
    }
};
