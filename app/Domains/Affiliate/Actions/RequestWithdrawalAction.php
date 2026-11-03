<?php

namespace App\Domains\Affiliate\Actions;

use App\Models\Commission;
use App\Models\User;
use App\Models\Withdrawal;
use Illuminate\Support\Facades\DB;

class RequestWithdrawalAction
{
    /**
     * @param array{method:string, account_title:string, account_number:string, bank_name?:string} $details
     */
    public function execute(User $user, float $amount, array $details): Withdrawal
    {
        return DB::transaction(function () use ($user, $amount, $details) {
            $minimum = (float) config('cnm.affiliate.min_withdrawal', 1000);
            abort_if($amount < $minimum, 422,
                "Minimum withdrawal is PKR ".number_format($minimum));

            $available = (float) Commission::where('referrer_id', $user->id)
                ->where('status', 'approved')
                ->whereNull('withdrawal_id')
                ->lockForUpdate()
                ->sum('amount');

            abort_if($amount > $available, 422,
                'Requested amount exceeds your available balance.');

            // Block multiple pending withdrawal requests
            $pendingExists = Withdrawal::where('user_id', $user->id)
                ->where('status', 'pending')
                ->exists();

            abort_if($pendingExists, 422,
                'You already have a pending withdrawal request.');

            $withdrawal = Withdrawal::create([
                'user_id' => $user->id,
                'amount' => $amount,
                'currency' => 'PKR',
                'method' => $details['method'],
                'account_title' => $details['account_title'],
                'account_number' => $details['account_number'],
                'bank_name' => $details['bank_name'] ?? null,
                'status' => 'pending',
            ]);

            // Lock approved commissions to this withdrawal up to the requested amount
            $remaining = $amount;
            $commissions = Commission::where('referrer_id', $user->id)
                ->where('status', 'approved')
                ->whereNull('withdrawal_id')
                ->orderBy('created_at')
                ->get();

            foreach ($commissions as $c) {
                if ($remaining <= 0) break;
                if ((float) $c->amount <= $remaining) {
                    $c->update(['withdrawal_id' => $withdrawal->id]);
                    $remaining -= (float) $c->amount;
                }
                // Note: partial commission allocation isn't supported; user gets
                // exactly-fitting commissions plus whatever leaves a positive balance.
            }

            return $withdrawal;
        });
    }
}
