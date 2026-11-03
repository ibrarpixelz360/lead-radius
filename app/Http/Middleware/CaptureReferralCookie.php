<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class CaptureReferralCookie
{
    public function handle(Request $request, Closure $next): Response
    {
        $ref = $request->query('ref');

        $response = $next($request);

        // Only set if a code is present, valid format, and not already set
        if ($ref && preg_match('/^[A-Z0-9]{8,12}$/', $ref)) {
            $cookieName = config('cnm.affiliate.cookie_name', 'cnm_ref');
            $existing = $request->cookie($cookieName);

            if (! $existing) {
                $days = (int) config('cnm.affiliate.cookie_days', 90);
                $response->headers->setCookie(
                    Cookie::make($cookieName, $ref, $days * 24 * 60, '/', null, false, false, false, 'lax')
                );
            }
        }

        return $response;
    }
}
