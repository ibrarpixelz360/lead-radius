<?php

use App\Domains\Subscription\Actions\ApprovePaymentAction;
use App\Domains\Subscription\Actions\CreateTrialSubscriptionAction;
use App\Domains\Subscription\Actions\RejectPaymentAction;
use App\Models\Commission;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\Referral;
use App\Models\User;
use Illuminate\Support\Facades\Notification;

beforeEach(function () {
    Notification::fake();
    $this->starter = Plan::where('slug', 'starter')->firstOrFail();
    $this->user = User::factory()->create();
    app(CreateTrialSubscriptionAction::class)->execute($this->user);
});

function makePending(\App\Models\User $user, \App\Models\Plan $plan): \App\Models\Payment
{
    return Payment::create([
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'amount' => $plan->price,
        'currency' => $plan->currency,
        'transaction_id' => 'TX'.uniqid(),
        'sender_name' => 'Sender',
        'sender_account' => '12345',
        'screenshot_path' => 'fake/path.jpg',
        'status' => 'pending_review',
    ]);
}

it('activates a subscription when admin approves payment', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $payment = makePending($this->user, $this->starter);

    app(ApprovePaymentAction::class)->execute($payment, $admin, 'Looks good');

    $payment->refresh();
    expect($payment->status)->toBe('approved')
        ->and($payment->reviewed_by)->toBe($admin->id);

    $sub = $this->user->fresh()->activeSubscription;
    expect($sub)->not->toBeNull()
        ->and($sub->plan_id)->toBe($this->starter->id)
        ->and($sub->status)->toBe('active');
});

it('cancels prior trial subscription on approval', function () {
    $payment = makePending($this->user, $this->starter);
    app(ApprovePaymentAction::class)->execute($payment, null, null);

    expect($this->user->subscriptions()->where('status', 'cancelled')->count())->toBe(1)
        ->and($this->user->subscriptions()->where('status', 'active')->count())->toBe(1);
});

it('creates an affiliate commission when referred user pays', function () {
    $referrer = User::factory()->create();
    $referred = User::factory()->create(['referred_by_id' => $referrer->id]);
    Referral::create([
        'referrer_id' => $referrer->id,
        'referred_id' => $referred->id,
    ]);
    app(CreateTrialSubscriptionAction::class)->execute($referred);

    $payment = makePending($referred, $this->starter);
    app(ApprovePaymentAction::class)->execute($payment);

    $commission = Commission::where('referrer_id', $referrer->id)->first();
    expect($commission)->not->toBeNull()
        ->and($commission->status)->toBe('pending')
        ->and($commission->payment_id)->toBe($payment->id)
        ->and((float) $commission->amount)->toBeGreaterThan(0);
});

it('rejects a payment with a reason', function () {
    $admin = User::factory()->create();
    $payment = makePending($this->user, $this->starter);

    app(RejectPaymentAction::class)->execute($payment, $admin, 'Screenshot unreadable');

    $payment->refresh();
    expect($payment->status)->toBe('rejected')
        ->and($payment->rejection_reason)->toBe('Screenshot unreadable');
});

it('throws when approving a non-pending payment', function () {
    $payment = makePending($this->user, $this->starter);
    $payment->update(['status' => 'approved']);

    app(ApprovePaymentAction::class)->execute($payment);
})->throws(DomainException::class);
