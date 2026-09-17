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
            <header className="relative z-10 flex items-center justify-between border-b border-black bg-[#121212] px-6 py-4 text-white md:px-12">
                <Link href="/" className="flex items-center gap-3">
                    <ApplicationLogo className="h-8 w-8 fill-current text-[#FF6B35]" />
                    <span className="text-xl font-black tracking-tight text-white">
                        TutorOS
                    </span>
                </Link>

                <div className="flex items-center gap-4 md:gap-6">
                    <Link
                        href={route('login')}
                        className="text-sm font-semibold text-gray-300 transition-colors hover:text-white"
                    >
                        Sign In
                    </Link>
                    <Link
                        href={route('register')}
                        className="rounded-xl border-2 border-black bg-[#FF6B35] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none md:text-sm"
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
