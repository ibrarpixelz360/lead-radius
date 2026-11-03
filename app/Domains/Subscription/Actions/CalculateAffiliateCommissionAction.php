<?php

namespace App\Domains\Subscription\Actions;

use App\Models\Commission;
use App\Models\Payment;
use App\Models\Referral;

class CalculateAffiliateCommissionAction
{
    /**
     * If the paying user was referred, create a held commission record.
     */
    public function execute(Payment $payment): ?Commission
    {
        $payment->loadMissing('user');
        $referredUser = $payment->user;

        if (! $referredUser->referred_by_id) {
            return null;
        }

        $referral = Referral::where('referrer_id', $referredUser->referred_by_id)
            ->where('referred_id', $referredUser->id)
            ->first();

        if (! $referral) {
            // Create the missing referral record (defensive)
            $referral = Referral::create([
                'referrer_id' => $referredUser->referred_by_id,
                'referred_id' => $referredUser->id,
                'converted_at' => now(),
            ]);
        }

        // Mark referral as converted on first payment
        if (! $referral->converted_at) {
            $referral->update(['converted_at' => now()]);
            $rate = (float) config('cnm.affiliate.commission_percent', 30);
        } else {
            // Recurring renewal commission
            $rate = (float) config('cnm.affiliate.recurring_percent', 20);
        }

        $amount = round((float) $payment->amount * ($rate / 100), 2);
        $holdDays = (int) config('cnm.affiliate.hold_days', 14);

        return Commission::create([
            'referrer_id' => $referral->referrer_id,
            'referral_id' => $referral->id,
            'payment_id' => $payment->id,
            'amount' => $amount,
            'currency' => $payment->currency,
            'type' => 'percent',
            'rate' => $rate,
            'status' => 'pending',
            'hold_until' => now()->addDays($holdDays),
        ]);
    }
}
