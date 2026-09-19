import React from 'react';

export default function PrivateResourceForm({
    data,
    setData,
    onSubmit,
    onClose,
    processing,
}) {
    return (
        <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div>
                <label className="mb-1.5 block text-xs font-black uppercase text-[#121212]">
                    Course / Space Name <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g. CSC 205 - Data Structures"
                    className="w-full rounded-xl border-2 border-black bg-gray-50 px-3.5 py-2.5 text-xs font-bold text-[#121212] placeholder-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0"
                />
            </div>

            <p className="text-[10px] font-bold text-gray-500">
                🔒 Private spaces are only visible to you.
            </p>

            <div className="flex items-center justify-end gap-2.5 border-t-2 border-black/10 pt-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border-2 border-black bg-white px-4 py-2 text-xs font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-xl border-2 border-black bg-red-600 px-5 py-2 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-red-700 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50"
                >
                    {processing ? 'Creating...' : 'Create Space'}
                </button>
            </div>
        </form>
    );
}
