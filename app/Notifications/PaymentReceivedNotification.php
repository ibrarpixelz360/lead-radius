<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentReceivedNotification extends Notification
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
            ->subject("We received your payment of {$this->payment->currency} ".number_format((float) $this->payment->amount))
            ->greeting("Hi {$notifiable->name},")
            ->line("We've received your payment for the **{$this->payment->plan->name}** plan.")
            ->line("Amount: {$this->payment->currency} ".number_format((float) $this->payment->amount))
            ->line("Transaction ID: {$this->payment->transaction_id}")
            ->line('Our team will review your payment within 4 hours and activate your plan once approved.')
            ->action('View payment status', url('/billing'))
            ->line('Thanks for choosing '.config('app.name').'!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'payment_received',
            'payment_id' => $this->payment->id,
            'amount' => (float) $this->payment->amount,
            'plan' => $this->payment->plan->name,
        ];
    }
}
