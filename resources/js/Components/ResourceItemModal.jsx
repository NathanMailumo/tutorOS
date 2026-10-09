import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function ResourceItemModal({
    isOpen,
    onClose,
    resourceId,
    defaultType,
}) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            resource_id: resourceId || '',
            type: defaultType || 'note',
            title: '',
            url: '',
            content: '',
            description: '',
            file: null,
        });

    useEffect(() => {
        if (isOpen) {
            setData((prev) => ({
                ...prev,
                resource_id: resourceId,
                type: defaultType || 'note',
            }));

            setData('file', null);
        }
    }, [defaultType, resourceId, isOpen, setData]);

    const handleClose = () => {
        reset();
        setData('file', null);
        clearErrors();
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.type === 'pq' && !data.file) return;

        post(
            typeof route === 'function'
                ? route('resource-items.store')
                : '/resource-items',
            {
                forceFormData: true,
                onSuccess: () => handleClose(),
            },
        );
    };

    if (!isOpen) return null;

    const isStickyNote = data.type === 'note';
    const isPracticeQuestions = data.type === 'pq';
    const isLink = data.type === 'link';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div
                className={`w-full max-w-md rounded-2xl border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${
                    isStickyNote
                        ? 'bg-[#fef08a] text-[#713f12]'
                        : 'bg-white text-[#121212]'
                }`}
            >
                {/* MODAL HEADER */}
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">
                            {isLink && '🔗'}
                            {isPracticeQuestions && '📄'}
                            {data.type === 'revision' && '📖'}
                            {isStickyNote && '📌'}
                        </span>
                        <h2 className="text-base font-black capitalize">
                            Add{' '}
                            {isStickyNote
                                ? 'Sticky Note'
                                : isLink
                                  ? 'Web Link'
                                  : isPracticeQuestions
                                    ? 'Practice Questions'
                                    : data.type}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-black bg-white font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
                    >
                        ✕
                    </button>
                </div>

                {/* FORM CONTENT */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {/* WEB LINK URL INPUT */}
                    {isLink && (
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-700">
                                Web Link URL
                            </label>
                            <input
                                type="url"
                                required
                                placeholder="https://example.com/article"
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                className="mt-1 w-full rounded-lg border-2 border-black bg-white p-2 text-xs font-medium text-black focus:outline-none focus:ring-0"
                            />
                            {errors.url && (
                                <p className="mt-1 text-[11px] font-bold text-red-600">
                                    {errors.url}
                                </p>
                            )}
                        </div>
                    )}

                    {/* TITLE INPUT */}
                    <div>
                        <label
                            className={`block text-xs font-black uppercase ${
                                isStickyNote
                                    ? 'text-amber-900'
                                    : 'text-gray-700'
                            }`}
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            required
                            placeholder={
                                isStickyNote
                                    ? 'Sticky Title...'
                                    : isLink
                                      ? 'Website or Article Name...'
                                      : 'Enter item title...'
                            }
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={`mt-1 w-full rounded-lg border-2 border-black p-2 text-xs font-bold focus:outline-none focus:ring-0 ${
                                isStickyNote
                                    ? 'bg-[#fef9c3] text-amber-950 placeholder-amber-700/50'
                                    : 'bg-white text-black'
                            }`}
                        />
                        {errors.title && (
                            <p className="mt-1 text-[11px] font-bold text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* PRACTICE QUESTION FILE */}
                    {isPracticeQuestions && (
                        <div className="rounded-xl border-2 border-black bg-sky-50 p-3">
                            <label className="block text-xs font-black uppercase text-sky-900">
                                Upload past practice questions
                            </label>
                            <p className="mt-1 text-[11px] font-medium text-sky-800">
                                Add past practice questions or exam papers for
                                revision. PDF, image, or text files under 2 MB.
                            </p>
                            <input
                                type="file"
                                required
                                accept=".pdf,.png,.jpg,.jpeg,.webp,.txt"
                                onChange={(e) =>
                                    setData('file', e.target.files?.[0] || null)
                                }
                                className="mt-3 w-full rounded-lg border-2 border-black bg-white p-2 text-xs font-medium text-black"
                            />
                            {errors.file && (
                                <p className="mt-1 text-[11px] font-bold text-red-600">
                                    {errors.file}
                                </p>
                            )}
                        </div>
                    )}

                    {/* STICKY NOTE OR REVISION TEXTAREA */}
                    {(isStickyNote || data.type === 'revision') && (
                        <div>
                            <label
                                className={`block text-xs font-black uppercase ${
                                    isStickyNote
                                        ? 'text-amber-900'
                                        : 'text-gray-700'
                                }`}
                            >
                                Content / Notes
                            </label>
                            <textarea
                                rows={isStickyNote ? 5 : 4}
                                required
                                placeholder={
                                    isStickyNote
                                        ? 'Jot down quick thoughts or reminders...'
                                        : 'Write key revision details here...'
                                }
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
                                className={`mt-1 w-full rounded-lg border-2 border-black p-2 text-xs font-medium focus:outline-none focus:ring-0 ${
                                    isStickyNote
                                        ? 'bg-[#fef9c3] font-serif leading-relaxed text-amber-950 placeholder-amber-700/50'
                                        : 'bg-white text-black'
                                }`}
                            />
                        </div>
                    )}

                    {/* WEB LINK DESCRIPTION */}
                    {isLink && (
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-700">
                                Description (Optional)
                            </label>
                            <textarea
                                rows="2"
                                placeholder="Brief summary of this article or link..."
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="mt-1 w-full rounded-lg border-2 border-black bg-white p-2 text-xs font-medium text-black focus:outline-none focus:ring-0"
                            />
                        </div>
                    )}

                    {/* SUBMIT BUTTON */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full rounded-lg border-2 border-black py-2 text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none disabled:opacity-50 ${
                                isStickyNote
                                    ? 'bg-amber-400 text-black hover:bg-amber-500'
                                    : 'bg-black text-white hover:bg-gray-800'
                            }`}
                        >
                            {processing ? 'Saving...' : 'Save Resource'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
