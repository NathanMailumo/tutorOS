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
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('resource_id')->constrained()->onDelete('cascade');

            // Resource Categorization
            // Types: 'link', 'video', 'formula', 'revision', 'note'
            $table->enum('type', ['video', 'link', 'formula', 'revision', 'note']); 

            // Primary Content Fields
            $table->string('title');
            $table->text('url')->nullable();      // Stored for 'link' and 'video'
            $table->text('content')->nullable();  // Stored for 'formula', 'revision', 'note'
            $table->text('description')->nullable();
            // Scraped / Extracted Metadata & OEmbed Context
            // Stores thumbnail URLs, domain name, channel name, video duration, site favicons, etc.
            $table->json('metadata')->nullable();

            $table->timestamps();

            // Performance Indexes
            $table->index(['resource_id', 'type']);
            $table->index('user_id');
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
