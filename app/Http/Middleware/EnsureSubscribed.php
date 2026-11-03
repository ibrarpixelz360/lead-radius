<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSubscribed
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login');
        }

        if (! $user->hasActiveSubscription() && ! $user->isOnTrial()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'An active subscription is required to perform this action.',
                    'code' => 'subscription_required',
                ], 402);
            }

            return redirect()->route('billing.index')
                ->with('warning', 'Your trial has ended. Please subscribe to continue.');
        }

        return $next($request);
    }
}
