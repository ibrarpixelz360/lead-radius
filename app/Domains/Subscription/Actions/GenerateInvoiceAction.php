<?php

namespace App\Domains\Subscription\Actions;

use App\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class GenerateInvoiceAction
{
    public function execute(Payment $payment): string
    {
        $payment->loadMissing('user', 'plan', 'subscription');

        // Generate invoice number if not set: CNM-YYYYMM-NNNNN
        if (! $payment->invoice_number) {
            $sequence = Payment::whereYear('created_at', $payment->created_at->year)
                ->whereMonth('created_at', $payment->created_at->month)
                ->where('id', '<=', $payment->id)
                ->count();

            $payment->invoice_number = sprintf(
                'CNM-%s-%05d',
                $payment->created_at->format('Ym'),
                $sequence
            );
        }

        $pdf = Pdf::loadView('invoices.template', [
            'payment' => $payment,
            'app_name' => config('app.name'),
            'bank' => config('cnm.bank'),
        ]);

        $relativePath = "{$payment->user_id}/{$payment->invoice_number}.pdf";
        Storage::disk('invoices')->put($relativePath, $pdf->output());

        $payment->invoice_path = $relativePath;
        $payment->save();

        return $relativePath;
    }
}
