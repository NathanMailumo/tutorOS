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
        Schema::create('session_outputs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('study_session_id')->constrained()->cascadeOnDelete();
            $table->longText('content');
            $table->string('model_used');
            $table->string('prompt_tokens')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_outputs');
    }
};
