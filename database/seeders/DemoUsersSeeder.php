<?php

namespace Database\Seeders;

use App\Domains\Subscription\Actions\CreateTrialSubscriptionAction;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUsersSeeder extends Seeder
{
    public function run(): void
    {
        $action = app(CreateTrialSubscriptionAction::class);

        $demo = User::firstOrCreate(
            ['email' => 'demo@customernearme.com'],
            [
                'name' => 'Demo User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'status' => 'active',
            ]
        );

        if (! $demo->hasRole('user')) {
            $demo->assignRole('user');
        }

        if (! $demo->subscriptions()->exists()) {
            $action->execute($demo);
        }
    }
}
