<?php

namespace App\Domains\Affiliate\Services;

use App\Models\Commission;
use App\Models\Referral;
use App\Models\User;

class AffiliateStatsService
{
    /**
     * Returns a dashboard payload for the affiliate area.
     *
     * @return array<string, mixed>
     */
    public function statsFor(User $user): array
    {
        $referrals = Referral::where('referrer_id', $user->id);
        $commissions = Commission::where('referrer_id', $user->id);

        $totalEarned = (float) (clone $commissions)
            ->whereIn('status', ['approved', 'paid'])
            ->sum('amount');

        $pending = (float) (clone $commissions)
            ->where('status', 'pending')
            ->sum('amount');

        $available = (float) (clone $commissions)
            ->where('status', 'approved')
            ->whereNull('withdrawal_id')
            ->sum('amount');

        $paidOut = (float) (clone $commissions)
            ->where('status', 'paid')
            ->sum('amount');

        $totalReferrals = (clone $referrals)->count();
        $convertedReferrals = (clone $referrals)->whereNotNull('converted_at')->count();
        $conversionRate = $totalReferrals > 0
            ? round(($convertedReferrals / $totalReferrals) * 100, 1)
            : 0.0;

        return [
            'total_earned' => $totalEarned,
            'pending' => $pending,
            'available' => $available,
            'paid_out' => $paidOut,
            'total_referrals' => $totalReferrals,
            'converted_referrals' => $convertedReferrals,
            'conversion_rate' => $conversionRate,
            'min_withdrawal' => (float) config('cnm.affiliate.min_withdrawal', 1000),
            'currency' => 'PKR',
            'commission_percent' => (float) config('cnm.affiliate.commission_percent', 30),
            'recurring_percent' => (float) config('cnm.affiliate.recurring_percent', 20),
        ];
    }

    /**
     * Earnings by day for the last N days, suitable for a chart.
     *
     * @return array<int, array{date: string, amount: float}>
     */
    public function earningsTimeline(User $user, int $days = 30): array
    {
        $start = now()->subDays($days)->startOfDay();

        $rows = Commission::where('referrer_id', $user->id)
            ->whereIn('status', ['approved', 'paid'])
            ->where('created_at', '>=', $start)
            ->selectRaw('DATE(created_at) as day, SUM(amount) as total')
            ->groupBy('day')
            ->pluck('total', 'day')
            ->all();

        $timeline = [];
        for ($i = $days; $i >= 0; $i--) {
            $date = now()->subDays($i)->toDateString();
            $timeline[] = [
                'date' => $date,
                'amount' => (float) ($rows[$date] ?? 0),
            ];
        }

        return $timeline;
    }
}
