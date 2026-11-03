<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();
        return Inertia::render('Settings/Profile', [
            'mustVerifyEmail' => $user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
            'profile' => [
                'name'              => $user->name,
                'email'             => $user->email,
                'phone'             => $user->phone,
                'country_code'      => $user->country_code,
                'avatar_url'        => $user->avatar_path ? asset('storage/'.$user->avatar_path) : null,
                'email_verified_at' => $user->email_verified_at?->toISOString(),
                'last_login_at'     => $user->last_login_at?->diffForHumans(),
                'status'            => $user->status,
                'roles'             => $user->getRoleNames(),
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'string', 'email', 'max:180', 'unique:users,email,'.$request->user()->id],
            'phone' => ['nullable', 'string', 'max:30'],
            'country_code' => ['nullable', 'string', 'size:2'],
            'avatar' => ['nullable', 'image', 'max:2048'],
        ]);

        $user = $request->user();
        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($request->hasFile('avatar')) {
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }
            $user->avatar_path = $request->file('avatar')->store('avatars', 'public');
        }

        $user->save();

        return back()->with('success', 'Profile updated.');
    }

    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::min(8)->mixedCase()->numbers()],
        ]);

        $request->user()->update(['password' => Hash::make($validated['password'])]);

        return back()->with('success', 'Password updated.');
    }

    public function clearData(Request $request): RedirectResponse
    {
        $user = $request->user();
        $user->leads()->detach();
        $user->searches()->delete();

        return back()->with('success', 'All search history and saved leads have been cleared.');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate(['password' => ['required', 'current_password']]);

        $user = $request->user();
        \Illuminate\Support\Facades\Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
