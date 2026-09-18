import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const user = usePage().props.auth.user;

    // Get dynamic date greeting (e.g., WEDNESDAY · SEP 17)
    const currentDate = new Date()
        .toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        })
        .toUpperCase()
        .replace(',', ' ·');

    // Dynamic time-of-day greeting
    const currentHour = new Date().getHours();
    const timeGreeting =
        currentHour < 12
            ? 'Good morning'
            : currentHour < 18
              ? 'Good afternoon'
              : 'Good evening';

    // Fallback default stats if not passed from controller
    const statsData = stats || {
        sessionsThisWeek: 0,
        quizzesGenerated: 0,
        streakDays: 0,
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Dashboard" />

            <div className="space-y-8 p-6 lg:p-10">
                {/* DATE & GREETING */}
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                        {currentDate}
                    </p>
                    <h1 className="mt-2 text-4xl font-black tracking-tight text-[#121212] md:text-5xl">
                        {timeGreeting},{' '}
                        {user?.name ? user.name.split(' ')[0] : 'User'}
                    </h1>
                </div>

                {/* AI HERO BANNER */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-black bg-[#FF6B35] p-8 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-10">
                    <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div className="max-w-xl space-y-2">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/90">
                                <span>AI-Powered</span>
                            </div>
                            <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                                Generate New Teaching Session
                            </h2>
                            <p className="text-sm font-medium text-white/90">
                                Enter your course and topic — get complete
                                cards, examples, and quiz questions.
                            </p>
                        </div>
                        <button
                            type="button"
                            disabled
                            className="inline-flex cursor-not-allowed items-center gap-2 rounded-2xl border-2 border-black bg-white px-6 py-3.5 text-sm font-black text-black opacity-60 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <span>Create</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>

                {/* QUICK ACCESS SECTION */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">
                        Quick Access
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Teaching Sessions */}
                        <button
                            type="button"
                            disabled
                            className="group flex cursor-not-allowed items-center justify-between rounded-2xl border-2 border-black bg-white p-5 text-left opacity-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#FF6B35] text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    TS
                                </div>
                                <span className="text-base font-black text-[#121212]">
                                    Teaching Sessions
                                </span>
                            </div>
                            <span className="text-lg font-black transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>

                        {/* Quiz Generator */}
                        <button
                            type="button"
                            disabled
                            className="group flex cursor-not-allowed items-center justify-between rounded-2xl border-2 border-black bg-white p-5 text-left opacity-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#5352ED] text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    QG
                                </div>
                                <span className="text-base font-black text-[#121212]">
                                    Quiz Generator
                                </span>
                            </div>
                            <span className="text-lg font-black transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>

                        {/* Revision Packs */}
                        <button
                            type="button"
                            disabled
                            className="group flex cursor-not-allowed items-center justify-between rounded-2xl border-2 border-black bg-white p-5 text-left opacity-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#2ED573] text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    RP
                                </div>
                                <span className="text-base font-black text-[#121212]">
                                    Revision Packs
                                </span>
                            </div>
                            <span className="text-lg font-black transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>

                        {/* Shared Sessions */}
                        <button
                            type="button"
                            disabled
                            className="group flex cursor-not-allowed items-center justify-between rounded-2xl border-2 border-black bg-white p-5 text-left opacity-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#FF4757] text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    SS
                                </div>
                                <span className="text-base font-black text-[#121212]">
                                    Shared Sessions
                                </span>
                            </div>
                            <span className="text-lg font-black transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                    </div>
                </div>

                {/* METRICS CARDS */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {/* Card 1 */}
                    <div className="rounded-3xl border-2 border-black bg-[#FF6B35] p-6 text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                        <div className="text-4xl font-black">
                            {statsData.sessionsThisWeek}
                        </div>
                        <div className="mt-2 text-xs font-bold uppercase tracking-wider text-white/90">
                            Sessions · this week
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-3xl border-2 border-black bg-[#5352ED] p-6 text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                        <div className="text-4xl font-black">
                            {statsData.quizzesGenerated}
                        </div>
                        <div className="mt-2 text-xs font-bold uppercase tracking-wider text-white/90">
                            Quizzes · generated
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-3xl border-2 border-black bg-[#2ED573] p-6 text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                        <div className="text-4xl font-black">
                            {statsData.streakDays}
                        </div>
                        <div className="mt-2 text-xs font-bold uppercase tracking-wider text-white/90">
                            Streak · days
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
