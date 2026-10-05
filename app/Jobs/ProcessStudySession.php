<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\Models\Study_Session;
use App\Models\Session_Output;
use App\Services\OpenRouterService;


class ProcessStudySession implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels, Dispatchable;

    public function __construct(
        public Study_Session $session,
        public string $contentToProcess
    ) {}

    /**
     * Execute the job.
     */
    public function handle(OpenRouterService $aiService): void
    {
        $aiResult = $aiService->generateStudyNotes(
            $this->session->focus_prompt,
            $this->contentToProcess
        );

        Session_Output::create([
            'study_session_id' => $this->session->id,
            'content'          => $aiResult['content'] ?? 'Failed to generate study materials.',
            'model_used'       => $aiResult['model_used'] ?? config('services.openrouter.model'),
            'prompt_tokens'    => $aiResult['prompt_tokens'] ?? 0,
        ]);
    }
}
