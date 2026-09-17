import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <GuestLayout>
            <Head title="Teaching Made Smarter" />

            <div className="relative mx-auto flex min-h-[85vh] w-full max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 md:py-20 lg:px-8">
                {/* FLOATING CARD 1: Top-Left */}
                <div className="absolute -left-4 top-4 z-10 hidden -rotate-6 transition-all duration-300 hover:rotate-0 xl:block 2xl:-left-12">
                    <div className="w-64 rounded-2xl border-2 border-black bg-[#FF6B35] p-5 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="mb-4 h-3 w-3 rounded-full border-2 border-black bg-white" />
                        <h3 className="mb-1 text-lg font-black tracking-wide">
                            Session Generator
                        </h3>
                        <p className="text-xs font-medium text-orange-100">
                            Cards, examples & notes — built instantly
                        </p>
                    </div>
                </div>

                {/* FLOATING CARD 2: Top-Right */}
                <div className="absolute -right-4 top-6 z-10 hidden rotate-3 transition-all duration-300 hover:rotate-0 xl:block 2xl:-right-12">
                    <div className="w-64 rounded-2xl border-2 border-black bg-[#121212] p-5 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="mb-3 flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#5B75F8] text-xs font-bold text-white">
                                ?
                            </span>
                            <h3 className="text-sm font-bold">Quiz Builder</h3>
                        </div>
                        <ul className="space-y-1.5 pl-1 text-xs font-medium text-gray-400">
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#5B75F8]" />{' '}
                                MCQ
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#5B75F8]" />{' '}
                                True / False
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#5B75F8]" />{' '}
                                Short Answer
                            </li>
                        </ul>
                    </div>
                </div>

                {/* FLOATING CARD 3: Bottom-Left */}
                <div className="absolute -left-2 bottom-4 z-10 hidden rotate-2 transition-all duration-300 hover:rotate-0 xl:block 2xl:-left-8">
                    <div className="w-64 rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="mb-3 text-xs font-black uppercase tracking-wider text-[#3BB273]">
                            REVISION PACKS
                        </h3>
                        <div className="space-y-2 text-xs font-bold text-gray-700">
                            <div>
                                <div className="mb-1 flex justify-between">
                                    <span>Notes</span>
                                    <span>90%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full border border-black bg-gray-100">
                                    <div className="h-full w-[90%] bg-[#3BB273]" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 flex justify-between">
                                    <span>Flashcards</span>
                                    <span>75%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full border border-black bg-gray-100">
                                    <div className="h-full w-[75%] bg-[#3BB273]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FLOATING CARD 4: Bottom-Right */}
                <div className="absolute -right-2 bottom-2 z-10 hidden -rotate-3 transition-all duration-300 hover:rotate-0 xl:block 2xl:-right-8">
                    <div className="w-64 rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="mb-2 flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-black bg-[#E85D75] text-sm font-bold text-white">
                                🔗
                            </div>
                            <h3 className="text-sm font-bold text-[#121212]">
                                Share Session
                            </h3>
                        </div>
                        <p className="mb-3 text-xs font-medium text-gray-500">
                            One link · students read your cards
                        </p>
                        <div className="truncate rounded-lg border border-black bg-[#E85D75] p-2 text-center font-mono text-[10px] text-white">
                            tutoros.ai/share/csc3...
                        </div>
                    </div>
                </div>

                {/* MAIN HERO CENTER */}
                <div className="z-20 mx-auto my-auto flex max-w-xl flex-col items-center text-center">
                    {/* Category Tag */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6B35] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:text-sm">
                        <span></span> Peer-Mentor Platform
                    </div>

                    {/* Main Headline */}
                    <h1 className="mb-4 text-5xl font-black leading-[1.1] tracking-tight text-[#121212] md:text-6xl lg:text-7xl">
                        Teaching made <br />
                        <span className="text-[#FF6B35]">smarter.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="mb-8 max-w-lg text-base font-medium leading-relaxed text-gray-600 md:text-lg">
                        TutorOS generates complete teaching sessions, quizzes,
                        and revision packs for peer mentors.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="w-full rounded-2xl border-2 border-black bg-[#FF6B35] px-8 py-4 text-center text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:w-auto"
                            >
                                Go To Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('register')}
                                    className="w-full rounded-2xl border-2 border-black bg-[#FF6B35] px-8 py-4 text-center text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:w-auto"
                                >
                                    Get Started Free
                                </Link>

                                <Link
                                    href={route('login')}
                                    className="w-full rounded-2xl border-2 border-black bg-white px-8 py-4 text-center text-sm font-black uppercase tracking-wider text-[#121212] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:w-auto"
                                >
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
