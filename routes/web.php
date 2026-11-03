<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\GoogleSocialiteController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\DeviceController;
use App\Http\Controllers\Web\LandingController;
use App\Http\Controllers\Web\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Pages (Landing, Pricing, etc)
|--------------------------------------------------------------------------
*/

Route::get('/', [LandingController::class, 'landing'])->name('home');
Route::get('/pricing', [LandingController::class, 'pricing'])->name('pricing');
Route::get('/how-it-works', [LandingController::class, 'howItWorks'])->name('how-it-works');
Route::get('/faq', [LandingController::class, 'faq'])->name('faq');
Route::get('/affiliate-program', [LandingController::class, 'affiliate'])->name('affiliate-program');
Route::get('/contact', [LandingController::class, 'contact'])->name('contact');
Route::post('/contact', [\App\Http\Controllers\Web\ContactController::class, 'store'])
    ->middleware('throttle:5,60')
    ->name('contact.store');
Route::get('/terms', [LandingController::class, 'terms'])->name('terms');
Route::get('/privacy', [LandingController::class, 'privacy'])->name('privacy');

// Public blog
Route::get('/blog', [\App\Http\Controllers\Web\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\Web\BlogController::class, 'show'])->name('blog.show');

// Capture referral cookie on landing
Route::get('/r/{code}', function (string $code) {
    return redirect('/')->withCookie(cookie(
        config('cnm.affiliate.cookie_name'),
        $code,
        60 * 24 * config('cnm.affiliate.cookie_days')
    ));
})->name('referral');

