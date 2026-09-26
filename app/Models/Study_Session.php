<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Study_Session extends Model
{
    protected $table = 'study_sessions';

    protected $fillable = [
        'user_id',
        'input_option',
        'content',
        'generated_output',
    ];
}
