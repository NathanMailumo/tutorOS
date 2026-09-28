<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenRouterService{
    protected string $apiKey;
    protected string $model;

    public function __construct()
    {
        $this->apiKey = config('services.openrouter.api_key');
        $this->model = config('services.openrouter.model');
    }

    public function generateStudyNotes(string $focusPrompt, string $content): ?array
    {
        $systemPrompt = "You are TutorOS, an elite AI study assistant. "
            . "Format your output in clean Markdown using headings, key takeaways, summary notes, bullet points, and quick review questions. "
            . "Keep the tone concise, engaging, and structured.";

        $userPrompt = "FOCUS AREA / USER INSTRUCTION:\n{$focusPrompt}\n\n"
            . "STUDY MATERIAL / CONTENT:\n{$content}";

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'HTTP-Referer'  => config('app.url'),
                'X-Title'       => 'TutorOS',
                'Content-Type'  => 'application/json',
            ])->timeout(60)->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => $this->model,
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $userPrompt],
                ],
            ]);

            if ($response->successful()) {
                return [
                    'content'       => $response->json('choices.0.message.content'),
                    'model_used'    => $response->json('model') ?? $this->model,
                    'prompt_tokens' => $response->json('usage.prompt_tokens') ?? 0,
                ];
            }

            Log::error("OpenRouter Error Response: " . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error("OpenRouter API Exception: " . $e->getMessage());
            return null;
        }
    }
}