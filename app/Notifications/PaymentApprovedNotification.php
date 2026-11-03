<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentApprovedNotification extends Notification
{
    use Queueable;

    public function __construct(public Payment $payment) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $sub = $this->payment->subscription;
        $expires = $sub ? $sub->ends_at->format('M j, Y') : 'soon';

        $message = (new MailMessage)
            ->subject('Your subscription is active 🎉')
            ->greeting("Hi {$notifiable->name},")
            ->line("Your payment has been approved and your **{$this->payment->plan->name}** plan is now active.")
            ->line("Your subscription is valid until **{$expires}**.")
            ->action('Go to dashboard', url('/dashboard'));

        if ($this->payment->invoice_path) {
            $message->line('Your invoice is attached to this email and available in your billing dashboard.');
        }

        return $message->line('Welcome aboard — start finding leads!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'payment_approved',
            'payment_id' => $this->payment->id,
            'plan' => $this->payment->plan->name,
        ];
    }
}
