<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ResourceItem;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Resource extends Model
{
    protected $table = 'resources';

    protected $fillable = [
        'course_name',
        'user_id',
        'resource_type',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the resource items attached to this workspace.
     */
    public function resourceItems(): HasMany
    {
        return $this->hasMany(ResourceItem::class);
    }

    /**
     * Get the collaborators invited to this resource workspace.
     */
    public function collaborators(): BelongsToMany
{
    // Explicitly set table name to 'resource_users'
    return $this->belongsToMany(User::class, 'resource_users')
        ->withPivot(['role', 'status'])
        ->withTimestamps();
}
}
