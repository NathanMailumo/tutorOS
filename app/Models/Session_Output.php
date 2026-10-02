<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Session_Output extends Model
{
    protected $table = 'session_outputs';

    protected $fillable = [
        'study_session_id',
        'content',
        'model_used',
        'prompt_tokens',
    ];

    /**
     * Get the study session that owns this output.
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
