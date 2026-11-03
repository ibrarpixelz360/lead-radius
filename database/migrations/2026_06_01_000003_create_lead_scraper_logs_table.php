<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('lead_scraper_logs')) {
            Schema::create('lead_scraper_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('lead_scraper_batch_id')->constrained('lead_scraper_batches')->cascadeOnDelete();
                $table->enum('level', ['debug', 'info', 'warning', 'error'])->default('info');
                $table->text('message');
                $table->json('context')->nullable();
                $table->timestamps();

                $table->index(['lead_scraper_batch_id', 'level']);
                $table->index('created_at');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('lead_scraper_logs');
    }
};
