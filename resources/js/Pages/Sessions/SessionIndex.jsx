import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function SessionIndex({ sessions = [] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Sessions" />

            <div className="space-y-8 p-6 lg:p-10">
                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-[#121212] md:text-5xl">
                        Sessions
                    </h1>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                        Create and manage your teaching sessions.
                    </p>
                </div>

                {/* CREATE SESSION HERO BANNER */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-black bg-[#FF6B35] p-8 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-10">
                    <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div className="space-y-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-white/20 text-2xl font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                +
                            </div>
                            <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                                Create New Session
                            </h2>
                            <p className="text-sm font-medium text-white/90">
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
                            className="inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-white px-6 py-3.5 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
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
                        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-black bg-white p-12 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#FF6B35] text-sm font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                0
                            </div>
                            <h4 className="mt-4 text-lg font-black text-[#121212]">
                                No sessions generated yet
                            </h4>
                            <p className="mt-1 max-w-sm text-xs font-medium text-gray-500">
                                You haven't created any teaching sessions.
                                Generate your first AI session above to get
                                started.
                            </p>
                        </div>
                    ) : (
                        /* SESSIONS GRID */
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {sessions.map((session) => (
                                <Link
                                    key={session.id}
                                    href={
                                        route().has('sessions.show')
                                            ? route('sessions.show', session.id)
                                            : '#'
                                    }
                                    className="group flex flex-col justify-between rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
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
                                        <h4 className="text-lg font-black leading-snug text-[#121212] group-hover:underline">
                                            {session.title}
                                        </h4>
                                    </div>

                                    {/* METADATA FOOTER */}
                                    <div className="mt-6 flex items-center gap-4 text-xs font-bold text-gray-500">
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
