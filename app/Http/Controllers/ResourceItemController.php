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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'resource_id' => 'required|exists:resources,id',
            'type'        => 'required|string',
            'title'       => 'required|string|max:255',
            'url'         => 'nullable|string',
            'content'     => 'nullable|string',
            'description' => 'nullable|string',
            'metadata'    => 'nullable|array',
        ]);

        $metadata = $request->input('metadata', []);

        if (!empty($validated['url'])) {
            $host = parse_url($validated['url'], PHP_URL_HOST) ?? '';
            $metadata['domain'] = $host;

            $isYouTube = str_contains($host, 'youtube.com') || str_contains($host, 'youtu.be');

            if ($validated['type'] === 'video' && $isYouTube) {
                try {
                    // Query YouTube oEmbed endpoint (free, no API key needed)
                    $response = Http::withoutVerifying()->get('https://www.youtube.com/oembed', [
                        'url'    => $validated['url'],
                        'format' => 'json',
                    ]);

                    if ($response->successful()) {
                        $oembed = $response->json();

                        // OVERWRITE DUMMY TITLE & DESCRIPTION WITH REAL OEMBED METADATA
                        if (!empty($oembed['title'])) {
                            $validated['title'] = html_entity_decode($oembed['title']);
                        }

                        if (!empty($oembed['author_name'])) {
                            $validated['description'] = 'Channel: ' . $oembed['author_name'];
                            $metadata['author_name']  = $oembed['author_name'];
                        }

                        $metadata['thumbnail_url'] = $oembed['thumbnail_url'] ?? '';
                        $metadata['provider_name']  = $oembed['provider_name'] ?? 'YouTube';
                    }
                } catch (\Exception $e) {
                    // Gracefully fallback to submitted title/description if oEmbed fails
                }
            }
        }

        $validated['metadata'] = $metadata;
        $validated['user_id']  = $request->user()->id;

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
            'items'    => $resource->resourceItems,
        ]);
    }
}