/*
|--------------------------------------------------------------------------
| Guest Authentication Routes
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');

    // Google OAuth
    Route::get('auth/google', [GoogleSocialiteController::class, 'redirect'])->name('auth.google');
    Route::get('auth/google/callback', [GoogleSocialiteController::class, 'callback']);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'track.device'])->group(function () {

    // Email verification
    Route::get('verify-email', [EmailVerificationController::class, 'notice'])->name('verification.notice');
    Route::get('verify-email/{id}/{hash}', [EmailVerificationController::class, 'verify'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
    Route::post('email/verification-notification', [EmailVerificationController::class, 'send'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // Email-verified routes
    Route::middleware('verified')->group(function () {
        Route::get('/dashboard', DashboardController::class)->name('dashboard');

        // Profile
        Route::get('/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/settings/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::put('/settings/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
        Route::delete('/settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::delete('/settings/profile/data', [ProfileController::class, 'clearData'])->name('profile.clear-data');

        // Devices
        Route::get('/settings/devices', [DeviceController::class, 'index'])->name('devices.index');
        Route::delete('/settings/devices/{device}', [DeviceController::class, 'destroy'])->name('devices.destroy');

        // Notifications
        Route::get('/settings/notifications', [\App\Http\Controllers\Web\NotificationController::class, 'index'])
            ->name('notifications.index');
        Route::patch('/settings/notifications/preferences', [\App\Http\Controllers\Web\NotificationController::class, 'updatePreferences'])
            ->name('notifications.preferences');
        Route::post('/notifications/{id}/read', [\App\Http\Controllers\Web\NotificationController::class, 'markRead'])
            ->name('notifications.read');
        Route::post('/notifications/read-all', [\App\Http\Controllers\Web\NotificationController::class, 'markAllRead'])
            ->name('notifications.read-all');

        // Leads — search flow
        Route::middleware('subscribed')->group(function () {
            Route::get('/leads/search', [\App\Http\Controllers\Web\LeadSearchController::class, 'create'])
                ->name('leads.search.create');
            Route::post('/leads/search', [\App\Http\Controllers\Web\LeadSearchController::class, 'store'])
                ->middleware(['plan.limits:leads', 'throttle:lead-search'])
                ->name('leads.search.store');

            // Google Maps Lead Generator (Client Portal)
            Route::get('/leads/generator', [\App\Http\Controllers\Web\LeadSearchController::class, 'create'])
                ->name('leads.generator');
            Route::post('/leads/generator/start', [\App\Http\Controllers\Web\LeadSearchController::class, 'startGenerator'])
                ->middleware(['plan.limits:leads', 'throttle:lead-search'])
                ->name('leads.generator.start');
            Route::get('/leads/generator/batches/{batch}/status', [\App\Http\Controllers\Web\LeadSearchController::class, 'batchStatus'])
                ->name('leads.generator.batches.status');
            Route::get('/leads/generator/batches/{batch}/export', [\App\Http\Controllers\Web\LeadSearchController::class, 'batchExport'])
                ->name('leads.generator.batches.export');
            Route::post('/leads/generator/batches/{batch}/cancel', [\App\Http\Controllers\Web\LeadSearchController::class, 'batchCancel'])
                ->name('leads.generator.batches.cancel');

            Route::get('/leads/searches', [\App\Http\Controllers\Web\LeadSearchController::class, 'index'])
                ->name('leads.searches.index');
            Route::get('/leads/searches/{search}', [\App\Http\Controllers\Web\LeadSearchController::class, 'show'])
                ->name('leads.searches.show');
            Route::get('/leads/searches/{search}/status', [\App\Http\Controllers\Web\LeadSearchController::class, 'status'])
                ->name('leads.searches.status');
            Route::post('/leads/searches/{search}/cancel', [\App\Http\Controllers\Web\LeadSearchController::class, 'cancel'])
                ->name('leads.searches.cancel');
        });

        // Leads — management (static routes MUST come before the {lead} wildcard)
        Route::get('/leads', [\App\Http\Controllers\Web\LeadController::class, 'index'])->name('leads.index');
        Route::post('/leads/bulk', [\App\Http\Controllers\Web\LeadController::class, 'bulk'])->name('leads.bulk');

        // Saved searches (must be before /leads/{lead})
        Route::get('/leads/saved', [\App\Http\Controllers\Web\SavedSearchController::class, 'index'])
            ->name('leads.saved.index');
        Route::post('/leads/saved/{savedSearch}/run', [\App\Http\Controllers\Web\SavedSearchController::class, 'run'])
            ->middleware(['subscribed', 'plan.limits:leads'])
            ->name('leads.saved.run');
        Route::delete('/leads/saved/{savedSearch}', [\App\Http\Controllers\Web\SavedSearchController::class, 'destroy'])
            ->name('leads.saved.destroy');

        // Exports (must be before /leads/{lead})
        Route::get('/leads/exports', [\App\Http\Controllers\Web\ExportController::class, 'index'])
            ->name('leads.exports.index');
        Route::post('/leads/exports', [\App\Http\Controllers\Web\ExportController::class, 'store'])
            ->middleware(['plan.limits:export'])
            ->name('leads.exports.store');
        Route::get('/leads/exports/{export}/download', [\App\Http\Controllers\Web\ExportController::class, 'download'])
            ->name('leads.exports.download');
        Route::delete('/leads/exports/{export}', [\App\Http\Controllers\Web\ExportController::class, 'destroy'])
            ->name('leads.exports.destroy');

        // Wildcard lead route (must be last among GET /leads/* routes)
        Route::get('/leads/{lead}', [\App\Http\Controllers\Web\LeadController::class, 'show'])->name('leads.show');
        Route::patch('/leads/{lead}', [\App\Http\Controllers\Web\LeadController::class, 'update'])->name('leads.update');

        // Billing & Subscriptions (Phase 3)
        Route::get('/billing', [\App\Http\Controllers\Web\BillingController::class, 'index'])
            ->name('billing.index');
        Route::get('/billing/checkout/{plan}', [\App\Http\Controllers\Web\BillingController::class, 'checkout'])
            ->name('billing.checkout');
        Route::post('/billing/payments', [\App\Http\Controllers\Web\BillingController::class, 'submitPayment'])
            ->middleware('throttle:5,60')
            ->name('billing.payment.submit');
        Route::get('/billing/invoices/{payment}/download', [\App\Http\Controllers\Web\BillingController::class, 'downloadInvoice'])
            ->name('billing.invoice.download');

        // Affiliate (Phase 4)
        Route::prefix('affiliate')->name('affiliate.')->group(function () {
            Route::get('/', [\App\Http\Controllers\Web\AffiliateController::class, 'index'])
                ->name('index');
            Route::get('/commissions', [\App\Http\Controllers\Web\AffiliateController::class, 'commissions'])
                ->name('commissions.index');
            Route::get('/referrals', [\App\Http\Controllers\Web\AffiliateController::class, 'referrals'])
                ->name('referrals.index');
            Route::get('/withdrawals', [\App\Http\Controllers\Web\AffiliateController::class, 'withdrawals'])
                ->name('withdrawals.index');
            Route::post('/withdrawals', [\App\Http\Controllers\Web\AffiliateController::class, 'requestWithdrawal'])
                ->middleware('throttle:3,60')
                ->name('withdrawals.store');
        });
    });
});
