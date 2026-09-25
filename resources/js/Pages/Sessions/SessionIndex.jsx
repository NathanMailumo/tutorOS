import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function SessionIndex({ sessions = [] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Sessions" />

            {/* Constrain page container max-width and enable full horizontal containment */}
            <div className="w-full max-w-7xl space-y-6 overflow-x-hidden px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8 lg:px-8">
                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-[#121212] sm:text-4xl md:text-5xl">
                        Sessions
                    </h1>
                    <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                        Create and manage your teaching sessions.
                    </p>
                </div>

                {/* CREATE SESSION HERO BANNER */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-black bg-[#FF6B35] p-5 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:rounded-3xl sm:p-8 sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-10">
                    <div className="relative z-10 flex flex-col items-start justify-between gap-5 sm:gap-6 md:flex-row md:items-center">
                        <div className="max-w-2xl space-y-2.5 sm:space-y-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white/20 text-xl font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl">
                                +
                            </div>
                            <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl md:text-3xl">
                                Create New Session
                            </h2>
                            <p className="text-xs font-medium text-white/90 sm:text-sm">
                                Enter your course and topic — get complete
                                cards, examples, and quiz questions.
                            </p>
                        </div>
                        <Link
                            href={
                                route().has('sessions.create')
                                    ? route('sessions.create')
                                    : '#'
                            }
                            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl border-2 border-black bg-white px-6 py-3.5 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] sm:w-auto"
                        >
                            <span>Create</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>

                {/* SESSIONS SECTION */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">
                        Your Sessions
                    </h3>

                    {sessions.length === 0 ? (
                        /* EMPTY STATE */
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-black bg-white p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:rounded-3xl sm:p-12">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#FF6B35] text-sm font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                0
                            </div>
                            <h4 className="mt-4 text-base font-black text-[#121212] sm:text-lg">
                                No sessions generated yet
                            </h4>
                            <p className="mt-1 max-w-sm text-xs font-medium text-gray-500 sm:text-sm">
                                You haven't created any teaching sessions.
                                Generate your first AI session above to get
                                started.
                            </p>
                        </div>
                    ) : (
                        /* SESSIONS GRID */
                        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {sessions.map((session) => (
                                <Link
                                    key={session.id}
                                    href={
                                        route().has('sessions.show')
                                            ? route('sessions.show', session.id)
                                            : '#'
                                    }
                                    className="group flex flex-col justify-between rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none sm:p-6"
                                >
                                    <div className="space-y-4">
                                        {/* BADGES */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            {session.course_code && (
                                                <span className="rounded-lg border-2 border-black bg-[#00A8FF] px-2.5 py-1 text-[11px] font-black uppercase text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                    {session.course_code}
                                                </span>
                                            )}
                                            {session.type && (
                                                <span className="rounded-lg border-2 border-black bg-[#FF6B35] px-2.5 py-1 text-[11px] font-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                    {session.type}
                                                </span>
                                            )}
                                        </div>

                                        {/* TITLE */}
                                        <h4 className="text-base font-black leading-snug text-[#121212] group-hover:underline sm:text-lg">
                                            {session.title}
                                        </h4>
                                    </div>

                                    {/* METADATA FOOTER */}
                                    <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold text-gray-500 sm:gap-4">
                                        {session.card_count !== undefined && (
                                            <span>
                                                {session.card_count} cards
                                            </span>
                                        )}
                                        {session.has_quiz && <span>Quiz</span>}
                                        {session.formatted_date && (
                                            <span>
                                                {session.formatted_date}
                                            </span>
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
