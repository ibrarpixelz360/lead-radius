<?php

namespace App\Domains\Subscription\Actions;

use App\Models\Payment;
use App\Models\User;
use App\Notifications\PaymentApprovedNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ApprovePaymentAction
{
    public function __construct(
        protected ActivateSubscriptionAction $activate,
        protected GenerateInvoiceAction $invoice,
        protected CalculateAffiliateCommissionAction $commission,
    ) {}

    public function execute(Payment $payment, ?User $admin = null, ?string $notes = null): Payment
    {
        return DB::transaction(function () use ($payment, $admin, $notes) {
            if ($payment->status !== 'pending_review') {
                throw new \DomainException("Payment {$payment->id} is not pending review (status: {$payment->status})");
            }

            $payment->update([
                'status' => 'approved',
                'reviewed_by' => $admin?->id,
                'reviewed_at' => now(),
                'admin_notes' => $notes,
            ]);

            // 1. Activate subscription
            $subscription = $this->activate->execute($payment);

            // 2. Generate invoice PDF (best-effort — don't block on failure)
            try {
                $this->invoice->execute($payment);
            } catch (\Throwable $e) {
                Log::warning("Invoice generation failed for payment {$payment->id}: ".$e->getMessage());
            }

            // 3. Calculate affiliate commission if applicable
            try {
                $this->commission->execute($payment);
            } catch (\Throwable $e) {
                Log::warning("Commission calculation failed for payment {$payment->id}: ".$e->getMessage());
            }

            // 4. Notify the user
            $payment->user->notify(new PaymentApprovedNotification($payment->fresh(['plan', 'subscription'])));

            return $payment->fresh();
        });
    }
}
