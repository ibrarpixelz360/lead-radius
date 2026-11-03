<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('search_leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('search_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lead_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['search_id', 'lead_id']);
            $table->index('lead_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('search_leads');
    }
};
