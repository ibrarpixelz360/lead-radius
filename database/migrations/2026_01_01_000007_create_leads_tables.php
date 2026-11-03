<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('searches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('country', 80);
            $table->string('state', 120)->nullable();
            $table->string('city', 120);
            $table->string('query', 255);
            $table->string('category', 120)->nullable();
            $table->unsignedSmallInteger('radius_km')->default(10);
            $table->decimal('min_rating', 2, 1)->nullable();
            $table->unsignedInteger('min_reviews')->nullable();
            $table->boolean('require_website')->default(false);
            $table->boolean('require_email')->default(false);
            $table->boolean('require_phone')->default(false);
            $table->enum('status', ['queued', 'running', 'completed', 'failed', 'cancelled'])
                ->default('queued');
            $table->unsignedInteger('results_count')->default(0);
            $table->string('proxy_used', 80)->nullable();
            $table->unsignedInteger('duration_seconds')->nullable();
            $table->text('error_message')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['status', 'created_at']);
            $table->index('created_at');
        });

        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('google_place_id', 120)->unique()->nullable();
            $table->string('business_name', 255);
            $table->string('category', 120)->nullable();
            $table->string('phone', 40)->nullable();
            $table->string('email', 180)->nullable();
            $table->string('website', 500)->nullable();
            $table->string('address', 500)->nullable();
            $table->string('city', 120);
            $table->string('state', 120)->nullable();
            $table->string('country', 80);
            $table->string('postal_code', 20)->nullable();
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->decimal('rating', 2, 1)->nullable();
            $table->unsignedInteger('reviews_count')->default(0);
            $table->json('hours')->nullable();
            $table->json('social_links')->nullable();
            $table->json('photos')->nullable();
            $table->unsignedTinyInteger('ai_score')->nullable()->comment('0-100 quality score');
            $table->enum('ai_category', ['seo_weak', 'low_rating', 'hot', 'good', 'competitive', 'inactive'])
                ->nullable();
            $table->timestamp('last_scraped_at')->nullable();
            $table->timestamps();

            $table->index(['country', 'city']);
            $table->index('category');
            $table->index('rating');
            $table->index('email');
            $table->index('phone');
            $table->index('ai_score');
            $table->index('ai_category');
            if (\Illuminate\Support\Facades\DB::getDriverName() !== 'sqlite') {
                $table->fullText(['business_name', 'category']);
            }
        });

        Schema::create('lead_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lead_id')->constrained()->cascadeOnDelete();
            $table->foreignId('search_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('status', ['new', 'contacted', 'responded', 'converted', 'closed'])
                ->default('new');
            $table->text('notes')->nullable();
            $table->json('tags')->nullable();
            $table->boolean('is_favorite')->default(false);
            $table->boolean('is_archived')->default(false);
            $table->timestamp('contacted_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'lead_id']);
            $table->index(['user_id', 'status']);
            $table->index(['user_id', 'is_favorite']);
            $table->index(['user_id', 'is_archived']);
        });

        Schema::create('saved_searches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name', 120);
            $table->json('filters');
            $table->boolean('auto_run')->default(false);
            $table->enum('frequency', ['daily', 'weekly', 'monthly'])->nullable();
            $table->timestamp('last_run_at')->nullable();
            $table->timestamps();

            $table->index('user_id');
        });

        Schema::create('exports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('filename');
            $table->string('format', 10)->comment('csv|xlsx');
            $table->unsignedInteger('lead_count')->default(0);
            $table->json('filters')->nullable();
            $table->string('file_path')->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->enum('status', ['queued', 'processing', 'completed', 'failed'])->default('queued');
            $table->text('error_message')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index('expires_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exports');
        Schema::dropIfExists('saved_searches');
        Schema::dropIfExists('lead_user');
        Schema::dropIfExists('leads');
        Schema::dropIfExists('searches');
    }
};
