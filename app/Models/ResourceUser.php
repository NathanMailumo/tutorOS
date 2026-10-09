<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ResourceUser extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'resource_users';

    protected $fillable = [
        'clerk_id',
        'resource_id',
        'role',
        'status',
    ];
}
