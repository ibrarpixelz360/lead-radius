<?php

use App\Models\User;

it('renders the login page', function () {
    $this->get('/login')->assertOk();
});

it('logs in a user with correct credentials', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
        'password' => bcrypt('Password123!'),
        'status' => 'active',
    ]);

    $response = $this->post('/login', [
        'email' => 'user@example.com',
        'password' => 'Password123!',
    ]);

    $response->assertRedirect('/dashboard');
    $this->assertAuthenticatedAs($user);

    expect($user->fresh()->last_login_at)->not->toBeNull();
});

it('rejects login with bad password', function () {
    User::factory()->create([
        'email' => 'user@example.com',
        'password' => bcrypt('Password123!'),
    ]);

    $this->post('/login', [
        'email' => 'user@example.com',
        'password' => 'wrongpassword',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});

it('rejects login when account is banned', function () {
    User::factory()->create([
        'email' => 'banned@example.com',
        'password' => bcrypt('Password123!'),
        'status' => 'banned',
    ]);

    $this->post('/login', [
        'email' => 'banned@example.com',
        'password' => 'Password123!',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});

it('logs out an authenticated user', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->post('/logout')->assertRedirect('/');
    $this->assertGuest();
});
