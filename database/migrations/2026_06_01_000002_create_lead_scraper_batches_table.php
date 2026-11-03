<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('lead_scraper_batches')) {
            Schema::create('lead_scraper_batches', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
                $table->foreignId('search_id')->nullable()->constrained()->nullOnDelete();
                $table->string('source', 60)->default('google_maps');
                $table->text('query')->nullable();
                $table->text('location')->nullable();
                $table->unsignedInteger('total_jobs')->default(0);
                $table->unsignedInteger('completed_jobs')->default(0);
                $table->unsignedInteger('failed_jobs')->default(0);
                $table->unsignedInteger('found_leads')->default(0);
                $table->unsignedInteger('total_requested')->default(50);
                $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
                $table->timestamp('started_at')->nullable();
                $table->timestamp('completed_at')->nullable();
                $table->timestamps();

                $table->index('user_id');
                $table->index('status');
                $table->index('search_id');
                $table->index('created_at');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('lead_scraper_batches');
    }
};
