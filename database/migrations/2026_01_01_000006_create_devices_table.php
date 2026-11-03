<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('device_id', 64)->comment('SHA-256 fingerprint');
            $table->text('user_agent')->nullable();
            $table->string('ip', 45)->nullable();
            $table->string('country', 80)->nullable();
            $table->string('city', 80)->nullable();
            $table->string('os', 50)->nullable();
            $table->string('browser', 50)->nullable();
            $table->string('device_type', 30)->nullable();
            $table->timestamp('last_seen_at');
            $table->timestamp('revoked_at')->nullable();
            $table->boolean('is_trusted')->default(false);
            $table->timestamps();

            $table->unique(['user_id', 'device_id']);
            $table->index('user_id');
            $table->index('last_seen_at');
            $table->index('revoked_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};
