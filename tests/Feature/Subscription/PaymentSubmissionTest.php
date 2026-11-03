<?php

use App\Domains\Subscription\Actions\CreateTrialSubscriptionAction;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('screenshots');
    Notification::fake();
    $this->user = User::factory()->create();
    app(CreateTrialSubscriptionAction::class)->execute($this->user);
    $this->starter = Plan::where('slug', 'starter')->firstOrFail();
});

it('renders the billing index page', function () {
    $this->actingAs($this->user)
        ->get('/billing')
        ->assertOk()
        ->assertInertia(fn ($p) => $p->component('Billing/Index'));
});

it('renders the checkout page for a paid plan', function () {
    $this->actingAs($this->user)
        ->get(route('billing.checkout', $this->starter))
        ->assertOk()
        ->assertInertia(fn ($p) => $p->component('Billing/Checkout'));
});

it('rejects checkout for the free plan', function () {
    $free = Plan::where('slug', 'free')->firstOrFail();
    $this->actingAs($this->user)
        ->get(route('billing.checkout', $free))
        ->assertStatus(422);
});

it('submits a payment with screenshot and creates a pending record', function () {
    $screenshot = UploadedFile::fake()->image('proof.jpg', 800, 600);

    $response = $this->actingAs($this->user)->post(route('billing.payment.submit'), [
        'plan_id' => $this->starter->id,
        'transaction_id' => 'TX12345',
        'sender_name' => 'John Sender',
        'sender_account' => '0123456789',
        'bank_name' => 'HBL',
        'screenshot' => $screenshot,
    ]);

    $response->assertRedirect(route('billing.index'));

    $payment = Payment::where('user_id', $this->user->id)->first();

    expect($payment)->not->toBeNull()
        ->and($payment->status)->toBe('pending_review')
        ->and($payment->plan_id)->toBe($this->starter->id)
        ->and((float) $payment->amount)->toEqual((float) $this->starter->price)
        ->and($payment->screenshot_path)->not->toBeNull();

    Storage::disk('screenshots')->assertExists($payment->screenshot_path);
});

it('rejects submission without a screenshot', function () {
    $this->actingAs($this->user)->post(route('billing.payment.submit'), [
        'plan_id' => $this->starter->id,
        'transaction_id' => 'TX12345',
        'sender_name' => 'John',
        'sender_account' => '0123456789',
    ])->assertSessionHasErrors('screenshot');
});

it('rejects non-image file as screenshot', function () {
    $bad = UploadedFile::fake()->create('proof.pdf', 100, 'application/pdf');

    $this->actingAs($this->user)->post(route('billing.payment.submit'), [
        'plan_id' => $this->starter->id,
        'transaction_id' => 'TX12345',
        'sender_name' => 'John',
        'sender_account' => '0123456789',
        'screenshot' => $bad,
    ])->assertSessionHasErrors('screenshot');
});

it('limits a user to 3 pending payments at a time', function () {
    Payment::factory()->count(3)->create([
        'user_id' => $this->user->id,
        'plan_id' => $this->starter->id,
        'status' => 'pending_review',
    ]);

    $screenshot = UploadedFile::fake()->image('proof.jpg');

    $this->actingAs($this->user)->post(route('billing.payment.submit'), [
        'plan_id' => $this->starter->id,
        'transaction_id' => 'TX99',
        'sender_name' => 'John',
        'sender_account' => '0123456789',
        'screenshot' => $screenshot,
    ])->assertStatus(429);
});
