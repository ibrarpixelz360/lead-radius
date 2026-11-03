<?php

use App\Models\Plan;
use App\Models\User;

it('renders the registration page', function () {
    $this->get('/register')->assertOk();
});

it('registers a new user with a trial subscription', function () {
    $response = $this->post('/register', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
        'phone' => '+923001234567',
        'country_code' => 'PK',
        'terms' => true,
    ]);

    $user = User::where('email', 'jane@example.com')->first();

    expect($user)->not->toBeNull()
        ->and($user->referral_code)->toHaveLength(10)
        ->and($user->trial_ends_at)->not->toBeNull()
        ->and($user->activeSubscription)->not->toBeNull()
        ->and($user->activeSubscription->status)->toBe('trial')
        ->and($user->hasRole('user'))->toBeTrue();

    $response->assertRedirect('/dashboard');
    $this->assertAuthenticated();
});

it('captures a referral when registering with a ref code', function () {
    $referrer = User::factory()->create(['referral_code' => 'TESTREF123']);

    $this->withCookie('cnm_ref', 'TESTREF123')
        ->post('/register', [
            'name' => 'New User',
            'email' => 'new@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'terms' => true,
        ]);

    $newUser = User::where('email', 'new@example.com')->first();

    expect($newUser->referred_by_id)->toBe($referrer->id)
        ->and(\App\Models\Referral::where('referrer_id', $referrer->id)
            ->where('referred_id', $newUser->id)
            ->exists())->toBeTrue();
});

it('validates that email is unique', function () {
    User::factory()->create(['email' => 'existing@example.com']);

    $this->post('/register', [
        'name' => 'Test',
        'email' => 'existing@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
        'terms' => true,
    ])->assertSessionHasErrors('email');
});

it('requires terms acceptance', function () {
    $this->post('/register', [
        'name' => 'Test',
        'email' => 'noterms@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
        'terms' => false,
    ])->assertSessionHasErrors('terms');
});
