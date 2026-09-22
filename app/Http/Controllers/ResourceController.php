<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Resource;

class ResourceController extends Controller
{
    public function resourceIndex(Request $request)
    {
        $latest = Resource::where('user_id', $request->user()->id)->latest()->first();

        if ($latest) {
            return redirect()->route('resources.show', $latest->id);
        }

        return redirect()->route('dashboard');
    }

    public function createResource(Request $request)
    {
        $validated = $request->validate([
            'course_name' => 'required|string|max:255',
            'resource_type' => 'required|in:private,public',
        ]);

        $validated['user_id'] = $request->user()->id;

        $resource = Resource::create($validated);

        if ($resource->resource_type === 'private') {
            return redirect()->route('resources.private', $resource->id);
        }

        return redirect()->route('resources.public', $resource->id);
    }

    public function destroy(Request $request, Resource $resource)
    {
        abort_unless($resource->user_id === $request->user()->id, 403);

        $resource->delete();

        return redirect()->route('dashboard');
    }

   public function privateResource(Request $request, Resource $resource)
    {
        if ($resource->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized access to this private resource.');
        }

        // Load items for this specific resource ordered by latest
        $resource->load(['resourceItems' => function ($query) {
            $query->latest();
        }]);

        return Inertia::render('Resources/PrivateResource', [
            'resource' => $resource,
            'items'    => $resource->resourceItems,
        ]);
    }

    public function publicResource(Request $request, Resource $resource)
    {
        $resource->load(['resourceItems' => function ($query) {
            $query->latest();
        }]);

        return Inertia::render('Resources/PublicResource', [
            'resource' => $resource,
            'items'    => $resource->resourceItems,
        ]);
    }

    public function showResource(Resource $resource)
    {
        if ($resource->resource_type === 'private') {
            return redirect()->route('resources.private', $resource->id);
        }

        return redirect()->route('resources.public', $resource->id);
    }
}
