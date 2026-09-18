import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Navigation items configuration
    const navItems = [
        { name: 'Dashboard', route: 'dashboard' },
        { name: 'Sessions', route: 'sessions.index' },
        { name: 'Quiz Generator', route: 'quizzes.index' },
        { name: 'Resources', route: 'resources.index' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#121212] antialiased">
            {/* MOBILE TOP BAR */}
            <div className="flex items-center justify-between border-b-2 border-black bg-[#121212] px-4 py-3 text-white lg:hidden">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-[#FF6B35] text-xs font-black">
                        TOS
                    </div>
                    <span className="text-lg font-black">TutorOS</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="rounded-xl border-2 border-white bg-[#121212] px-3 py-1 text-sm font-black text-white active:bg-gray-800"
                >
                    {sidebarOpen ? 'Close' : 'Menu'}
                </button>
            </div>

            <div className="flex">
                {/* SIDEBAR NAVIGATION */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r-2 border-black bg-[#121212] p-4 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="space-y-6">
                        {/* BRAND HEADER */}
                        <div className="flex items-center gap-3 px-2 py-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-white bg-[#FF6B35] text-sm font-black text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                                TOS
                            </div>
                            <span className="text-xl font-black tracking-tight text-white">
                                TutorOS
                            </span>
                        </div>

                        {/* NAV LINKS */}
                        <nav className="space-y-1.5">
                            {navItems.map((item) => {
                                const active =
                                    route().current(item.route) ||
                                    route().current(
                                        `${item.route.split('.')[0]}.*`,
                                    );
                                return (
                                    <Link
                                        key={item.name}
                                        href={
                                            route().has(item.route)
                                                ? route(item.route)
                                                : '#'
                                        }
                                        className={`flex items-center rounded-2xl px-4 py-3 text-sm font-black transition-all ${
                                            active
                                                ? 'border-2 border-black bg-[#FF6B35] text-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* BOTTOM SECTION: SETTINGS, LOGOUT & USER PROFILE */}
                    <div className="space-y-4 border-t border-white/10 pt-4">
                        <div className="space-y-1">
                            <button
                                type="button"
                                disabled
                                className="flex w-full cursor-not-allowed items-center rounded-xl px-4 py-2 text-left text-xs font-bold text-gray-500"
                            >
                                <span>Settings</span>
                            </button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex w-full items-center rounded-xl px-4 py-2 text-xs font-bold text-gray-400 hover:bg-white/5 hover:text-white"
                            >
                                <span>Logout</span>
                            </Link>
                        </div>

                        {/* USER AVATAR CARD */}
                        <div className="flex items-center gap-3 rounded-2xl border-2 border-white/20 bg-white/5 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-white bg-[#5352ED] font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                                {user?.name ? user.name.charAt(0) : 'U'}
                            </div>
                            <div className="truncate">
                                <div className="truncate text-xs font-black text-white">
                                    {user?.name || 'User'}
                                </div>
                                <div className="truncate text-[10px] font-medium text-gray-400">
                                    {user?.email || ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="min-h-screen flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
