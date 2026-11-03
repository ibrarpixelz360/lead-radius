<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained()->restrictOnDelete();
            $table->enum('status', ['trial', 'active', 'expired', 'cancelled', 'pending_payment'])
                ->default('trial');
            $table->timestamp('starts_at');
            $table->timestamp('ends_at');
            $table->timestamp('cancelled_at')->nullable();
            $table->foreignId('payment_id')->nullable();
            $table->boolean('auto_renew')->default(false);
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index('ends_at');
            $table->index('plan_id');
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained()->restrictOnDelete();
            $table->decimal('amount', 10, 2);
            $table->char('currency', 3)->default('PKR');
            $table->string('transaction_id', 120)->nullable()->comment('User-supplied bank transaction ID');
            $table->string('bank_name', 80)->nullable();
            $table->string('sender_name', 120)->nullable();
            $table->string('sender_account', 60)->nullable();
            $table->string('screenshot_path')->nullable();
            $table->enum('status', ['pending_review', 'approved', 'rejected'])
                ->default('pending_review');
            $table->text('admin_notes')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->string('invoice_number', 40)->unique()->nullable();
            $table->string('invoice_path')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('status');
            $table->index(['status', 'created_at']);
        });

        // Add the missing FK from subscriptions.payment_id to payments.id
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->foreign('payment_id')->references('id')->on('payments')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropForeign(['payment_id']);
        });
        Schema::dropIfExists('payments');
        Schema::dropIfExists('subscriptions');
    }
};
