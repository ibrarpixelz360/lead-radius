<?php

namespace App\Domains\Subscription\Actions;

use App\Models\Payment;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SubmitPaymentAction
{
    /**
     * Persist a new pending payment from a user submission.
     *
     * @param array<string,mixed> $data Validated PaymentSubmissionRequest data
     */
    public function execute(User $user, array $data, UploadedFile $screenshot): Payment
    {
        return DB::transaction(function () use ($user, $data, $screenshot) {
            // Limit pending payments to prevent spam
            $pendingCount = $user->payments()->where('status', 'pending_review')->count();
            abort_if($pendingCount >= 3, 429, 'You already have multiple pending payments under review.');

            $plan = Plan::findOrFail($data['plan_id']);
            abort_if($plan->isFree(), 422, 'Cannot submit payment for the free plan.');

            // Store screenshot under a UUID, strip the original name
            $extension = strtolower($screenshot->getClientOriginalExtension() ?: 'jpg');
            $filename = "{$user->id}/".Str::uuid()->toString().".{$extension}";
            $path = $screenshot->storeAs('', $filename, 'screenshots');

            return Payment::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'amount' => $plan->price,
                'currency' => $plan->currency,
                'transaction_id' => $data['transaction_id'],
                'bank_name' => $data['bank_name'] ?? null,
                'sender_name' => $data['sender_name'],
                'sender_account' => $data['sender_account'],
                'screenshot_path' => $path,
                'status' => 'pending_review',
            ]);
        });
    }
}
