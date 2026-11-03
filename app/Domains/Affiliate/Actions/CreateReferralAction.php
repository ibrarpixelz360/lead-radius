<?php

namespace App\Domains\Affiliate\Actions;

use App\Models\Referral;
use App\Models\User;
use Illuminate\Http\Request;

class CreateReferralAction
{
    /**
     * Look up the referrer by code from the cookie/request and create a Referral.
     * Also sets the referred_by_id on the new user.
     */
    public function execute(User $newUser, Request $request): ?Referral
    {
        $cookieName = config('cnm.affiliate.cookie_name', 'cnm_ref');
        $code = $request->cookie($cookieName) ?? $request->input('ref');

        if (! $code) {
            return null;
        }

        $referrer = User::where('referral_code', $code)
            ->where('status', 'active')
            ->first();

        // Disallow self-referral and missing referrer
        if (! $referrer || $referrer->id === $newUser->id) {
            return null;
        }

        $newUser->update(['referred_by_id' => $referrer->id]);

        return Referral::firstOrCreate(
            ['referrer_id' => $referrer->id, 'referred_id' => $newUser->id],
            [
                'landing_url' => substr($request->headers->get('Referer', ''), 0, 500) ?: null,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]
        );
    }
}
