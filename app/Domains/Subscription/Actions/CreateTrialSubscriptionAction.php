<?php

namespace App\Domains\Subscription\Actions;

use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;

class CreateTrialSubscriptionAction
{
    public function execute(User $user): Subscription
    {
        $freePlan = Plan::where('slug', config('cnm.plans.free'))->firstOrFail();

        $trialDays = (int) config('cnm.trial_days', 7);

        return Subscription::create([
            'user_id' => $user->id,
            'plan_id' => $freePlan->id,
            'status' => 'trial',
            'starts_at' => now(),
            'ends_at' => now()->addDays($trialDays),
            'auto_renew' => false,
        ]);
    }
}
