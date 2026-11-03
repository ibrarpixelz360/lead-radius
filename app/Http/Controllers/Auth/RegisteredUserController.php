<?php

namespace App\Http\Controllers\Auth;

use App\Domains\Affiliate\Actions\CreateReferralAction;
use App\Domains\Subscription\Actions\CreateTrialSubscriptionAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'referralCode' => request()->cookie(config('cnm.affiliate.cookie_name'))
                ?? request()->query('ref'),
        ]);
    }

    public function store(
        RegisterRequest $request,
        CreateTrialSubscriptionAction $createTrial,
        CreateReferralAction $createReferral,
    ): RedirectResponse {
        $user = DB::transaction(function () use ($request, $createTrial, $createReferral) {
            $user = User::create([
                'name' => $request->validated('name'),
                'email' => $request->validated('email'),
                'password' => $request->validated('password'),
                'phone' => $request->validated('phone'),
                'country_code' => $request->validated('country_code'),
            ]);

            $user->assignRole('user');
            $createTrial->execute($user);
            $createReferral->execute($user, $request);

            return $user;
        });

        event(new Registered($user));
        Auth::login($user);

        return redirect(route('dashboard', absolute: false))
            ->with('success', 'Welcome! Your 7-day trial has started.');
    }
}
