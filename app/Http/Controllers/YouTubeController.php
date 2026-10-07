<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class YouTubeController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json([]);
        }

        $apiKey = config('services.youtube.api_key', env('YOUTUBE_API_KEY'));

        // Check if API Key is missing in Laravel config
        if (empty($apiKey)) {
            Log::error('YouTube API Key is missing in .env or config/services.php');
            return response()->json([
                'error' => 'API key missing. Check YOUTUBE_API_KEY in .env file.'
            ], 500);
        }

        try {
            // withoutVerifying() prevents local SSL cURL errors on XAMPP/Windows
            $response = Http::withoutVerifying()
                ->get('https://www.googleapis.com/youtube/v3/search', [
                    'key' => $apiKey,
                    'q' => $query,
                    'part' => 'snippet',
                    'type' => 'video',
                    'maxResults' => 10,
                ]);

            if ($response->failed()) {
                Log::error('YouTube API Request Failed', [
                    'status' => $response->status(),
                    'body' => $response->json(),
                ]);

                return response()->json([
                    'error' => $response->json()['error']['message'] ?? 'Failed to fetch videos from YouTube'
                ], $response->status());
            }

            $items = collect($response->json()['items'] ?? [])->map(function ($item) {
                return [
                    'id' => $item['id']['videoId'],
                    'title' => html_entity_decode($item['snippet']['title']),
                    'uploader' => $item['snippet']['channelTitle'],
                    'thumbnail' => $item['snippet']['thumbnails']['medium']['url'],
                    'url' => 'https://www.youtube.com/watch?v=' . $item['id']['videoId'],
                ];
            });

            return response()->json($items);

        } catch (\Exception $e) {
            Log::error('YouTube Controller Exception: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}