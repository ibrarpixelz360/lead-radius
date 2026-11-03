<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
            PlansSeeder::class,
            AdminUserSeeder::class,
            FaqSeeder::class,
            TestimonialSeeder::class,
            EmailTemplateSeeder::class,
            SettingsSeeder::class,
        ]);

        if (app()->environment('local')) {
            $this->call([
                DemoUsersSeeder::class,
            ]);
        }
    }
}
