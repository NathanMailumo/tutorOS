<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Session_File;
use App\Models\Session_Output;

class Study_Session extends Model
{
    protected $table = 'study_sessions';

    protected $fillable = [
        'user_id',
        'course_title',
        'course_code',
        'input_option',
        'focus_prompt',
        // 'file',
        'raw_notes',
    ];

    public function sessionFile(): HasOne
    {
        return $this->hasOne(Session_File::class, 'study_session_id');
    }

    // public function session_file(): HasOne
    // {
    //     return $this->sessionFile();
    // }

    /**
     * Define the relationship to SessionOutput
     */
    public function sessionOutput(): HasOne
    {
        return $this->hasOne(Session_Output::class, 'study_session_id');
    }

    // public function session_output(): HasOne
    // {
    //     return $this->sessionOutput();
    // }
}
