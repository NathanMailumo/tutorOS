<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resource_users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('clerk_id');
            $table->foreign('clerk_id')->references('clerk_id')->on('users')->cascadeOnDelete();
            $table->foreignUuid('resource_id')->constrained()->cascadeOnDelete();
            $table->enum('role', ['owner', 'viewer']);
            $table->enum('status', ['pending', 'accepted', 'declined'])->default('pending');
            $table->timestamps();
            $table->unique(['resource_id', 'clerk_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invites');
    }
};
