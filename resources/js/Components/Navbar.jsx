import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useAuth, useClerk } from '@clerk/clerk-react';

export default function Navbar() {
    const { isSignedIn, isLoaded } = useAuth();
    const { signOut } = useClerk();
    const { auth } = usePage().props;

    const isAuthenticated = isLoaded && (isSignedIn || !!auth?.user);

    return (
        <nav className="border-b-4 border-black bg-white px-4 py-3 shadow-[0_4px_0_0_rgba(0,0,0,1)] sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="rounded-lg border-2 border-black bg-[#FF6B35] px-2.5 py-0.5 text-lg font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        TOS
                    </div>
                    <span className="text-xl font-black uppercase tracking-tight text-black">
                        TutorOS
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            {/* <Link
                                href={route('dashboard')}
                                className="rounded-xl border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            >
                                Dashboard
                            </Link> */}

                            <button
                                type="button"
                                onClick={() =>
                                    signOut(() => router.visit('/login'))
                                }
                                className="rounded-xl border-2 border-black bg-[#E85D75] px-4 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:opacity-90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded-xl border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            >
                                Log In
                            </Link>

                            <Link
                                href={route('register')}
                                className="rounded-xl border-2 border-black bg-[#FF6B35] px-4 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-orange-600 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
