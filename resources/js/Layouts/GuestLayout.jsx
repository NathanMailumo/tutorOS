import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#F7F6F0] font-sans antialiased">
            {/* Dotted Grid Background Overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `radial-gradient(#121212 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Top Navigation Bar */}
            <header className="relative z-10 flex items-center justify-between border-b border-black bg-[#121212] px-4 py-3 sm:px-6 sm:py-4 md:px-12 text-white">
                <Link href="/" className="flex items-center gap-2 sm:gap-3">
                    <ApplicationLogo className="h-7 w-7 sm:h-8 sm:w-8 fill-current text-[#FF6B35]" />
                    <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                        TutorOS
                    </span>
                </Link>

                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                    <Link
                        href={route('login')}
                        className="text-xs sm:text-sm font-semibold text-gray-300 transition-colors hover:text-white"
                    >
                        Sign In
                    </Link>
                    <Link
                        href={route('register')}
                        className="rounded-xl border-2 border-black bg-[#FF6B35] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none sm:px-5 sm:py-2.5 sm:text-sm"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex flex-grow flex-col justify-center">
                {children}
            </main>
        </div>
    );
}
