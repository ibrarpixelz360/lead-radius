<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentRejectedNotification extends Notification
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
            ->subject('Issue with your payment')
            ->greeting("Hi {$notifiable->name},")
            ->line("Unfortunately we couldn't verify your recent payment for the **{$this->payment->plan->name}** plan.")
            ->line("**Reason:** {$this->payment->rejection_reason}")
            ->line('You can re-submit your payment with an updated screenshot or contact support if you believe this is a mistake.')
            ->action('Re-submit payment', url('/billing'))
            ->line('Thank you for your patience.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'payment_rejected',
            'payment_id' => $this->payment->id,
            'reason' => $this->payment->rejection_reason,
        ];
    }
}
