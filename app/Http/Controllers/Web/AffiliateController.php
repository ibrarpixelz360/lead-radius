<?php

namespace App\Http\Controllers\Web;

use App\Domains\Affiliate\Actions\RequestWithdrawalAction;
use App\Domains\Affiliate\Services\AffiliateStatsService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Affiliate\WithdrawalRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AffiliateController extends Controller
{
    public function __construct(protected AffiliateStatsService $stats) {}

    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Affiliate/Index', [
            'stats' => $this->stats->statsFor($user),
            'timeline' => $this->stats->earningsTimeline($user, 30),
            'referral_code' => $user->referral_code,
            'referral_link' => $user->referral_link,
            'recent_referrals' => $user->referrals()
                ->latest()
                ->limit(10)
                ->get()
                ->map(fn ($r) => [
                    'id' => $r->id,
                    'name' => $this->maskName($r->name),
                    'email' => $this->maskEmail($r->email),
                    'is_paying' => $r->referrals()->where('status', 'active')->exists(),
                    'created_at' => $r->created_at,
                ]),
        ]);
    }

    public function commissions(Request $request): Response
    {
        return Inertia::render('Affiliate/Commissions', [
            'commissions' => $request->user()->commissionsEarned()
                ->with('payment.user:id,email')
                ->latest()
                ->paginate(25)
                ->through(fn ($c) => [
                    'id' => $c->id,
                    'amount' => (float) $c->amount,
                    'currency' => $c->currency,
                    'rate' => (float) $c->rate,
                    'status' => $c->status,
                    'hold_until' => $c->hold_until,
                    'referred_email' => $this->maskEmail($c->payment?->user?->email ?? ''),
                    'created_at' => $c->created_at,
                ]),
        ]);
    }

    public function referrals(Request $request): Response
    {
        return Inertia::render('Affiliate/Referrals', [
            'referrals' => $request->user()->referrals()
                ->latest()
                ->paginate(25)
                ->through(fn ($u) => [
                    'id' => $u->id,
                    'name' => $this->maskName($u->name),
                    'email' => $this->maskEmail($u->email),
                    'has_paid' => $u->payments()->where('status', 'approved')->exists(),
                    'created_at' => $u->created_at,
                ]),
        ]);
    }

    public function withdrawals(Request $request): Response
    {
        return Inertia::render('Affiliate/Withdrawals', [
            'withdrawals' => $request->user()->withdrawals()
                ->latest()
                ->paginate(25)
                ->through(fn ($w) => [
                    'id' => $w->id,
                    'amount' => (float) $w->amount,
                    'currency' => $w->currency,
                    'method' => $w->method,
                    'account_title' => $w->account_title,
                    'account_number' => $this->maskAccount($w->account_number),
                    'bank_name' => $w->bank_name,
                    'status' => $w->status,
                    'transaction_reference' => $w->transaction_reference,
                    'created_at' => $w->created_at,
                    'processed_at' => $w->processed_at,
                ]),
            'stats' => $this->stats->statsFor($request->user()),
        ]);
    }

    public function requestWithdrawal(WithdrawalRequest $request, RequestWithdrawalAction $action): RedirectResponse
    {
        $action->execute(
            $request->user(),
            (float) $request->validated('amount'),
            [
                'method' => $request->validated('method'),
                'account_title' => $request->validated('account_title'),
                'account_number' => $request->validated('account_number'),
                'bank_name' => $request->validated('bank_name'),
            ]
        );

        return redirect()->route('affiliate.withdrawals.index')
            ->with('success', 'Withdrawal request submitted. Admin will process it shortly.');
    }

    // Privacy: mask referral data
    protected function maskEmail(string $email): string
    {
        if (! str_contains($email, '@')) return '—';
        [$local, $domain] = explode('@', $email, 2);
        $masked = strlen($local) > 2
            ? substr($local, 0, 2).str_repeat('*', max(strlen($local) - 2, 1))
            : str_repeat('*', strlen($local));
        return $masked.'@'.$domain;
    }

    protected function maskName(string $name): string
    {
        $parts = explode(' ', trim($name));
        return implode(' ', array_map(
            fn ($p) => strlen($p) > 1 ? substr($p, 0, 1).str_repeat('*', strlen($p) - 1) : $p,
            $parts
        ));
    }

    protected function maskAccount(string $account): string
    {
        return strlen($account) > 4
            ? str_repeat('*', strlen($account) - 4).substr($account, -4)
            : $account;
    }
}
