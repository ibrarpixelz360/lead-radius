<?php

namespace App\Http\Controllers\Web;

use App\Domains\Subscription\Actions\SubmitPaymentAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Payment\PaymentSubmissionRequest;
use App\Models\Payment;
use App\Models\Plan;
use App\Notifications\NewPaymentForReviewNotification;
use App\Notifications\PaymentReceivedNotification;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class BillingController extends Controller
{
    /**
     * Billing dashboard — current plan, history, available upgrades.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Billing/Index', [
            'subscription' => $user->activeSubscription
                ? [
                    'plan' => $user->activeSubscription->plan->only(['id', 'name', 'slug', 'price', 'currency', 'billing_cycle']),
                    'status' => $user->activeSubscription->status,
                    'starts_at' => $user->activeSubscription->starts_at?->toISOString(),
                    'ends_at' => $user->activeSubscription->ends_at?->toISOString(),
                    'ends_at_formatted' => $user->activeSubscription->ends_at?->format('d M Y'),
                    'days_remaining' => $user->activeSubscription->daysRemaining(),
                    'is_trial' => $user->activeSubscription->isOnTrial(),
                ]
                : null,
            'is_on_trial' => $user->isOnTrial(),
            'trial_days_left' => $user->trialDaysLeft(),
            'plans' => Plan::active()->ordered()->get()->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'description' => $p->description,
                'price' => (float) $p->price,
                'currency' => $p->currency,
                'billing_cycle' => $p->billing_cycle,
                'max_devices' => $p->max_devices,
                'monthly_lead_limit' => $p->monthly_lead_limit,
                'monthly_export_limit' => $p->monthly_export_limit,
                'priority_support' => (bool) $p->priority_support,
                'api_access' => (bool) $p->api_access,
                'ai_scoring' => (bool) $p->ai_scoring,
                'is_featured' => (bool) $p->is_featured,
                'is_free' => $p->isFree(),
            ]),
            'payments' => $user->payments()
                ->with('plan:id,name')
                ->latest()
                ->limit(20)
                ->get()
                ->map(fn ($p) => [
                    'id' => $p->id,
                    'plan_name' => $p->plan->name,
                    'amount' => (float) $p->amount,
                    'currency' => $p->currency,
                    'status' => $p->status,
                    'transaction_id' => $p->transaction_id,
                    'invoice_number' => $p->invoice_number,
                    'rejection_reason' => $p->rejection_reason,
                    'has_invoice' => (bool) $p->invoice_path,
                    'created_at' => $p->created_at,
                    'reviewed_at' => $p->reviewed_at,
                ]),
            'bank' => config('cnm.bank'),
        ]);
    }

    /**
     * Show payment submission page for a specific plan.
     */
    public function checkout(Request $request, Plan $plan): Response
    {
        abort_if($plan->isFree(), 422, 'No checkout needed for the free plan.');
        abort_unless($plan->is_active, 404);

        return Inertia::render('Billing/Checkout', [
            'plan' => $plan->only([
                'id', 'name', 'slug', 'description', 'price', 'currency', 'billing_cycle',
            ]),
            'bank' => config('cnm.bank'),
            'reference_code' => 'CNM-'.$request->user()->id.'-'.strtoupper(substr(md5($plan->id.$request->user()->id), 0, 6)),
        ]);
    }

    /**
     * Submit a payment with screenshot.
     */
    public function submitPayment(
        PaymentSubmissionRequest $request,
        SubmitPaymentAction $submit,
    ): RedirectResponse {
        $payment = $submit->execute(
            $request->user(),
            $request->validated(),
            $request->file('screenshot'),
        );

        // Notify user (in-app + email)
        $request->user()->notify(new PaymentReceivedNotification($payment));

        // Notify all admins for action
        $admins = User::role(['super_admin', 'admin'])->get();
        Notification::send($admins, new NewPaymentForReviewNotification($payment));

        return redirect()->route('billing.index')
            ->with('success', 'Payment submitted. Our team will review it within 4 hours.');
    }

    /**
     * Download invoice PDF.
     */
    public function downloadInvoice(Request $request, Payment $payment): BinaryFileResponse
    {
        abort_unless($payment->user_id === $request->user()->id, 403);
        abort_unless($payment->invoice_path, 404, 'Invoice not yet generated.');

        $absolute = Storage::disk('invoices')->path($payment->invoice_path);
        abort_unless(file_exists($absolute), 404);

        return response()->download(
            $absolute,
            ($payment->invoice_number ?: 'invoice-'.$payment->id).'.pdf'
        );
    }
}
