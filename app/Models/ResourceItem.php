<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Resource;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class ResourceItem extends Model
{
    protected $table = 'resource_items';

    protected $fillable = [
        'user_id',
        'resource_id',
        'type',
        'title',
        'url',
        'content',
        'description',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: Belongs to Parent Resource Workspace
     */
    public function resource(): BelongsTo
    {
        return $this->belongsTo(Resource::class);
    }
}
