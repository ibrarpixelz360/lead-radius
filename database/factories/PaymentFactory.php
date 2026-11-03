<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'plan_id' => Plan::factory(),
            'amount' => 2219,
            'currency' => 'PKR',
            'transaction_id' => 'TX'.$this->faker->unique()->numerify('########'),
            'bank_name' => 'HBL',
            'sender_name' => $this->faker->name,
            'sender_account' => $this->faker->numerify('##########'),
            'screenshot_path' => 'fake/proof.jpg',
            'status' => 'pending_review',
        ];
    }

    public function approved(): self
    {
        return $this->state(fn () => [
            'status' => 'approved',
            'reviewed_at' => now(),
        ]);
    }

    public function rejected(): self
    {
        return $this->state(fn () => [
            'status' => 'rejected',
            'reviewed_at' => now(),
            'rejection_reason' => 'Screenshot unreadable',
        ]);
    }
}
