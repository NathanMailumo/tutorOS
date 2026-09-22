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
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'privateResources' => fn() => $request->user()
                ? Resource::where('user_id', $request->user()->id)
                ->where('resource_type', 'private')
                ->latest()
                ->get()
                : [],
            'publicResources' => fn() => $request->user()
                ? Resource::where('user_id', $request->user()->id)
                ->where('resource_type', 'public')
                ->latest()
                ->get()
                : [],
            'resources' => fn() => $request->user()
                ? Resource::where('user_id', $request->user()->id)->get()
                : [],
        ];
    }
}
