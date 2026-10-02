<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Session_File extends Model
{
    protected $table = 'session_files';

    protected $fillable = [
        'study_session_id',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'extracted_text',
    ];

    /**
     * Get the study session that owns this file.
     */
    public function studySession(): BelongsTo
    {
        return $this->belongsTo(Study_Session::class, 'study_session_id');
    }

    /**
     * Snake-case alias for studySession.
     */
    public function study_session(): BelongsTo
    {
        return $this->studySession();
    }
}
