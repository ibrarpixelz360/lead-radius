<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('subject', 200);
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->enum('category', ['billing', 'technical', 'account', 'feature_request', 'other'])
                ->default('other');
            $table->enum('status', ['open', 'pending', 'resolved', 'closed'])->default('open');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['status', 'priority']);
        });

        Schema::create('ticket_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('message');
            $table->json('attachments')->nullable();
            $table->boolean('is_internal_note')->default(false);
            $table->timestamps();

            $table->index('ticket_id');
        });

        Schema::create('feedback', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('type', ['general', 'bug', 'feature_request', 'rating'])->default('general');
            $table->unsignedTinyInteger('rating')->nullable();
            $table->text('message');
            $table->enum('status', ['new', 'reviewing', 'resolved', 'archived'])->default('new');
            $table->text('admin_response')->nullable();
            $table->timestamps();

            $table->index('status');
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question', 300);
            $table->text('answer');
            $table->string('category', 80)->nullable();
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'sort_order']);
        });

        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('title', 120)->nullable();
            $table->string('company', 120)->nullable();
            $table->string('avatar_path')->nullable();
            $table->text('content');
            $table->unsignedTinyInteger('rating')->default(5);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_active', 'is_featured']);
        });

        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->string('slug', 220)->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('cover_image')->nullable();
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('meta_title', 200)->nullable();
            $table->string('meta_description', 500)->nullable();
            $table->json('tags')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_published')->default(false);
            $table->unsignedInteger('views_count')->default(0);
            $table->timestamps();

            $table->index(['is_published', 'published_at']);
            $table->index('slug');
        });

        Schema::create('email_templates', function (Blueprint $table) {
            $table->id();
            $table->string('key', 80)->unique();
            $table->string('name', 120);
            $table->string('subject', 200);
            $table->longText('body');
            $table->string('description', 300)->nullable();
            $table->json('variables')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 120)->unique();
            $table->longText('value')->nullable();
            $table->string('type', 30)->default('string');
            $table->string('group', 60)->default('general');
            $table->string('description', 300)->nullable();
            $table->boolean('is_public')->default(false);
            $table->timestamps();

            $table->index('group');
        });

        Schema::create('proxies', function (Blueprint $table) {
            $table->id();
            $table->string('host', 120);
            $table->unsignedSmallInteger('port');
            $table->string('username', 120)->nullable();
            $table->string('password', 255)->nullable();
            $table->enum('type', ['residential', 'datacenter', 'mobile'])->default('residential');
            $table->string('country', 80)->nullable();
            $table->unsignedInteger('success_count')->default(0);
            $table->unsignedInteger('failure_count')->default(0);
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('cool_down_until')->nullable();
            $table->enum('status', ['active', 'cooling', 'banned', 'inactive'])->default('active');
            $table->timestamps();

            $table->index('status');
            $table->index('country');
            $table->index('cool_down_until');
        });

        Schema::create('activity_log', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('log_name')->nullable();
            $table->text('description');
            $table->nullableUuidMorphs('subject', 'subject');
            $table->string('event')->nullable();
            $table->nullableUuidMorphs('causer', 'causer');
            $table->json('properties')->nullable();
            $table->uuid('batch_uuid')->nullable();
            $table->timestamps();

            $table->index('log_name');
        });

        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->morphs('model');
            $table->uuid('uuid')->nullable()->unique();
            $table->string('collection_name');
            $table->string('name');
            $table->string('file_name');
            $table->string('mime_type')->nullable();
            $table->string('disk');
            $table->string('conversions_disk')->nullable();
            $table->unsignedBigInteger('size');
            $table->json('manipulations');
            $table->json('custom_properties');
            $table->json('generated_conversions');
            $table->json('responsive_images');
            $table->unsignedInteger('order_column')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
        Schema::dropIfExists('activity_log');
        Schema::dropIfExists('proxies');
        Schema::dropIfExists('settings');
        Schema::dropIfExists('email_templates');
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('feedback');
        Schema::dropIfExists('ticket_messages');
        Schema::dropIfExists('tickets');
    }
};
