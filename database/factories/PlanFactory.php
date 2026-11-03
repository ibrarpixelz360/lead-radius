<?php

namespace Database\Factories;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PlanFactory extends Factory
{
    protected $model = Plan::class;

    public function definition(): array
    {
        $name = fake()->word();
        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name).'-'.Str::random(4),
            'description' => fake()->sentence(),
            'price' => fake()->randomElement([0, 1000, 2219, 4441]),
            'currency' => 'PKR',
            'billing_cycle' => 'monthly',
            'trial_days' => 0,
            'max_devices' => fake()->numberBetween(1, 5),
            'monthly_lead_limit' => null,
            'monthly_export_limit' => null,
            'priority_support' => fake()->boolean(),
            'is_active' => true,
            'sort_order' => 0,
        ];
    }
}
