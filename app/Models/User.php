<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Resource;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'clerk_id',
        'name',
        'email',
        'profile_image_url',
        // 'profile_image_public_id',
    ];


    public function resourceItems(): HasMany
    {
        return $this->hasMany(ResourceItem::class);
    }

    public function sharedResources(): BelongsToMany
    {
        return $this->belongsToMany(Resource::class, 'resource_users')
            ->withPivot('status')
            ->withTimestamps();
    }

}
