<?php

namespace App\Domains\Subscription\Actions;

use App\Models\Payment;
use App\Models\Subscription;
use Illuminate\Support\Facades\DB;

class ActivateSubscriptionAction
{
    public function execute(Payment $payment): Subscription
    {
        return DB::transaction(function () use ($payment) {
            $payment->loadMissing('user', 'plan');
            $user = $payment->user;
            $plan = $payment->plan;

            // Cancel any current trial/active subscriptions
            $user->subscriptions()
                ->whereIn('status', ['trial', 'active'])
                ->update([
                    'status' => 'cancelled',
                    'cancelled_at' => now(),
                ]);

            // Create new active subscription
            $duration = match ($plan->billing_cycle) {
                'yearly' => now()->addYear(),
                'lifetime' => now()->addYears(99),
                default => now()->addDays(30),
            };

            $subscription = Subscription::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'status' => 'active',
                'starts_at' => now(),
                'ends_at' => $duration,
                'payment_id' => $payment->id,
                'auto_renew' => false,
            ]);

            return $subscription;
        });
    }
}
