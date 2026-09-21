import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import PrivateResource from '@/Components/PrivateResource';
import PublicResource from '@/Components/PublicResource';

export default function AuthenticatedLayout({
    children,
    privateResources,
    publicResources,
}) {
    const { url, props } = usePage();
    const user = props.auth?.user;

    const userPrivateResources =
        privateResources && privateResources.length > 0
            ? privateResources
            : props.privateResources || [];
    const userPublicResources =
        publicResources && publicResources.length > 0
            ? publicResources
            : props.publicResources || [];

    const [isPrivateResource, setIsPrivateResource] = useState(false);
    const [isPublicResource, setIsPublicResource] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        course_name: '',
        resource_type: '',
        invite_emails: '',
    });

    const closeResourceForm = () => {
        setIsPrivateResource(false);
        setIsPublicResource(false);
        reset();
    };

    const openResourceForm = (type) => {
        setData('resource_type', type);
        setIsPrivateResource(type === 'private');
        setIsPublicResource(type === 'public');
    };

    const handleResourceSubmit = (event) => {
        event.preventDefault();
        post(route().has('resources.store') ? route('resources.store') : '#', {
            onSuccess: closeResourceForm,
        });
    };

    return (
        <>
            {/* MOBILE TOP NAVBAR */}
            <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-[#2f2f2f] bg-[#191919] px-4 text-white md:hidden">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#3a3a3a] bg-[#222222] text-gray-300 transition-colors hover:bg-[#2c2c2c] hover:text-white"
                        aria-label="Toggle Navigation Menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>

                    <Link
                        href={
                            route().has('dashboard') ? route('dashboard') : '#'
                        }
                        className="inline-flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-red-600 text-[10px] font-black text-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                            TOS
                        </div>
                        <span className="text-base font-black tracking-tight text-red-500">
                            TutorOS
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href={
                            route().has('profile.edit')
                                ? route('profile.edit')
                                : '#'
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-xs font-bold text-white shadow-sm"
                        title={user?.name || 'Profile'}
                    >
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </Link>
                </div>
            </header>

            {/* MOBILE BACKDROP OVERLAY */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-64 max-w-[80vw] select-none flex-col justify-between border-r border-[#2f2f2f] bg-[#191919] p-3 text-sm font-medium text-[#9b9b9b] transition-transform duration-300 ease-in-out md:translate-x-0 ${
                    isMobileMenuOpen
                        ? 'translate-x-0 shadow-2xl'
                        : '-translate-x-full'
                }`}
            >
                {/* TOP NAVIGATION & CONTENT AREA */}
                <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto pr-1">
                    {/* SIDEBAR HEADER / BRANDING */}
                    <div className="flex items-center justify-between border-b border-[#2f2f2f] px-3 py-4">
                        <div className="inline-flex items-center gap-3 whitespace-nowrap">
                            {/* RED TOS LOGO BADGE */}
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-red-600 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                TOS
                            </div>

                            {/* INLINE TEXT */}
                            <span className="text-lg font-black leading-none tracking-tight text-red-500">
                                TutorOS
                            </span>
                        </div>

                        {/* MOBILE CLOSE BUTTON */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#3a3a3a] bg-[#252525] text-xs font-bold text-gray-400 hover:text-white md:hidden"
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>
                    {/* 1. HOME LINK */}
                    <div className="space-y-1">
                        <Link
                            onClick={() => setIsMobileMenuOpen(false)}
                            href={
                                route().has('dashboard')
                                    ? route('dashboard')
                                    : '#'
                            }
                            className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 transition-colors ${
                                url === '/dashboard' || url === '/'
                                    ? 'bg-[#2c2c2c] font-semibold text-white'
                                    : 'hover:bg-[#252525] hover:text-gray-200'
                            }`}
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span>Home</span>
                        </Link>
                    </div>

                    {/* 2. PRIVATE RESOURCES SECTION */}
                    <div className="space-y-1">
                        <span className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#5f5f5f]">
                            Private Resource
                        </span>

                        <button
                            type="button"
                            onClick={() => openResourceForm('private')}
                            className="flex items-center gap-2 rounded-md px-2.5 py-1 text-xs transition-colors hover:bg-[#252525] hover:text-gray-200"
                        >
                            <span className="text-sm font-bold">+</span>
                            <span>Add new</span>
                        </button>

                        {/* DYNAMIC PRIVATE RESOURCES LIST */}
                        {userPrivateResources.length > 0 && (
                            <div className="ml-3 mt-1 space-y-0.5 border-l border-[#2d2d2d] pl-2">
                                {userPrivateResources.map((item) => (
                                    <Link
                                        key={item.id}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        href={
                                            route().has('resources.private')
                                                ? route(
                                                      'resources.private',
                                                      item.id,
                                                  )
                                                : route().has('resources.show')
                                                  ? route(
                                                        'resources.show',
                                                        item.id,
                                                    )
                                                  : '#'
                                        }
                                        className={`flex items-center gap-2 truncate rounded-md px-2 py-1 text-xs transition-colors ${
                                            url ===
                                                `/resources/private/${item.id}` ||
                                            url === `/resources/${item.id}`
                                                ? 'bg-[#2c2c2c] font-semibold text-white'
                                                : 'hover:bg-[#252525] hover:text-gray-200'
                                        }`}
                                    >
                                        <span className="text-[10px]">🔒</span>
                                        <span className="truncate">
                                            {item.course_name ||
                                                item.name ||
                                                item.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 3. PUBLIC RESOURCES SECTION */}
                    <div className="space-y-1">
                        <span className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#5f5f5f]">
                            Public Resource
                        </span>

                        <button
                            type="button"
                            onClick={() => openResourceForm('public')}
                            className="flex items-center gap-2 rounded-md px-2.5 py-1 text-xs transition-colors hover:bg-[#252525] hover:text-gray-200"
                        >
                            <span className="text-sm font-bold">+</span>
                            <span>Add new</span>
                        </button>

                        {/* DYNAMIC PUBLIC RESOURCES LIST */}
                        {userPublicResources.length > 0 && (
                            <div className="ml-3 mt-1 space-y-0.5 border-l border-[#2d2d2d] pl-2">
                                {userPublicResources.map((item) => (
                                    <Link
                                        key={item.id}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        href={
                                            route().has('resources.public')
                                                ? route(
                                                      'resources.public',
                                                      item.id,
                                                  )
                                                : route().has('resources.show')
                                                  ? route(
                                                        'resources.show',
                                                        item.id,
                                                    )
                                                  : '#'
                                        }
                                        className={`flex items-center gap-2 truncate rounded-md px-2 py-1 text-xs transition-colors ${
                                            url ===
                                                `/resources/public/${item.id}` ||
                                            url === `/resources/${item.id}`
                                                ? 'bg-[#2c2c2c] font-semibold text-white'
                                                : 'hover:bg-[#252525] hover:text-gray-200'
                                        }`}
                                    >
                                        <span className="text-[10px]">🌐</span>
                                        <span className="truncate">
                                            {item.course_name ||
                                                item.name ||
                                                item.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 4. SESSION SECTION */}
                    <div className="space-y-1">
                        <Link
                            onClick={() => setIsMobileMenuOpen(false)}
                            href={
                                route().has('sessions.index')
                                    ? route('sessions.index')
                                    : '#'
                            }
                            className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 transition-colors ${
                                url.startsWith('/session')
                                    ? 'bg-[#2c2c2c] font-semibold text-white'
                                    : 'hover:bg-[#252525] hover:text-gray-200'
                            }`}
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            <span>Session</span>
                        </Link>
                    </div>
                </div>

                {/* BOTTOM SECTION: SETTINGS, PROFILE & LOGOUT */}
                <div className="space-y-1 border-t border-[#2f2f2f] pt-3">
                    {/* SETTINGS LINK */}
                    <Link
                        onClick={() => setIsMobileMenuOpen(false)}
                        href={route().has('settings') ? route('settings') : '#'}
                        className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 transition-colors ${
                            url === '/settings'
                                ? 'bg-[#2c2c2c] text-white'
                                : 'hover:bg-[#252525] hover:text-gray-200'
                        }`}
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span>Settings</span>
                    </Link>

                    {/* PROFILE & LOGOUT ROW */}
                    <div className="flex items-center justify-between gap-1 pt-1">
                        {/* PROFILE LINK */}
                        <Link
                            onClick={() => setIsMobileMenuOpen(false)}
                            href={
                                route().has('profile.edit')
                                    ? route('profile.edit')
                                    : '#'
                            }
                            className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-[#252525] hover:text-gray-200"
                        >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-purple-600 text-[10px] font-bold text-white">
                                {user?.name
                                    ? user.name.charAt(0).toUpperCase()
                                    : 'U'}
                            </div>
                            <span className="truncate text-xs text-gray-300">
                                {user?.name || 'Profile'}
                            </span>
                        </Link>

                        {/* LOGOUT BUTTON */}
                        <Link
                            method="post"
                            href={route().has('logout') ? route('logout') : '#'}
                            as="button"
                            className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-[#252525] hover:text-red-400"
                            title="Log Out"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </aside>
            <main className="ml-0 min-h-screen w-full overflow-x-hidden pt-14 md:ml-64 md:pt-0">
                {children}
            </main>

            {(isPrivateResource || isPublicResource) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4">
                    <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:rounded-3xl sm:p-6 sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center justify-between border-b-2 border-black pb-3">
                            <h2 className="text-base font-black text-[#121212] sm:text-lg">
                                {isPrivateResource
                                    ? 'Create Private Resource'
                                    : 'Create Public Resource'}
                            </h2>
                            <button
                                type="button"
                                onClick={closeResourceForm}
                                className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-black bg-red-500 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600"
                            >
                                ✕
                            </button>
                        </div>

                        {isPrivateResource ? (
                            <PrivateResource
                                data={data}
                                setData={setData}
                                onSubmit={handleResourceSubmit}
                                onClose={closeResourceForm}
                                processing={processing}
                                errors={errors}
                            />
                        ) : (
                            <PublicResource
                                data={data}
                                setData={setData}
                                onSubmit={handleResourceSubmit}
                                onClose={closeResourceForm}
                                processing={processing}
                                errors={errors}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
