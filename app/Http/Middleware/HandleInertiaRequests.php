<?php

namespace App\Http\Middleware;

use App\Models\Resource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Define $user once from the $request
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'privateResources' => fn() => $user
                ? Resource::where('user_id', $user->id)
                ->where('resource_type', 'private')
                ->latest()
                ->get()
                : [],
            'publicResources' => fn() => $user
                ? Resource::where('user_id', $user->id)
                ->where('resource_type', 'public')
                ->latest()
                ->get()
                : [],
            'resources' => fn() => $user
                ? Resource::where('user_id', $user->id)
                ->orWhereHas('collaborators', function ($q) use ($user) {
                    $q->where('user_id', $user->id)
                        ->where('status', 'accepted');
                })
                ->latest()
                ->get()
                : [],
        ];
    }
}
