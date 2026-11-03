<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('referrals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('referrer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('referred_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('landing_url', 500)->nullable();
            $table->string('ip', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('converted_at')->nullable();
            $table->timestamps();

            $table->index('referrer_id');
            $table->index('converted_at');
        });

        Schema::create('commissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('referrer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('referral_id')->constrained()->cascadeOnDelete();
            $table->foreignId('payment_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount', 10, 2);
            $table->char('currency', 3)->default('PKR');
            $table->enum('type', ['percent', 'fixed'])->default('percent');
            $table->decimal('rate', 6, 2)->nullable()->comment('e.g., 30.00 for 30%');
            $table->enum('status', ['pending', 'approved', 'paid', 'reversed'])->default('pending');
            $table->timestamp('hold_until')->nullable();
            $table->foreignId('withdrawal_id')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['referrer_id', 'status']);
            $table->index('payment_id');
            $table->index('hold_until');
        });

        Schema::create('withdrawals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount', 10, 2);
            $table->char('currency', 3)->default('PKR');
            $table->enum('method', ['bank', 'jazzcash', 'easypaisa']);
            $table->string('account_title', 120);
            $table->string('account_number', 60);
            $table->string('bank_name', 80)->nullable();
            $table->enum('status', ['pending', 'approved', 'paid', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->string('transaction_reference', 120)->nullable();
            $table->foreignId('processed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['status', 'created_at']);
        });

        Schema::table('commissions', function (Blueprint $table) {
            $table->foreign('withdrawal_id')->references('id')->on('withdrawals')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('commissions', function (Blueprint $table) {
            $table->dropForeign(['withdrawal_id']);
        });
        Schema::dropIfExists('withdrawals');
        Schema::dropIfExists('commissions');
        Schema::dropIfExists('referrals');
    }
};
