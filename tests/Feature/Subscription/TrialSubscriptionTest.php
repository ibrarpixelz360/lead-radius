<?php

use App\Domains\Subscription\Actions\CreateTrialSubscriptionAction;
use App\Models\User;

it('creates a 7-day trial subscription for new users', function () {
    $user = User::factory()->create();

    $sub = app(CreateTrialSubscriptionAction::class)->execute($user);

    expect($sub->status)->toBe('trial')
        ->and($sub->plan->slug)->toBe('free')
        ->and($sub->starts_at->isToday())->toBeTrue()
        ->and($sub->ends_at->diffInDays(now()))->toBeLessThanOrEqual(7);
});

it('exposes trial status helpers on the user model', function () {
    $user = User::factory()->create([
        'trial_ends_at' => now()->addDays(5),
    ]);
    app(CreateTrialSubscriptionAction::class)->execute($user);

    expect($user->fresh()->isOnTrial())->toBeTrue()
        ->and($user->fresh()->trialDaysLeft())->toBeGreaterThan(0);
});
