import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SessionShow({ session }) {
    const output =
        session?.session_output?.content || 'No generated content found.';
    const modelUsed = session?.session_output?.model_used || 'N/A';
    const tokens = session?.session_output?.prompt_tokens || 0;

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-[#F4F0EA] p-6 font-mono text-black md:p-12">
                <Head title={`TutorOS - ${session.course_title}`} />

                <div className="mx-auto max-w-5xl space-y-8">
                    {/* Top Navigation / Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div>
                            <span className="border-2 border-black bg-yellow-300 px-2 py-1 text-xs font-bold uppercase tracking-widest">
                                {session.course_code || 'STUDY SESSION'}
                            </span>
                            <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                                {session.course_title}
                            </h1>
                        </div>
                        <Link
                            href="/dashboard"
                            className="border-4 border-black bg-[#FF5050] px-6 py-3 font-extrabold uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>

                    {/* Session Details Bar */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="border-4 border-black bg-cyan-300 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-xs font-bold uppercase text-black/70">
                                Focus Prompt
                            </p>
                            <p className="mt-1 text-sm font-bold">
                                {session.focus_prompt}
                            </p>
                        </div>
                        <div className="border-4 border-black bg-purple-300 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-xs font-bold uppercase text-black/70">
                                Model Engine
                            </p>
                            <p className="mt-1 break-all text-sm font-bold">
                                {modelUsed}
                            </p>
                        </div>
                        <div className="border-4 border-black bg-green-300 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-xs font-bold uppercase text-black/70">
                                Tokens Used
                            </p>
                            <p className="mt-1 text-sm font-bold">
                                {tokens} tokens
                            </p>
                        </div>
                    </div>

                    {/* Main AI Output Section */}
                    <div className="border-4 border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        <div className="mb-6 flex items-center justify-between border-b-4 border-black pb-4">
                            <h2 className="text-2xl font-black uppercase">
                                Generated Study Output
                            </h2>
                            <button
                                onClick={() =>
                                    navigator.clipboard.writeText(content)
                                }
                                className="border-2 border-black bg-yellow-300 px-4 py-1 text-sm font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            >
                                Copy Output
                            </button>
                        </div>

                        <div className="prose prose-headings:font-black prose-headings:uppercase prose-h1:text-2xl prose-h2:text-xl prose-p:text-base prose-li:font-bold max-w-none">
                            <ReactMarkdown>{output}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
