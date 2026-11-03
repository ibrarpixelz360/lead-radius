<?php

namespace App\Domains\Subscription\Actions;

use App\Models\Payment;
use App\Models\User;
use App\Notifications\PaymentRejectedNotification;

class RejectPaymentAction
{
    public function execute(Payment $payment, ?User $admin, string $reason): Payment
    {
        if ($payment->status !== 'pending_review') {
            throw new \DomainException("Payment {$payment->id} is not pending review");
        }

        $payment->update([
            'status' => 'rejected',
            'reviewed_by' => $admin?->id,
            'reviewed_at' => now(),
            'rejection_reason' => $reason,
        ]);

        $payment->user->notify(new PaymentRejectedNotification($payment->fresh(['plan'])));

        return $payment->fresh();
    }
}
