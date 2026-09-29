<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function session_files(): HasMany 
    {
        return $this->hasMany(Session_File::class);
    }
}
