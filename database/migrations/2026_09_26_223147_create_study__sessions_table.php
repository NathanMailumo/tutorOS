<?php

// use App\Models\ResourceItem;
// use Illuminate\Database\Eloquent\Relations\HasMany;
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
        Schema::create('study_sessions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('clerk_id');
            $table->foreign('clerk_id')->references('clerk_id')->on('users')->cascadeOnDelete();
            $table->string('course_title');
            $table->string('course_code')->nullable();
            $table->enum('input_option', ['text', 'file']);
            // $table->string('file')->nullable();
            $table->string('focus_prompt');
            $table->longText('raw_notes')->nullable();
            $table->foreignUuid('resource_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('study_sessions');
    }

    
};
