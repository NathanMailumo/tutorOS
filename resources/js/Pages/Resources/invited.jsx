import React from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Invited({
    resource,
    collaborators = [],
    canInvite = false,
}) {
    const handleRemoveUser = (userId) => {
        if (
            confirm(
                'Are you sure you want to remove this user from the workspace?',
            )
        ) {
            router.delete(
                typeof route === 'function'
                    ? route('resources.collaborators.destroy', [
                          resource.id,
                          userId,
                      ])
                    : `/resources/${resource.id}/collaborators/${userId}`,
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <div
                className="flex min-h-[calc(100vh-3.5rem)] w-full max-w-4xl flex-col p-4 md:p-6"
                style={{
                    backgroundImage:
                        'radial-gradient(#d1d5db 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px',
                }}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-3">
                        <Link
                            href={
                                typeof route === 'function'
                                    ? route('resources.show', resource.id)
                                    : `/resources/${resource.id}`
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-gray-100 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-200"
                        >
                            ←
                        </Link>
                        <div>
                            <h1 className="text-base font-black text-[#121212]">
                                Workspace Collaborators
                            </h1>
                            <p className="text-xs font-bold text-gray-500">
                                {resource.course_code}: {resource.course_name}
                            </p>
                        </div>
                    </div>
                </div>

                {/* COLLABORATOR LIST TABLE */}
                <div className="mt-6 rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="border-b-2 border-black pb-3 text-xs font-black uppercase text-gray-700">
                        Invited Members ({collaborators.length})
                    </h2>

                    {collaborators.length === 0 ? (
                        <p className="py-6 text-center text-xs font-medium text-gray-500">
                            No collaborators have been invited yet.
                        </p>
                    ) : (
                        <div className="divide-y border-gray-200">
                            {collaborators.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between py-3 text-xs"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-sky-200 font-black">
                                            {user.name
                                                ? user.name[0].toUpperCase()
                                                : 'U'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-black">
                                                {user.name}
                                            </p>
                                            <p className="text-[11px] text-gray-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* STATUS BADGE */}
                                        {user.pivot?.status === 'pending' ? (
                                            <span className="rounded-md border border-black bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-800 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                Pending
                                            </span>
                                        ) : (
                                            <span className="rounded-md border border-black bg-green-100 px-2 py-0.5 text-[10px] font-black text-green-800 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                Accepted
                                            </span>
                                        )}

                                        {/* REMOVE BUTTON (OWNER ONLY) */}
                                        {canInvite && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveUser(user.id)
                                                }
                                                className="rounded-lg border-2 border-black bg-red-400 px-2 py-1 text-[11px] font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-500"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
