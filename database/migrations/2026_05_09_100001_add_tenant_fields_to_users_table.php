<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('tenant_id')->nullable()->constrained('tenants')->nullOnDelete()->after('id');
            $table->unsignedBigInteger('current_tenant_id')->nullable()->after('tenant_id');
            $table->enum('role', [
                'super_admin',
                'store_owner',
                'operations_manager',
                'packing_staff',
                'support_agent',
                'finance_manager',
            ])->default('store_owner')->after('current_tenant_id');
            $table->boolean('is_tenant_owner')->default(false)->after('role');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['tenant_id']);
            $table->dropColumn(['tenant_id', 'current_tenant_id', 'role', 'is_tenant_owner']);
        });
    }
};
