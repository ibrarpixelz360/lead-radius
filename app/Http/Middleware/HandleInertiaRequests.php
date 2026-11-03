<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        return array_merge(parent::share($request), [
            'name' => config('app.name'),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar_url' => $user->avatar_path
                        ? asset('storage/'.$user->avatar_path)
                        : null,
                    'referral_code' => $user->referral_code,
                    'is_admin' => $user->isAdmin(),
                    'roles' => $user->getRoleNames(),
                    'last_login_at' => $user->last_login_at?->diffForHumans(),
                    'leads_count' => fn () => $user->leads()->count(),
                    'devices_count' => fn () => $user->devices()->active()->count(),
                ] : null,
                'subscription' => $user?->activeSubscription ? [
                    'plan' => $user->activeSubscription->plan->only(['id', 'name', 'slug']),
                    'status' => $user->activeSubscription->status,
                    'days_remaining' => $user->activeSubscription->daysRemaining(),
                    'is_trial' => $user->activeSubscription->isOnTrial(),
                ] : null,
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'app' => [
                'env' => app()->environment(),
                'url' => config('app.url'),
                'recaptcha_site_key' => config('cnm.recaptcha.site_key'),
                'google_oauth_enabled' => (bool) config('services.google.client_id'),
            ],
        ]);
    }
}
