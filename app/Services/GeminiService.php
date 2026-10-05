<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected string $apiKey;
    protected string $model;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey  = config('services.gemini.api_key');
        $this->model   = config('services.gemini.model');
        $this->baseUrl = config('services.gemini.base_url');
    }

    public function generateStudyNotes(string $focusPrompt, string $content): ?array
    {
        $systemPrompt = "You are TutorOS, an elite AI study assistant. "
            . "Format your output in clean Markdown using headings, key takeaways, summary notes, bullet points, and quick review questions. "
            . "Keep the tone concise, engaging, and structured.";

        $fullPrompt = "{$systemPrompt}\n\nFOCUS AREA / USER INSTRUCTION:\n{$focusPrompt}\n\nSTUDY MATERIAL / CONTENT:\n{$content}";

        try {
            // Gemini API uses query parameter authentication for the key
            $endpoint = "{$this->baseUrl}/models/{$this->model}:generateContent?key={$this->apiKey}";

            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])
            ->connectTimeout(15) // Wait up to 15s to establish connection
            ->timeout(60)       // Allow up to 120s for full response generation
            ->post($endpoint, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $fullPrompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.4,
                    'maxOutputTokens' => 2048,
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $responseText = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
                $tokenCount   = $data['usageMetadata']['totalTokenCount'] ?? 0;

                return [
                    'content'       => $responseText,
                    'model_used'    => $this->model,
                    'prompt_tokens' => $tokenCount,
                ];
            }

            Log::error("Gemini API Error Response: " . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error("Gemini API Exception: " . $e->getMessage());
            return null;
        }
    }
}
