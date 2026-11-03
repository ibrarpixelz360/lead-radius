<?php

use App\Domains\Subscription\Actions\CreateTrialSubscriptionAction;
use App\Domains\Subscription\Services\PlanLimitChecker;
use App\Models\Plan;
use App\Models\User;

beforeEach(function () {
    $this->checker = app(PlanLimitChecker::class);
});

it('allows lead generation for users on active trial', function () {
    $user = User::factory()->create();
    app(CreateTrialSubscriptionAction::class)->execute($user);

    expect($this->checker->canGenerateLeads($user->fresh()))->toBeTrue();
});

it('denies lead generation for users with expired trial', function () {
    $user = User::factory()->create(['trial_ends_at' => now()->subDay()]);
    $sub = app(CreateTrialSubscriptionAction::class)->execute($user);
    $sub->update(['ends_at' => now()->subDay(), 'status' => 'expired']);

    expect($this->checker->canGenerateLeads($user->fresh()))->toBeFalse();
});

it('respects the monthly_lead_limit on a plan', function () {
    $plan = Plan::factory()->create([
        'monthly_lead_limit' => 100,
        'max_devices' => 1,
    ]);

    $user = User::factory()->create();
    $user->subscriptions()->create([
        'plan_id' => $plan->id,
        'status' => 'active',
        'starts_at' => now(),
        'ends_at' => now()->addDays(30),
    ]);

    expect($this->checker->canGenerateLeads($user->fresh()))->toBeTrue();
});

it('treats null monthly_lead_limit as unlimited', function () {
    $plan = Plan::factory()->create([
        'monthly_lead_limit' => null,
    ]);
    $user = User::factory()->create();
    $user->subscriptions()->create([
        'plan_id' => $plan->id,
        'status' => 'active',
        'starts_at' => now(),
        'ends_at' => now()->addDays(30),
    ]);

    expect($this->checker->canGenerateLeads($user->fresh()))->toBeTrue();
});
