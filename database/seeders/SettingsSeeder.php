<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['site_name', 'Customer Near Me', 'string', 'general', true],
            ['site_tagline', 'Verified by GMB Leads Instantly', 'string', 'general', true],
            ['support_email', 'support@customernearme.com', 'string', 'general', true],
            ['whatsapp_support', '+92 300 0000000', 'string', 'general', true],
            ['min_withdrawal_amount', '1000', 'integer', 'affiliate', false],
            ['affiliate_commission_percent', '30', 'integer', 'affiliate', false],
            ['affiliate_recurring_percent', '20', 'integer', 'affiliate', false],
            ['affiliate_hold_days', '14', 'integer', 'affiliate', false],
            ['trial_days', '7', 'integer', 'subscription', false],
            ['scrape_max_results', '200', 'integer', 'scraping', false],
            ['payment_review_sla_hours', '4', 'integer', 'payment', true],
        ];

        foreach ($settings as [$key, $value, $type, $group, $is_public]) {
            Setting::updateOrCreate(
                ['key' => $key],
                compact('value', 'type', 'group', 'is_public')
            );
        }
    }
}
