import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* FULL SCREEN CANVAS WORKSPACE */}
            <div
                className="relative flex min-h-[calc(100vh-65px)] w-full flex-col justify-between overflow-y-auto p-6 lg:p-12"
                style={{
                    backgroundImage:
                        'radial-gradient(#d1d5db 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px',
                }}
            >
                {/* DASHBOARD HEADER */}
                <div className="z-10 max-w-2xl space-y-2 pb-2 pt-4">
                    <h1 className="flex items-center gap-2 text-3xl font-black tracking-tight text-[#121212] md:text-4xl">
                        Welcome to TutorOS{' '}
                        <span className="inline-block animate-bounce">👋</span>
                    </h1>
                    <p className="text-xs font-bold leading-relaxed text-gray-600">
                        Organize your study workflows. Collect videos, notes,
                        web links, formula cheat sheets, and AI-generated
                        revision packs all in one visual workspace.
                    </p>
                </div>

                {/* BALANCED SPACED-OUT CANVAS */}
                <div className="relative my-4 min-h-[620px] w-full flex-1">
                    {/* --- COLUMN 1 (LEFT) --- */}

                    {/* 1. YOUTUBE CARD FEATURE (TOP LEFT) */}
                    <div className="absolute left-[3%] top-2 w-[220px] -rotate-3 transition-all hover:z-30 hover:rotate-0 hover:scale-105">
                        <div className="flex min-h-[220px] flex-col justify-between rounded-2xl border-2 border-black bg-white p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div>
                                <div className="relative flex h-24 w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-black bg-slate-900 p-2 text-center">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black bg-red-600 text-xs font-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                        ▶
                                    </div>
                                    <span className="mt-2 text-[10px] font-black uppercase tracking-wider text-white">
                                        YouTube Link
                                    </span>
                                </div>
                                <h3 className="mt-2.5 text-xs font-black text-[#121212]">
                                    YouTube Videos
                                </h3>
                                <p className="mt-1 text-[10px] font-medium leading-snug text-gray-600">
                                    Embed YouTube video links directly into your
                                    workspace for quick reference and lecture
                                    viewing.
                                </p>
                            </div>
                            <div className="mt-3 w-fit rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[9px] font-bold text-red-600">
                                youtube.com
                            </div>
                        </div>
                    </div>

                    {/* 4. REVISION PACKS FEATURE (BOTTOM LEFT) */}
                    <div className="absolute left-[3%] top-[280px] w-[220px] rotate-2 transition-all hover:z-30 hover:rotate-0 hover:scale-105">
                        <div className="flex min-h-[220px] flex-col justify-between rounded-2xl border-2 border-black bg-[#8A2BE2] p-4 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="rounded-md border border-black bg-white px-1.5 py-0.5 text-[8px] font-black uppercase text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                        TutorOS AI
                                    </span>
                                    <span className="rounded-md border border-black bg-[#2ED573] px-1.5 py-0.5 text-[8px] font-black uppercase text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                        Auto-Pack
                                    </span>
                                </div>
                                <h3 className="mt-3 text-xs font-black leading-tight text-white">
                                    AI Revision Packs
                                </h3>
                                <p className="mt-1.5 text-[10px] font-medium leading-tight text-white/90">
                                    Generated automatically by TutorOS session
                                    feature into flashcards, quizzes, and
                                    summaries.
                                </p>
                            </div>
                            <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2 text-[9px] font-bold">
                                <span>Flashcards & Quiz</span>
                                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[8px]">
                                    Session
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* --- COLUMN 2 (CENTER) --- */}

                    {/* 2. STICKY NOTE FEATURE (TOP CENTER) */}
                    <div className="rotate-4 absolute left-[36%] top-2 w-[210px] transition-all hover:z-30 hover:rotate-0 hover:scale-105">
                        <div className="flex min-h-[220px] flex-col justify-between rounded-2xl border-2 border-black bg-[#FEF08A] p-4 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div>
                                <div className="flex items-center justify-between border-b border-black/10 pb-1.5">
                                    <span className="text-[9px] font-black uppercase text-black/60">
                                        Sticky Note
                                    </span>
                                    <span className="text-[10px]">📌</span>
                                </div>
                                <h3 className="mt-2 text-xs font-black text-black">
                                    Course Quick Notes
                                </h3>
                                <p className="mt-1.5 text-[10px] font-bold leading-tight text-black/80">
                                    Jot down sticky notes for quick reminders,
                                    key concepts, or homework tasks relevant to
                                    your course.
                                </p>
                            </div>
                            <div className="mt-3 text-[9px] font-bold text-black/50">
                                Click to edit note...
                            </div>
                        </div>
                    </div>

                    {/* 5. WEBSITE LINK FEATURE (BOTTOM CENTER - INCREASED VERTICAL GAP) */}
                    <div className="absolute left-[36%] top-[280px] w-[220px] -rotate-3 transition-all hover:z-30 hover:rotate-0 hover:scale-105">
                        <div className="flex min-h-[220px] flex-col justify-between rounded-2xl border-2 border-black bg-white p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div>
                                <div className="flex h-14 w-full items-center justify-between rounded-xl border-2 border-black bg-sky-500 p-2.5 text-white">
                                    <div className="truncate text-xs font-black">
                                        Topic Article
                                    </div>
                                    <div className="text-xs">🌐</div>
                                </div>
                                <h3 className="mt-2.5 text-xs font-black text-[#121212]">
                                    Web Links & Research
                                </h3>
                                <p className="mt-1 text-[10px] font-medium leading-tight text-gray-600">
                                    Save web links on a certain topic to quickly
                                    return to articles, documentation, or online
                                    readings.
                                </p>
                            </div>
                            <div className="mt-3 truncate border-t border-gray-100 pt-1.5 text-[9px] font-bold text-sky-600">
                                https://resource-link.org
                            </div>
                        </div>
                    </div>

                    {/* --- COLUMN 3 (RIGHT) --- */}

                    {/* 3. FORMULA CHEAT SHEET FEATURE (TOP RIGHT - PULLED CLOSER) */}
                    <div className="absolute right-[10%] top-2 w-[220px] -rotate-2 transition-all hover:z-30 hover:rotate-0 hover:scale-105">
                        <div className="flex min-h-[220px] flex-col justify-between rounded-2xl border-2 border-black bg-white p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div>
                                <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                                    <span className="text-[9px] font-black uppercase text-blue-600">
                                        Cheat Sheet
                                    </span>
                                    <span className="rounded border border-black/20 bg-blue-100 px-1.5 py-0.5 text-[9px] font-black text-blue-800">
                                        Math / Sci
                                    </span>
                                </div>
                                <h3 className="mt-2 text-xs font-black text-[#121212]">
                                    Formula Cheat Sheet
                                </h3>
                                <p className="mb-2 mt-1 text-[10px] font-medium text-gray-500">
                                    Store essential formulas in one place:
                                </p>
                                <div className="space-y-1 rounded-lg border border-black/10 bg-gray-50 p-2 font-mono text-[10px] font-bold text-gray-700">
                                    <div>• E = mc²</div>
                                    <div>• A = πr²</div>
                                    <div>• a² + b² = c²</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. CREATE NEW RESOURCE CARD (BOTTOM RIGHT - PULLED CLOSER) */}
                    <div className="absolute right-[10%] top-[280px] w-[210px] rotate-3 transition-all hover:z-30 hover:rotate-0 hover:scale-105">
                        <div className="flex min-h-[220px] flex-col items-center justify-between rounded-2xl border-2 border-dashed border-black bg-[#2ED573]/15 p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="my-auto flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#2ED573] text-lg font-black text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                    +
                                </div>
                                <h3 className="mt-3 text-xs font-black text-[#121212]">
                                    Create New Resource
                                </h3>
                                <p className="mt-1 max-w-[130px] text-[9px] font-bold text-gray-600">
                                    Start building your workspace by adding your
                                    first card.
                                </p>
                            </div>
                            <Link
                                href={
                                    route().has('resources.index')
                                        ? route('resources.index')
                                        : '#'
                                }
                                className="inline-flex w-full items-center justify-center gap-1 rounded-xl border-2 border-black bg-white py-1.5 text-[10px] font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                            >
                                <span>Add Resource</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
