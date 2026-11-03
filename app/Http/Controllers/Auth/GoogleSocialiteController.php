<?php

namespace App\Http\Controllers\Auth;

use App\Domains\Subscription\Actions\CreateTrialSubscriptionAction;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirect;

class GoogleSocialiteController extends Controller
{
    public function redirect(): SymfonyRedirect
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(CreateTrialSubscriptionAction $createTrial): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable $e) {
            return redirect()->route('login')->withErrors([
                'oauth' => 'Google sign-in failed. Please try again.',
            ]);
        }

        $user = User::where('email', $googleUser->getEmail())->first();

        if (! $user) {
            $user = DB::transaction(function () use ($googleUser, $createTrial) {
                $user = User::create([
                    'name' => $googleUser->getName() ?? 'User',
                    'email' => $googleUser->getEmail(),
                    'password' => bcrypt(Str::random(40)),
                    'email_verified_at' => now(),
                    'avatar_path' => $googleUser->getAvatar(),
                ]);
                $user->assignRole('user');
                $createTrial->execute($user);
                return $user;
            });
        }

        Auth::login($user, true);

        return redirect()->intended(route('dashboard'));
    }
}
