<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ResourceItem;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Resource extends Model
{
    protected $table = 'resources';

    protected $fillable = [
        'course_name',
        'user_id',
        'resource_type',
    ];

    public function resourceItems() : HasMany
    {
        return $this->hasMany(ResourceItem::class);
    }
}
