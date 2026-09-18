import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function QuizIndex({ quizzes = [] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Quiz Generator" />

            <div className="space-y-8 p-6 lg:p-10">
                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-[#121212] md:text-5xl">
                        Quiz Generator
                    </h1>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                        Test knowledge with custom or session-linked quizzes.
                    </p>
                </div>

                {/* HERO SECTION & QUICK METRICS */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* CREATE BANNER */}
                    <div className="relative overflow-hidden rounded-3xl border-2 border-black bg-[#FF6B35] p-8 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:col-span-2">
                        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                            <div className="space-y-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white/20 text-xl font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    ?
                                </div>
                                <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                                    Generate New Quiz
                                </h2>
                                <p className="text-xs font-medium text-white/90">
                                    Build practice questions on any course or
                                    topic in seconds.
                                </p>
                            </div>
                            <Link
                                href={
                                    route().has('quizzes.create')
                                        ? route('quizzes.create')
                                        : '#'
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-white px-6 py-3.5 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                            >
                                <span>Create Quiz</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>

                    {/* TOTAL COUNTER STAT CARD */}
                    <div className="flex flex-col justify-between rounded-3xl border-2 border-black bg-white p-8 text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-xs font-black uppercase tracking-widest opacity-80">
                            Total Quizzes
                        </span>
                        <div className="my-2 text-5xl font-black tracking-tight">
                            {quizzes.length}
                        </div>
                        <p className="text-xs font-bold text-black/70">
                            Available for practice and review
                        </p>
                    </div>
                </div>

                {/* QUIZZES SECTION */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">
                        Generated Quizzes
                    </h3>

                    {quizzes.length === 0 ? (
                        /* EMPTY STATE */
                        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-black bg-white p-12 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#FF6B35] text-sm font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                !
                            </div>
                            <h4 className="mt-4 text-lg font-black text-[#121212]">
                                No quizzes generated yet
                            </h4>
                            <p className="mt-1 max-w-sm text-xs font-medium text-gray-500">
                                You haven't created any custom or session-linked
                                quizzes. Click the generate button above to get
                                started.
                            </p>
                        </div>
                    ) : (
                        /* QUIZZES GRID */
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {quizzes.map((quiz) => (
                                <Link
                                    key={quiz.id}
                                    href={
                                        route().has('quizzes.show')
                                            ? route('quizzes.show', quiz.id)
                                            : '#'
                                    }
                                    className="group flex flex-col justify-between rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                >
                                    <div className="space-y-4">
                                        {/* BADGES */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            {quiz.course_code && (
                                                <span className="rounded-lg border-2 border-black bg-[#00A8FF] px-2.5 py-1 text-[11px] font-black uppercase text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                    {quiz.course_code}
                                                </span>
                                            )}

                                            {quiz.session_id ? (
                                                <span className="rounded-lg border-2 border-black bg-[#FF6B35] px-2.5 py-1 text-[11px] font-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                    Session Quiz
                                                </span>
                                            ) : (
                                                <span className="rounded-lg border-2 border-black bg-[#8A2BE2] px-2.5 py-1 text-[11px] font-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                    Standalone
                                                </span>
                                            )}
                                        </div>

                                        {/* TITLE */}
                                        <h4 className="text-lg font-black leading-snug text-[#121212] group-hover:underline">
                                            {quiz.title}
                                        </h4>
                                    </div>

                                    {/* METADATA FOOTER */}
                                    <div className="mt-6 flex items-center justify-between border-t-2 border-gray-100 pt-4 text-xs font-bold text-gray-500">
                                        {quiz.questions_count !== undefined && (
                                            <span>
                                                {quiz.questions_count} Questions
                                            </span>
                                        )}

                                        {quiz.formatted_date && (
                                            <span>{quiz.formatted_date}</span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
