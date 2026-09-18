import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ResourceIndex({ resources = [] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Resources" />

            <div className="space-y-8 p-6 lg:p-10">
                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-[#121212] md:text-5xl">
                        Resources
                    </h1>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                        Your topic workspaces — click a topic to open its
                        materials board.
                    </p>
                </div>

                {/* CREATE RESOURCE HERO BANNER */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-black bg-[#FF6B35] p-8 text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-10">
                    <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div className="space-y-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-white text-2xl font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                +
                            </div>
                            <h2 className="text-2xl font-black tracking-tight text-black md:text-3xl">
                                Create New Resource Workspace
                            </h2>
                            <p className="text-sm font-bold text-black/80">
                                Upload documents, links, and study notes to
                                organize your course materials.
                            </p>
                        </div>
                        <Link
                            href={
                                route().has('resources.create')
                                    ? route('resources.create')
                                    : '#'
                            }
                            className="inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-white px-6 py-3.5 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                            <span>Create Resource</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>

                {/* RESOURCES SECTION */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">
                        Workspaces
                    </h3>

                    {resources.length === 0 ? (
                        /* EMPTY STATE */
                        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-black bg-white p-12 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#FF6B35] text-sm font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                0
                            </div>
                            <h4 className="mt-4 text-lg font-black text-[#121212]">
                                No resources created yet
                            </h4>
                            <p className="mt-1 max-w-sm text-xs font-medium text-gray-500">
                                You haven't added any topic workspaces yet.
                                Create your first resource workspace above to
                                store study materials.
                            </p>
                        </div>
                    ) : (
                        /* RESOURCES GRID */
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {resources.map((resource) => (
                                <Link
                                    key={resource.id}
                                    href={
                                        route().has('resources.show')
                                            ? route(
                                                  'resources.show',
                                                  resource.id,
                                              )
                                            : '#'
                                    }
                                    className="group flex flex-col justify-between rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                >
                                    <div className="space-y-4">
                                        {/* HEADER BADGES & ICON */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#00A8FF] font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                <span>R</span>
                                            </div>

                                            {resource.course_code && (
                                                <span className="rounded-lg border-2 border-black bg-[#00A8FF] px-2.5 py-1 text-[11px] font-black uppercase text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                    {resource.course_code}
                                                </span>
                                            )}
                                        </div>

                                        {/* TITLE */}
                                        <h4 className="text-lg font-black leading-snug text-[#121212] group-hover:underline">
                                            {resource.title}
                                        </h4>
                                    </div>

                                    {/* METADATA FOOTER */}
                                    <div className="mt-6 flex items-center gap-4 text-xs font-bold text-gray-500">
                                        {resource.materials_count !==
                                            undefined && (
                                            <span>
                                                {resource.materials_count}{' '}
                                                materials
                                            </span>
                                        )}

                                        {resource.formatted_date && (
                                            <span>
                                                {resource.formatted_date}
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
