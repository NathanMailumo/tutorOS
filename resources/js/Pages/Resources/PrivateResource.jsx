import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ResourceItemModal from '@/Components/ResourceItemModal';

export default function PrivateResource({ resource, items = [] }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activeAddType, setActiveAddType] = useState(null);

    const openAddModal = (type = 'note') => {
        setActiveAddType(type);
        setIsAddModalOpen(true);
    };

    // Card Template Renderer
    const renderCard = (item) => {
        const metadata = item.metadata || {};

        switch (item.type) {
            case 'video': {
                const metadata = item.metadata || {};
                return (
                    <div
                        key={item.id}
                        className="flex flex-col justify-between rounded-xl border-2 border-black bg-[#1e1e1e] p-4 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
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
                        className="flex flex-col justify-between rounded-xl border-2 border-black bg-white p-4 text-[#121212] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
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
                                            🔗
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

            case 'formula': {
                // Split multi-line formula content back into an array
                const formulaLines = item.content
                    ? item.content.split('\n')
                    : [];

                return (
                    <div
                        key={item.id}
                        className="flex flex-col justify-between rounded-xl border-2 border-black bg-[#4f46e5] p-4 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <div>
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-200">
                                <span className="flex h-5 w-5 items-center justify-center rounded bg-white/20 font-bold">
                                    ƒ
                                </span>
                                Formula Cheat Sheet
                            </div>
                            <h3 className="mt-2 text-sm font-black">
                                {item.title}
                            </h3>
                            {formulaLines.length > 0 && (
                                <div className="mt-2 space-y-1 rounded-lg bg-black/20 p-2 font-mono text-xs leading-relaxed text-indigo-100">
                                    {formulaLines.map((line, idx) => (
                                        <div key={idx} className="truncate">
                                            {line}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            }

            case 'revision':
                return (
                    <div
                        key={item.id}
                        className="flex flex-col justify-between rounded-xl border-2 border-black bg-white p-4 text-[#121212] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <div>
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-blue-600">
                                <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100">
                                    📖
                                </span>
                                Revision Pack
                            </div>
                            <h3 className="mt-2 text-sm font-bold leading-snug">
                                {item.title}
                            </h3>
                            {item.content && (
                                <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-gray-600">
                                    {item.content}
                                </p>
                            )}
                        </div>
                    </div>
                );

            case 'note':
            default:
                return (
                    <div
                        key={item.id}
                        className="flex flex-col justify-between rounded-xl border-2 border-black bg-[#fef08a] p-4 text-[#713f12] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
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
                            onClick={() => openAddModal('video')}
                            className="rounded-lg border-2 border-black bg-white px-2.5 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            + Video
                        </button>
                        <button
                            type="button"
                            onClick={() => openAddModal('formula')}
                            className="rounded-lg border-2 border-black bg-white px-2.5 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            + Formula
                        </button>
                        <button
                            type="button"
                            onClick={() => openAddModal('revision')}
                            className="rounded-lg border-2 border-black bg-white px-2.5 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            + Revision
                        </button>
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
                        /* EMPTY STATE */
                        <div className="flex w-full flex-col items-center justify-center p-6 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-red-100 text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                📄
                            </div>
                            <h2 className="mt-3 text-base font-black text-[#121212]">
                                No resources added yet
                            </h2>
                            <p className="mt-1 max-w-xs text-xs font-medium text-gray-500">
                                Get started by adding links, video guides,
                                formula cheat sheets, revision packs, or sticky
                                notes.
                            </p>

                            {/* <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => openAddModal('link')}
                                    className="rounded-lg border-2 border-black bg-white px-3 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                >
                                    + Link
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openAddModal('video')}
                                    className="rounded-lg border-2 border-black bg-white px-3 py-1 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                >
                                    + Video
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openAddModal('note')}
                                    className="rounded-lg border-2 border-black bg-red-600 px-3 py-1 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-red-700 hover:shadow-none"
                                >
                                    + Note
                                </button>
                            </div> */}
                        </div>
                    ) : (
                        /* GRID DISPLAY FOR CREATED CARDS */
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
        </AuthenticatedLayout>
    );
}
