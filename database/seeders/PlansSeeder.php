<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlansSeeder extends Seeder
{
    public function run(): void
    {
        Plan::updateOrCreate(['slug' => 'free'], [
            'name' => 'Free Trial',
            'description' => '7-day free trial. No credit card required.',
            'price' => 0,
            'currency' => 'PKR',
            'billing_cycle' => 'monthly',
            'trial_days' => 7,
            'max_devices' => 1,
            'monthly_lead_limit' => null, // unlimited during trial (soft cap by daily fair-use)
            'monthly_export_limit' => null,
            'saved_searches_limit' => 5,
            'priority_support' => false,
            'api_access' => false,
            'ai_scoring' => true,
            'features' => ['fair_use_daily_cap' => 100],
            'sort_order' => 1,
            'is_active' => true,
            'is_featured' => false,
        ]);

        Plan::updateOrCreate(['slug' => 'starter'], [
            'name' => 'Starter',
            'description' => 'Perfect for freelancers and solo marketers.',
            'price' => 2219,
            'currency' => 'PKR',
            'billing_cycle' => 'monthly',
            'trial_days' => 0,
            'max_devices' => 2,
            'monthly_lead_limit' => null,
            'monthly_export_limit' => null,
            'saved_searches_limit' => 50,
            'priority_support' => true,
            'api_access' => false,
            'ai_scoring' => true,
            'features' => [],
            'sort_order' => 2,
            'is_active' => true,
            'is_featured' => false,
        ]);

        Plan::updateOrCreate(['slug' => 'growth'], [
            'name' => 'Growth',
            'description' => 'For agencies and growing teams. Best value.',
            'price' => 4441,
            'currency' => 'PKR',
            'billing_cycle' => 'monthly',
            'trial_days' => 0,
            'max_devices' => 5,
            'monthly_lead_limit' => null,
            'monthly_export_limit' => null,
            'saved_searches_limit' => null,
            'priority_support' => true,
            'api_access' => true,
            'ai_scoring' => true,
            'features' => [],
            'sort_order' => 3,
            'is_active' => true,
            'is_featured' => true,
        ]);
    }
}
