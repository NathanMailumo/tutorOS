<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\ResourceItem;
use App\Models\Resource;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;

class ResourceItemController extends Controller
{
    public function fetchMetadata(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
            'type' => 'required|string|in:link,video',
        ]);

        $url = $request->input('url');
        $type = $request->input('type');

        if ($type === 'video') {
            // YouTube oEmbed API (Free, no API key required)
            $response = Http::get("https://www.youtube.com/oembed", [
                'url' => $url,
                'format' => 'json'
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return response()->json([
                    'title' => $data['title'] ?? '',
                    'metadata' => [
                        'author_name' => $data['author_name'] ?? '',
                        'thumbnail_url' => $data['thumbnail_url'] ?? '',
                        'provider_name' => $data['provider_name'] ?? 'YouTube',
                    ]
                ]);
            }
        }

        // Generic Web Link metadata parser (Fallback)
        return response()->json([
            'title' => parse_url($url, PHP_URL_HOST),
            'metadata' => [
                'domain' => parse_url($url, PHP_URL_HOST),
                'favicon' => 'https://www.google.com/s2/favicons?domain=' . parse_url($url, PHP_URL_HOST),
            ]
        ]);
    }

    /**
     * Store resource item
     */
   public function store(Request $request)
    {
        $validated = $request->validate([
            'resource_id' => 'required|exists:resources,id',
            'type'        => 'required|string',
            'title'       => 'required|string|max:255',
            'url'         => 'nullable|url',
            'content'     => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $metadata = [];

        if (!empty($validated['url'])) {
            $host = parse_url($validated['url'], PHP_URL_HOST);
            $metadata['domain'] = $host;

            if ($validated['type'] === 'video' && str_contains($host, 'youtube.com')) {
                try {
                    $response = Http::get("https://www.youtube.com/oembed", [
                        'url' => $validated['url'],
                        'format' => 'json'
                    ]);
                    if ($response->successful()) {
                        $oembed = $response->json();
                        $metadata['author_name'] = $oembed['author_name'] ?? '';
                        $metadata['thumbnail_url'] = $oembed['thumbnail_url'] ?? '';
                    }
                } catch (\Exception $e) {
                    // Fallback gracefully if request fails
                }
            }
        }

        $validated['metadata'] = $metadata;
        $validated['user_id'] = $request->user()->id;

        // Save through Resource model to guarantee resource_id linkage
        ResourceItem::create($validated);

        return redirect()->back();
    }

    public function show(Resource $resource): Response
    {
        // Load items related to this specific resource
        $resource->load(['items' => function ($query) {
            $query->latest();
        }]);

        return Inertia::render('Resources/PrivateResource', [
            'resource' => $resource,
            'items'    => $resource->items,
        ]);
    }
}
