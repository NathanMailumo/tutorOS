import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function ResourceItemModal({
    isOpen,
    onClose,
    resourceId,
    defaultType,
}) {
    // Dynamic array for multiple formulas
    const [formulas, setFormulas] = useState(['']);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            resource_id: resourceId || '',
            type: defaultType || 'note',
            title: '',
            url: '',
            content: '',
            description: '',
        });

    // Keep internal state updated when modal opens or props change
    useEffect(() => {
        if (isOpen) {
            setData((prev) => ({
                ...prev,
                resource_id: resourceId,
                type: defaultType || 'note',
            }));

            if (defaultType === 'formula') {
                setFormulas(['']);
            }
        }
    }, [defaultType, resourceId, isOpen, setData]);

    const handleClose = () => {
        reset();
        setFormulas(['']);
        clearErrors();
        onClose();
    };

    // Dynamic Formula Handlers (Pure state updates without async race conditions)
    const handleFormulaChange = (index, value) => {
        const updated = [...formulas];
        updated[index] = value;
        setFormulas(updated);
    };

    const addFormulaField = () => {
        setFormulas([...formulas, '']);
    };

    const removeFormulaField = (index) => {
        if (formulas.length === 1) return;
        setFormulas(formulas.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate and serialize formulas right at submit time
        const formattedContent =
            data.type === 'formula'
                ? formulas.filter((f) => f.trim() !== '').join('\n')
                : data.content;

        post(
            typeof route === 'function'
                ? route('resource-items.store')
                : '/resource-items',
            {
                data: {
                    ...data,
                    content: formattedContent,
                },
                onSuccess: () => handleClose(),
            },
        );
    };

    if (!isOpen) return null;

    // Theme variations per modal type
    const isStickyNote = data.type === 'note';
    const isFormula = data.type === 'formula';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            {/* CONTAINER WITH THEME STYLES */}
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
                            {data.type === 'video' && '▶'}
                            {data.type === 'link' && '🔗'}
                            {data.type === 'formula' && 'ƒ'}
                            {data.type === 'revision' && '📖'}
                            {data.type === 'note' && '📌'}
                        </span>
                        <h2 className="text-base font-black capitalize">
                            Add{' '}
                            {data.type === 'note' ? 'Sticky Note' : data.type}
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
                    {/* URL INPUT (For Videos and Links) */}
                    {(data.type === 'video' || data.type === 'link') && (
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-700">
                                {data.type === 'video'
                                    ? 'YouTube URL'
                                    : 'Web Link URL'}
                            </label>
                            <input
                                type="url"
                                required
                                placeholder={
                                    data.type === 'video'
                                        ? 'https://www.youtube.com/watch?v=...'
                                        : 'https://example.com'
                                }
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

                    {/* FORMULA CHEAT SHEET (MULTIPLE LINED INPUTS) */}
                    {isFormula && (
                        <div className="rounded-xl border-2 border-black bg-white p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center justify-between pb-2">
                                <label className="block text-xs font-black uppercase text-indigo-900">
                                    Formulas (Lined Paper)
                                </label>
                                <span className="text-[10px] font-bold text-gray-400">
                                    {formulas.length} entries
                                </span>
                            </div>

                            {/* LINED PAPER CONTAINER */}
                            <div
                                className="space-y-2 rounded-lg border border-indigo-100 p-2"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(transparent 95%, #e0e7ff 95%)',
                                    backgroundSize: '100% 2.2rem',
                                    lineHeight: '2.2rem',
                                }}
                            >
                                {formulas.map((formula, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="font-mono text-xs font-black text-indigo-400">
                                            f({idx + 1})=
                                        </span>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. A = πr²"
                                            value={formula}
                                            onChange={(e) =>
                                                handleFormulaChange(
                                                    idx,
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border-b-2 border-indigo-400 bg-transparent px-1 py-0.5 font-mono text-xs font-bold text-indigo-950 focus:border-indigo-600 focus:outline-none"
                                        />
                                        {formulas.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFormulaField(idx)
                                                }
                                                className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-red-100 text-xs font-black text-red-600 hover:bg-red-200"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* ADD FORMULA LINE BUTTON */}
                            <button
                                type="button"
                                onClick={addFormulaField}
                                className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border-2 border-black bg-indigo-50 py-1.5 text-xs font-black text-indigo-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                            >
                                + Add Another Formula
                            </button>
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

                    {/* LINK / VIDEO DESCRIPTION */}
                    {(data.type === 'video' || data.type === 'link') && (
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-700">
                                Description (Optional)
                            </label>
                            <textarea
                                rows="2"
                                placeholder="Brief summary of this resource..."
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
                                    : 'bg-red-600 text-white hover:bg-red-700'
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
