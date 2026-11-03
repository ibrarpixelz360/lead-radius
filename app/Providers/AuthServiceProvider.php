<?php

namespace App\Providers;

use App\Models\Lead;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\Withdrawal;
use App\Policies\LeadPolicy;
use App\Policies\PaymentPolicy;
use App\Policies\SubscriptionPolicy;
use App\Policies\WithdrawalPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Lead::class => LeadPolicy::class,
        Payment::class => PaymentPolicy::class,
        Subscription::class => SubscriptionPolicy::class,
        Withdrawal::class => WithdrawalPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::before(fn ($user) => $user->hasRole('super_admin') ? true : null);
    }
}
