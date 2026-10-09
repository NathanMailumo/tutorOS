import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ResourceItemModal from '@/Components/ResourceItemModal';
import InviteModal from '@/Components/Invite';
import YouTubePickerModal from '@/Components/YoutubePickerModal';

export default function PublicResource({
    resource,
    items = [],
    canInvite = false,
}) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activeAddType, setActiveAddType] = useState(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const [isYtModalOpen, setIsYtModalOpen] = useState(false);
    const [selectedPracticeImage, setSelectedPracticeImage] = useState(null);

    const openAddModal = (type = 'note') => {
        setActiveAddType(type);
        setIsAddModalOpen(true);
    };

    const handleDelete = (item) => {
        if (!window.confirm('Delete this resource card?')) {
            return;
        }

        router.delete(
            typeof route === 'function'
                ? route('resource-items.destroy', item.id)
                : `/resource-items/${item.id}`,
        );
    };

    const handleSaveVideo = (video) => {
        router.post(
            typeof route === 'function'
                ? route('resource-items.store')
                : '/resource-items',
            {
                resource_id: resource.id,
                type: 'video',
                title: video.title,
                url: video.url,
                description: `Channel: ${video.uploader}`,
            },
            {
                onSuccess: () => setIsYtModalOpen(false),
            },
        );
    };

    const renderCard = (item) => {
        const metadata = item.metadata || {};

        switch (item.type) {
            case 'video': {
                return (
                    <div
                        key={item.id}
                        className="relative flex flex-col justify-between rounded-xl border-2 border-black bg-[#1e1e1e] p-4 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="absolute right-2 top-2 rounded border border-white/50 bg-red-600 px-2 py-1 text-[10px] font-black uppercase text-white"
                            aria-label={`Delete ${item.title}`}
                        >
                            Delete
                        </button>
                        <div>
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-pink-400">
                                <span className="flex items-center gap-1">
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-pink-500/20">
                                        ▶
                                    </span>
                                    YouTube Video
                                </span>
                                {metadata.author_name && (
                                    <span className="text-gray-400">
                                        {metadata.author_name}
                                    </span>
                                )}
                            </div>
                            <h3 className="mt-2 text-sm font-bold leading-snug">
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="mt-1 line-clamp-2 text-xs text-gray-300">
                                    {item.description}
                                </p>
                            )}
                        </div>
                        {item.url && (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 truncate rounded-md bg-[#2d2d2d] px-2 py-1 font-mono text-[11px] text-gray-400 hover:text-white"
                            >
                                {item.url}
                            </a>
                        )}
                    </div>
                );
            }
            case 'link':
                return (
                    <div
                        key={item.id}
                        className="relative flex flex-col justify-between rounded-xl border-2 border-black bg-white p-4 text-[#121212] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="absolute right-2 top-2 rounded border-2 border-black bg-red-600 px-2 py-1 text-[10px] font-black uppercase text-white"
                            aria-label={`Delete ${item.title}`}
                        >
                            Delete
                        </button>
                        <div>
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-orange-600">
                                <span className="flex items-center gap-1.5">
                                    {metadata.favicon ? (
                                        <img
                                            src={metadata.favicon}
                                            alt=""
                                            className="h-4 w-4 rounded-sm"
                                        />
                                    ) : (
                                        <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-100">
                                            🌐
                                        </span>
                                    )}
                                    Web Link
                                </span>
                                {metadata.domain && (
                                    <span className="lowercase text-gray-400">
                                        {metadata.domain}
                                    </span>
                                )}
                            </div>
                            <h3 className="mt-2 text-sm font-bold leading-snug">
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                                    {item.description}
                                </p>
                            )}
                        </div>
                        {item.url && (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 truncate text-xs font-bold text-orange-600 underline hover:text-orange-700"
                            >
                                {item.url}
                            </a>
                        )}
                    </div>
                );

            case 'pq': {
                const fileUrl = metadata.file_url;
                const isPreviewableImage =
                    metadata.mime_type?.startsWith('image/');
                const isPdf = metadata.mime_type === 'application/pdf';
                return (
                    <div
                        key={item.id}
                        className="relative flex flex-col justify-between rounded-xl border-2 border-black bg-sky-100 p-4 text-sky-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="absolute right-2 top-2 rounded border-2 border-black bg-red-600 px-2 py-1 text-[10px] font-black uppercase text-white"
                            aria-label={`Delete ${item.title}`}
                        >
                            Delete
                        </button>
                        <div>
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-sky-700">
                                <span className="flex h-5 w-5 items-center justify-center rounded bg-sky-300 font-bold">
                                    📄
                                </span>
                                Practice Questions
                            </div>
                            <h3 className="mt-2 pr-16 text-sm font-black">
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="mt-1 line-clamp-2 text-xs text-sky-800">
                                    {item.description}
                                </p>
                            )}
                            {fileUrl && isPdf && (
                                <iframe
                                    src={fileUrl}
                                    title={item.title}
                                    className="mt-3 h-36 w-full rounded border-2 border-black bg-white"
                                />
                            )}
                            {fileUrl && isPreviewableImage && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedPracticeImage({
                                            url: fileUrl,
                                            title: item.title,
                                        })
                                    }
                                    className="group relative mt-3 block w-full overflow-hidden rounded border-2 border-black bg-white text-left"
                                    aria-label={`View ${item.title}`}
                                >
                                    <img
                                        src={fileUrl}
                                        alt={item.title}
                                        className="max-h-36 w-full object-contain transition-transform duration-200 group-hover:scale-105"
                                    />
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-xs font-black uppercase text-white opacity-0 transition-all group-hover:bg-black/45 group-hover:opacity-100">
                                        Click to view
                                    </span>
                                </button>
                            )}
                            {fileUrl && !isPdf && !isPreviewableImage && (
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 block truncate text-xs font-bold text-sky-700 underline"
                                >
                                    Open{' '}
                                    {metadata.file_name || 'practice questions'}
                                </a>
                            )}
                        </div>
                    </div>
                );
            }

            case 'revision':
                return (
                    <Link
                        key={item.id}
                        href={
                            item.study_session_id
                                ? route('sessions.show', item.study_session_id)
                                : '#'
                        }
                        className="relative flex flex-col justify-between rounded-xl border-2 border-black bg-white p-4 text-[#121212] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <button
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                handleDelete(item);
                            }}
                            className="absolute right-2 top-2 z-10 rounded border-2 border-black bg-red-600 px-2 py-1 text-[10px] font-black uppercase text-white"
                            aria-label={`Delete ${item.title}`}
                        >
                            Delete
                        </button>
                        <div>
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-blue-600">
                                <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100">
                                    📋
                                </span>
                                Revision Pack
                            </div>
                            <h3 className="mt-2 text-sm font-bold leading-snug">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-xs font-bold text-blue-600">
                                Open session →
                            </p>
                        </div>
                    </Link>
                );

            case 'note':
            default:
                return (
                    <div
                        key={item.id}
                        className="relative flex flex-col justify-between rounded-xl border-2 border-black bg-[#fef08a] p-4 text-[#713f12] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="absolute right-2 top-2 rounded border-2 border-black bg-red-600 px-2 py-1 text-[10px] font-black uppercase text-white"
                            aria-label={`Delete ${item.title}`}
                        >
                            Delete
                        </button>
                        <div>
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-900">
                                <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-300/60">
                                    📌
                                </span>
                                Sticky Note
                            </div>
                            <h3 className="mt-2 text-sm font-black leading-snug text-amber-950">
                                {item.title}
                            </h3>
                            {item.content && (
                                <p className="mt-2 whitespace-pre-line font-serif text-xs leading-relaxed text-amber-900">
                                    {item.content}
                                </p>
                            )}
                        </div>
                    </div>
                );
        }
    };

    return (
        <AuthenticatedLayout>
            <div
                className="flex min-h-[calc(100vh-3.5rem)] w-full max-w-7xl flex-col p-4 md:p-6"
                style={{
                    backgroundImage:
                        'radial-gradient(#d1d5db 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px',
                }}
            >
                {/* HEADER BAR */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2.5">
                        <span className="rounded-md border border-black bg-sky-400 px-2 py-0.5 text-xs font-black uppercase text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            {resource?.course_code || 'COURSE'}
                        </span>
                        <h1 className="text-base font-black text-[#121212]">
                            {resource?.course_name || 'Resource Workspace'}
                        </h1>
                    </div>

                    {/* TOP ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <Link
                            href={
                                typeof route === 'function'
                                    ? route(
                                          'resources.collaborators.index',
                                          resource?.id,
                                      )
                                    : `/resources/${resource?.id}/collaborators`
                            }
                            className="rounded-lg border-2 border-black bg-sky-200 px-2.5 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            👥 Members
                        </Link>

                        {canInvite && (
                            <button
                                type="button"
                                onClick={() => setIsInviteModalOpen(true)}
                                className="mr-2 rounded-lg border-2 border-black bg-yellow-400 px-2.5 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                            >
                                + Invite
                            </button>
                        )}

                        <span className="mr-1 text-[11px] font-bold text-gray-500">
                            Add:
                        </span>
                        <button
                            type="button"
                            onClick={() => openAddModal('link')}
                            className="rounded-lg border-2 border-black bg-white px-2.5 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            + Link
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsYtModalOpen(true)}
                            className="rounded-lg border-2 border-black bg-white px-2.5 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            + Video
                        </button>
                        <button
                            type="button"
                            onClick={() => openAddModal('pq')}
                            className="rounded-lg border-2 border-black bg-white px-2.5 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            + Practice Questions
                        </button>
                        <Link
                            href={route('sessions.create', {
                                resource_id: resource?.id,
                            })}
                            className="rounded-lg border-2 border-black bg-white px-2.5 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            + Revision
                        </Link>
                        <button
                            type="button"
                            onClick={() => openAddModal('note')}
                            className="rounded-lg border-2 border-black bg-white px-2.5 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            + Note
                        </button>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="flex flex-1 py-6">
                    {items.length === 0 ? (
                        /* EMPTY STATE - NOW PROPERLY SHOWS INVITE FOR OWNER */
                        <div className="flex w-full flex-col items-center justify-center p-6 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-sky-100 text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                👥
                            </div>
                            <h2 className="mt-3 text-base font-black text-[#121212]">
                                {canInvite
                                    ? 'Invite Collaborators'
                                    : 'Workspace is Empty'}
                            </h2>
                            <p className="mt-1 max-w-xs text-xs font-medium text-gray-500">
                                {canInvite
                                    ? 'Invite others to access, collaborate and participate in resource gathering.'
                                    : 'No items have been added to this resource space yet. Start by adding one above!'}
                            </p>

                            {canInvite && (
                                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsInviteModalOpen(true)
                                        }
                                        className="rounded-lg border-2 border-black bg-yellow-400 px-3 py-1.5 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                    >
                                        Invite Others
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* GRID DISPLAY FOR CARDS */
                        <div className="grid w-full items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {items.map((item) => renderCard(item))}
                        </div>
                    )}
                </div>
            </div>

            {/* DYNAMIC RESOURCE ITEM MODAL */}
            <ResourceItemModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                resourceId={resource?.id}
                defaultType={activeAddType || 'note'}
            />
            <YouTubePickerModal
                isOpen={isYtModalOpen}
                onClose={() => setIsYtModalOpen(false)}
                onSelectVideo={handleSaveVideo}
            />
            {selectedPracticeImage && (
                <div
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Viewing ${selectedPracticeImage.title}`}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedPracticeImage(null);
                        }
                    }}
                >
                    <div className="relative max-h-[92vh] max-w-5xl rounded-xl border-2 border-black bg-white p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <button
                            type="button"
                            onClick={() => setSelectedPracticeImage(null)}
                            className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-red-600 font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            aria-label="Close image viewer"
                        >
                            X
                        </button>
                        <img
                            src={selectedPracticeImage.url}
                            alt={selectedPracticeImage.title}
                            className="max-h-[86vh] max-w-[calc(100vw-2rem)] rounded object-contain"
                        />
                        <p className="px-2 pb-1 pt-2 text-center text-xs font-black text-[#121212]">
                            {selectedPracticeImage.title}
                        </p>
                    </div>
                </div>
            )}

            {/* INVITE MODAL FOR OWNER */}
            {canInvite && (
                <InviteModal
                    isOpen={isInviteModalOpen}
                    onClose={() => setIsInviteModalOpen(false)}
                    resourceId={resource?.id}
                    inviteLink={resource?.invite_link}
                />
            )}
        </AuthenticatedLayout>
    );
}
