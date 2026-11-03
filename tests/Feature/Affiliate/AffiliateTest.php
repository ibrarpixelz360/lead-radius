<?php

use App\Domains\Affiliate\Actions\CreateReferralAction;
use App\Domains\Affiliate\Actions\RequestWithdrawalAction;
use App\Domains\Affiliate\Services\AffiliateStatsService;
use App\Domains\Subscription\Actions\ApprovePaymentAction;
use App\Domains\Subscription\Actions\CreateTrialSubscriptionAction;
use App\Models\Commission;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\User;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

beforeEach(function () {
    Notification::fake();
    $this->starter = Plan::where('slug', 'starter')->firstOrFail();
    $this->referrer = User::factory()->create(['referral_code' => 'AFFCODE001']);
    $this->referred = User::factory()->create();
    app(CreateTrialSubscriptionAction::class)->execute($this->referrer);
    app(CreateTrialSubscriptionAction::class)->execute($this->referred);
});

it('captures referral when registering with cookie', function () {
    $this->withCookie('cnm_ref', 'AFFCODE001')
        ->post('/register', [
            'name' => 'New Friend',
            'email' => 'friend@test.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'terms' => true,
        ]);

    $newUser = User::where('email', 'friend@test.com')->first();
    expect($newUser->referred_by_id)->toBe($this->referrer->id)
        ->and(\App\Models\Referral::where('referrer_id', $this->referrer->id)
            ->where('referred_id', $newUser->id)->exists())->toBeTrue();
});

it('rejects self-referral', function () {
    $req = Request::create('/register', 'POST');
    $req->cookies->set('cnm_ref', $this->referrer->referral_code);

    $action = new CreateReferralAction;
    $referral = $action->execute($this->referrer, $req);

    expect($referral)->toBeNull();
});

it('renders affiliate index with stats', function () {
    $this->actingAs($this->referrer)
        ->get('/affiliate')
        ->assertOk()
        ->assertInertia(fn ($p) => $p
            ->component('Affiliate/Index')
            ->has('stats')
            ->has('referral_code')
            ->has('referral_link'));
});

it('computes available balance correctly', function () {
    // Create a referral + commission
    \App\Models\Referral::create([
        'referrer_id' => $this->referrer->id,
        'referred_id' => $this->referred->id,
    ]);

    Commission::create([
        'referrer_id' => $this->referrer->id,
        'referral_id' => \App\Models\Referral::first()->id,
        'payment_id' => Payment::factory()->create([
            'user_id' => $this->referred->id,
            'plan_id' => $this->starter->id,
            'status' => 'approved',
        ])->id,
        'amount' => 500,
        'currency' => 'PKR',
        'rate' => 30,
        'status' => 'approved',
    ]);

    $stats = app(AffiliateStatsService::class)->statsFor($this->referrer);

    expect($stats['available'])->toEqual(500.0)
        ->and($stats['total_earned'])->toEqual(500.0);
});

it('rejects withdrawal below minimum', function () {
    $this->actingAs($this->referrer)
        ->post('/affiliate/withdrawals', [
            'amount' => 100,
            'method' => 'bank',
            'account_title' => 'John',
            'account_number' => '01234567',
            'bank_name' => 'HBL',
        ])
        ->assertSessionHasErrors('amount');
});

it('rejects withdrawal exceeding available balance', function () {
    // No commissions = 0 balance
    $action = app(RequestWithdrawalAction::class);

    expect(fn () => $action->execute($this->referrer, 5000, [
        'method' => 'bank',
        'account_title' => 'John',
        'account_number' => '01234567',
    ]))->toThrow(\Symfony\Component\HttpKernel\Exception\HttpException::class);
});

it('creates a withdrawal and locks commissions to it', function () {
    \App\Models\Referral::create([
        'referrer_id' => $this->referrer->id,
        'referred_id' => $this->referred->id,
    ]);
    $payment = Payment::factory()->create([
        'user_id' => $this->referred->id,
        'plan_id' => $this->starter->id,
        'status' => 'approved',
    ]);
    Commission::create([
        'referrer_id' => $this->referrer->id,
        'referral_id' => \App\Models\Referral::first()->id,
        'payment_id' => $payment->id,
        'amount' => 1500,
        'currency' => 'PKR',
        'rate' => 30,
        'status' => 'approved',
    ]);

    $withdrawal = app(RequestWithdrawalAction::class)->execute(
        $this->referrer,
        1500,
        ['method' => 'bank', 'account_title' => 'John', 'account_number' => '0123', 'bank_name' => 'HBL']
    );

    expect($withdrawal->status)->toBe('pending')
        ->and((float) $withdrawal->amount)->toEqual(1500.0)
        ->and(Commission::where('withdrawal_id', $withdrawal->id)->count())->toBe(1);
});

it('blocks multiple pending withdrawals', function () {
    Withdrawal::create([
        'user_id' => $this->referrer->id,
        'amount' => 1000, 'currency' => 'PKR', 'method' => 'bank',
        'account_title' => 'John', 'account_number' => '0123',
        'status' => 'pending',
    ]);

    expect(fn () => app(RequestWithdrawalAction::class)->execute(
        $this->referrer, 1500,
        ['method' => 'bank', 'account_title' => 'John', 'account_number' => '0123']
    ))->toThrow(\Symfony\Component\HttpKernel\Exception\HttpException::class);
});

it('releases commissions whose hold has expired', function () {
    $referral = \App\Models\Referral::create([
        'referrer_id' => $this->referrer->id,
        'referred_id' => $this->referred->id,
    ]);
    $payment = Payment::factory()->create([
        'user_id' => $this->referred->id,
        'plan_id' => $this->starter->id,
        'status' => 'approved',
    ]);
    Commission::create([
        'referrer_id' => $this->referrer->id,
        'referral_id' => $referral->id,
        'payment_id' => $payment->id,
        'amount' => 600, 'currency' => 'PKR', 'rate' => 30,
        'status' => 'pending',
        'hold_until' => now()->subDay(),
    ]);

    $this->artisan('commissions:release-holds')->assertSuccessful();

    expect(Commission::first()->status)->toBe('approved');
});
