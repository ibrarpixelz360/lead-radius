<?php

namespace Database\Seeders;

use App\Models\EmailTemplate;
use Illuminate\Database\Seeder;

class EmailTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $templates = [
            ['welcome', 'Welcome Email', 'Welcome to {{app_name}}!', "Hi {{name}},\n\nWelcome to {{app_name}}! Your 7-day free trial has started.\n\nGet started: {{dashboard_url}}", ['name', 'app_name', 'dashboard_url']],
            ['trial_expiring', 'Trial Expiring (2 days)', 'Your trial ends in 2 days', "Hi {{name}},\n\nYour free trial ends in {{days}} days. Upgrade now to keep generating leads.\n\nView plans: {{pricing_url}}", ['name', 'days', 'pricing_url']],
            ['trial_expired', 'Trial Expired', 'Your trial has expired', "Hi {{name}},\n\nYour free trial has ended. Subscribe to continue: {{pricing_url}}", ['name', 'pricing_url']],
            ['payment_received', 'Payment Received', 'We received your payment', "Hi {{name}},\n\nWe received your payment of {{amount}} for the {{plan}} plan. Our team will review it within 4 hours.", ['name', 'amount', 'plan']],
            ['payment_approved', 'Payment Approved', 'Your subscription is active!', "Hi {{name}},\n\nYour payment has been approved. Your {{plan}} plan is now active until {{expires_at}}.\n\nInvoice: {{invoice_url}}", ['name', 'plan', 'expires_at', 'invoice_url']],
            ['payment_rejected', 'Payment Rejected', 'Issue with your payment', "Hi {{name}},\n\nWe couldn't verify your payment. Reason: {{reason}}\n\nPlease re-submit: {{billing_url}}", ['name', 'reason', 'billing_url']],
            ['commission_earned', 'New affiliate commission', 'You earned a commission!', "Hi {{name}},\n\nYou earned {{amount}} from a referral. View your dashboard: {{affiliate_url}}", ['name', 'amount', 'affiliate_url']],
            ['withdrawal_paid', 'Withdrawal paid', 'Your withdrawal has been paid', "Hi {{name}},\n\nYour withdrawal of {{amount}} has been processed. Reference: {{reference}}", ['name', 'amount', 'reference']],
            ['new_device_login', 'New device login', 'New login on your account', "Hi {{name}},\n\nA new device logged into your account from {{location}} on {{date}}. If this wasn't you, change your password immediately.", ['name', 'location', 'date']],
        ];

        foreach ($templates as [$key, $name, $subject, $body, $variables]) {
            EmailTemplate::updateOrCreate(
                ['key' => $key],
                compact('name', 'subject', 'body', 'variables') + ['is_active' => true]
            );
        }
    }
}
