<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResourceUser extends Model
{
    protected $table = 'resource_users';

    protected $fillable = [
        'user_id',
        'resource_id',
        'role',
        'status',
    ];
}
