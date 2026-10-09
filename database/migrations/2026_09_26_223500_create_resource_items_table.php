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
        Schema::create('resource_items', function (Blueprint $table) {
            $table->id();
            $table->string('clerk_id');
            $table->foreign('clerk_id')->references('clerk_id')->on('users')->cascadeOnDelete();
            $table->foreignId('resource_id')->constrained()->onDelete('cascade');
            $table->foreignId('study_session_id')->nullable()->constrained()->nullOnDelete();

            $table->enum('type', ['video', 'link', 'pq', 'revision', 'note']);

            // Primary Content Fields
            $table->string('title');
            $table->text('url')->nullable();      // Stored for 'link' and 'video'
            $table->text('content')->nullable();  // Stored for 'revision' and 'note'
            $table->text('description')->nullable();
            $table->enum('status', ['active', 'notActive'])->default('active');
            // Scraped / Extracted Metadata & OEmbed Context
            // Stores thumbnail URLs, domain name, channel name, video duration, site favicons, etc.
            $table->json('metadata')->nullable();

            $table->timestamps();

            // Performance Indexes
            $table->index(['resource_id', 'type']);
            $table->index('clerk_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resource_items');
    }
};
