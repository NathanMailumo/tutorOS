<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenRouterService
{
    protected string $apiKey;
    protected string $model;

    public function __construct()
    {
        $this->apiKey = config('services.openrouter.api_key');
        $this->model  = config('services.openrouter.model');
    }

    public function generateStudyNotes(string $focusPrompt, string $content): ?array
    {
        // Explicitly enforce double line-breaks, spacing, and structured layouts
        $systemPrompt = <<<EOT
You are TutorOS, an elite AI study assistant.

FORMATTING RULES:
1. Always insert two full line breaks (\n\n) between every heading, paragraph, bullet list, and mathematical block to ensure clean vertical spacing.
2. Structure concepts into distinct segments:
   - Use Markdown headings (## Topic, ### Subtopic) for major transitions.
   - Keep paragraphs short (maximum 2-3 sentences per paragraph).
   - Never collapse ideas into wall-of-text blocks.
3. For lists and takeaways, use bullet points (-) with a space, and place each item on a new line.
4. Format mathematical equations using standard LaTeX ($...$ for inline math, $$...$$ on its own line for block math).
EOT;

        $userPrompt = "FOCUS AREA / USER INSTRUCTION:\n{$focusPrompt}\n\nSTUDY MATERIAL / CONTENT:\n{$content}";

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
                'Content-Type'  => 'application/json',
                'HTTP-Referer'  => config('app.url', 'http://localhost'),
                'X-Title'       => 'TutorOS App',
            ])
                ->connectTimeout(15)
                ->timeout(120)
                ->post('https://openrouter.ai/api/v1/chat/completions', [
                    'model' => $this->model,
                    'messages' => [
                        [
                            'role'    => 'system',
                            'content' => $systemPrompt,
                        ],
                        [
                            'role'    => 'user',
                            'content' => $userPrompt,
                        ],
                    ],
                    'temperature' => 0.3,
                    'max_tokens'  => 2048,
                ]);

            if ($response->successful()) {
                $data = $response->json();
                $responseText = $data['choices'][0]['message']['content'] ?? null;
                $tokenCount   = $data['usage']['total_tokens'] ?? 0;

                if (!empty($responseText)) {
                    return [
                        'content'       => $responseText,
                        'model_used'    => $data['model'] ?? $this->model,
                        'prompt_tokens' => $tokenCount,
                    ];
                }
            }

            Log::error("OpenRouter API Error Response: " . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error("OpenRouter API Exception: " . $e->getMessage());
            return null;
        }
    }
}
