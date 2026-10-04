import React, { useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SessionShow({ session }) {
    // Check if the related output exists
    const hasOutput = Boolean(session?.session_output);

    useEffect(() => {
        // If output is already loaded, do nothing
        if (hasOutput) return;

        // Poll every 3 seconds until session_output appears in DB
        const interval = setInterval(() => {
            router.reload({
                only: ['session'],
                preserveScroll: true,
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [hasOutput]);

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-[#F4F0EA] p-6 font-mono text-black md:p-12">
                <Head title={`TutorOS - ${session.course_title}`} />

                <div className="mx-auto max-w-5xl space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div>
                            <span className="border-2 border-black bg-yellow-300 px-2 py-1 text-xs font-bold uppercase tracking-widest">
                                {session.course_code || 'STUDY SESSION'}
                            </span>
                            <h1 className="mt-2 text-3xl font-extrabold uppercase">
                                {session.course_title}
                            </h1>
                        </div>
                        <Link
                            href="/dashboard"
                            className="border-4 border-black bg-[#FF5050] px-6 py-3 font-extrabold uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="border-4 border-black bg-[#50E3C2] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="block text-xs font-black uppercase text-gray-700">
                                Focus Prompt
                            </span>
                            <p className="mt-1 text-sm font-extrabold">
                                {session.focus_prompt}
                            </p>
                        </div>
                        <div className="border-4 border-black bg-[#D8B4FE] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="block text-xs font-black uppercase text-gray-700">
                                Model Engine
                            </span>
                            <p className="mt-1 text-sm font-extrabold">
                                {session.session_output?.model_used || 'N/A'}
                            </p>
                        </div>
                        <div className="border-4 border-black bg-[#6EE7B7] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="block text-xs font-black uppercase text-gray-700">
                                Tokens Used
                            </span>
                            <p className="mt-1 text-sm font-extrabold">
                                {session.session_output?.prompt_tokens ?? 0}{' '}
                                tokens
                            </p>
                        </div>
                    </div>

                    {/* Output Area */}
                    <div className="border-4 border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        <div className="mb-6 flex items-center justify-between border-b-4 border-black pb-4">
                            <h2 className="text-2xl font-black uppercase">
                                Generated Study Output
                            </h2>
                            {hasOutput && (
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            session.session_output.content,
                                        )
                                    }
                                    className="border-2 border-black bg-yellow-300 px-4 py-1 text-sm font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-1 hover:translate-y-1"
                                >
                                    Copy Output
                                </button>
                            )}
                        </div>

                        {!hasOutput ? (
                            <div className="space-y-4 py-12 text-center">
                                <div className="inline-block animate-bounce text-4xl">
                                    ⚡
                                </div>
                                <p className="text-lg font-extrabold uppercase">
                                    loading ...
                                </p>
                                <p className="text-xs font-bold text-gray-500">
                                    compiling revision pack
                                </p>
                            </div>
                        ) : (
                            <div className="prose max-w-none font-bold">
                                <ReactMarkdown>
                                    {session.session_output.content}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
