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
        Schema::create('session_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('study_session_id')->constrained('study_sessions')->cascadeOnDelete();
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type');
            $table->bigInteger('file_size');
            $table->longText('extracted_text')->nullable();
            // $table->string('reference');
            // $table->string('metadata');
            // $table->enum('extraction_status', ['success', 'fail']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_files');
    }
};
