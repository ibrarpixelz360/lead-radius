<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name', 60);
            $table->string('slug', 60)->unique();
            $table->string('description', 500)->nullable();
            $table->decimal('price', 10, 2)->default(0);
            $table->char('currency', 3)->default('PKR');
            $table->enum('billing_cycle', ['monthly', 'yearly', 'lifetime'])->default('monthly');
            $table->unsignedSmallInteger('trial_days')->default(0);
            $table->unsignedTinyInteger('max_devices')->default(1);
            $table->unsignedInteger('monthly_lead_limit')->nullable()->comment('NULL = unlimited');
            $table->unsignedInteger('monthly_export_limit')->nullable()->comment('NULL = unlimited');
            $table->unsignedInteger('saved_searches_limit')->nullable();
            $table->boolean('priority_support')->default(false);
            $table->boolean('api_access')->default(false);
            $table->boolean('ai_scoring')->default(true);
            $table->json('features')->nullable()->comment('Additional flexible feature flags');
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->index('is_active');
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
