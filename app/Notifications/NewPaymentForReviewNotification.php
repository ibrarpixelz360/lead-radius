<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewPaymentForReviewNotification extends Notification
{
    use Queueable;

    public function __construct(public Payment $payment) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('[Action Required] New payment to review')
            ->line("**{$this->payment->user->name}** ({$this->payment->user->email}) submitted a payment.")
            ->line("Plan: {$this->payment->plan->name}")
            ->line("Amount: {$this->payment->currency} ".number_format((float) $this->payment->amount))
            ->line("Transaction: {$this->payment->transaction_id}")
            ->action('Review payment', url('/admin/payments/'.$this->payment->id.'/edit'));
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_payment_review',
            'payment_id' => $this->payment->id,
            'user_email' => $this->payment->user->email,
            'amount' => (float) $this->payment->amount,
        ];
    }
}
