<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            // Users
            'users.view', 'users.create', 'users.update', 'users.delete', 'users.ban', 'users.impersonate',
            // Plans
            'plans.view', 'plans.manage',
            // Subscriptions
            'subscriptions.view', 'subscriptions.manage',
            // Payments
            'payments.view', 'payments.approve', 'payments.reject',
            // Leads
            'leads.view_all', 'leads.delete',
            // Affiliates
            'affiliates.view', 'affiliates.manage',
            'withdrawals.view', 'withdrawals.approve', 'withdrawals.reject',
            // CMS
            'cms.manage', 'blog.manage',
            // Support
            'tickets.view', 'tickets.respond',
            // Settings
            'settings.manage', 'proxies.manage',
            // Email
            'emails.broadcast', 'emails.templates',
            // Admin meta
            'admin.access', 'admin.manage_admins',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        $superAdmin = Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);
        $superAdmin->syncPermissions(Permission::all());

        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $admin->syncPermissions(Permission::whereNotIn('name', [
            'admin.manage_admins', 'settings.manage',
        ])->get());

        Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
    }
}
