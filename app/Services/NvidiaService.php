<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NvidiaLlamaService
{
    protected string $apiKey;
    protected string $model;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey  = config('services.nvidia.api_key');
        $this->model   = config('services.nvidia.model');
        $this->baseUrl = config('services.nvidia.base_url');
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
                'Accept'        => 'application/json',
                'Content-Type'  => 'application/json',
            ])->timeout(60)->post("{$this->baseUrl}/chat/completions", [
                'model'       => $this->model,
                'messages'    => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $userPrompt],
                ],
                'temperature' => 0.5,
                'max_tokens'  => 2048,
            ]);

            if ($response->successful()) {
                return [
                    'content'       => $response->json('choices.0.message.content'),
                    'model_used'    => $response->json('model') ?? $this->model,
                    'prompt_tokens' => $response->json('usage.prompt_tokens') ?? 0,
                ];
            }

            Log::error("NVIDIA API Error Response: " . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error("NVIDIA API Exception: " . $e->getMessage());
            return null;
        }
    }
}