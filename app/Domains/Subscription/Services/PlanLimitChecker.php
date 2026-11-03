<?php

namespace App\Domains\Subscription\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;

class PlanLimitChecker
{
    public function canGenerateLeads(User $user): bool
    {
        if (! $this->hasActiveAccess($user)) {
            return false;
        }

        $plan = $user->currentPlan();
        if (! $plan || $plan->isUnlimitedLeads()) {
            return true;
        }

        $used = $this->monthlyLeadsUsed($user);

        return $used < $plan->monthly_lead_limit;
    }

    public function canExport(User $user): bool
    {
        if (! $this->hasActiveAccess($user)) {
            return false;
        }

        $plan = $user->currentPlan();
        if (! $plan || $plan->isUnlimitedExports()) {
            return true;
        }

        $used = $user->exports()
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        return $used < $plan->monthly_export_limit;
    }

    public function canSaveSearch(User $user): bool
    {
        if (! $this->hasActiveAccess($user)) {
            return false;
        }

        $plan = $user->currentPlan();
        if (! $plan || $plan->saved_searches_limit === null) {
            return true;
        }

        return $user->savedSearches()->count() < $plan->saved_searches_limit;
    }

    public function canAddDevice(User $user): bool
    {
        $plan = $user->currentPlan();
        if (! $plan) {
            return false;
        }

        return $user->devices()->active()->count() < $plan->max_devices;
    }

    public function monthlyLeadsUsed(User $user): int
    {
        return Cache::remember(
            "user:{$user->id}:leads_this_month",
            300,
            fn () => $user->leadEntries()
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count()
        );
    }

    protected function hasActiveAccess(User $user): bool
    {
        return $user->hasActiveSubscription() || $user->isOnTrial();
    }
}
