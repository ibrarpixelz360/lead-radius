<?php

namespace Tests;

use Database\Seeders\PlansSeeder;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected bool $seedRolesAndPlans = true;

    protected function setUp(): void
    {
        parent::setUp();

        if ($this->seedRolesAndPlans) {
            $this->seed(RolesAndPermissionsSeeder::class);
            $this->seed(PlansSeeder::class);
        }
    }
}
