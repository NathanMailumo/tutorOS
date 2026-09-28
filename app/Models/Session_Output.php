<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session_Output extends Model
{
    protected $table = 'session_outputs';

    protected $fillable = [
        'study_session_id',
        'content',
        'model_used',
        'prompt_tokens',
    ];
}
