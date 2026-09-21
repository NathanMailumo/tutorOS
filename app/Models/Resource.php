<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    protected $table = 'resources';

    protected $fillable = [
        'course_name',
        'user_id',
        // 'resource_name',
        'resource_type',
    ];
}
