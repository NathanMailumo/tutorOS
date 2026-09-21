import React from 'react';
import { useForm } from '@inertiajs/react';

export default function PrivateResourceForm({
    data: externalData,
    setData: externalSetData,
    onSubmit: externalOnSubmit,
    onClose,
    onSuccess,
    processing: externalProcessing,
    errors: externalErrors,
}) {
    const localForm = useForm({
        course_name: '',
        resource_type: 'private',
    });

    const isControlled = Boolean(externalData && externalSetData && externalOnSubmit);
    const data = isControlled ? externalData : localForm.data;
    const setData = isControlled ? externalSetData : localForm.setData;
    const processing = isControlled ? (externalProcessing ?? false) : localForm.processing;
    const errors = isControlled ? (externalErrors ?? {}) : localForm.errors;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isControlled) {
            externalOnSubmit(e);
        } else {
            localForm.post(route('resources.store'), {
                onSuccess: () => {
                    localForm.reset();
                    if (onSuccess) onSuccess();
                    if (onClose) onClose();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
                <label className="mb-1.5 block text-xs font-black uppercase text-[#121212]">
                    Course / Space Name <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={data.course_name || ''}
                    onChange={(e) => setData('course_name', e.target.value)}
                    placeholder="e.g. CSC 205 - Data Structures"
                    className="w-full rounded-xl border-2 border-black bg-gray-50 px-3.5 py-2.5 text-xs font-bold text-[#121212] placeholder-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0"
                />
                {errors?.course_name && (
                    <p className="mt-1 text-xs font-bold text-red-600">
                        {errors.course_name}
                    </p>
                )}
            </div>

            <p className="text-[10px] font-bold text-gray-500">
                🔒 Private spaces are only visible to you.
            </p>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5 border-t-2 border-black/10 pt-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto text-center rounded-xl border-2 border-black bg-white px-4 py-2.5 sm:py-2 text-xs font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto text-center rounded-xl border-2 border-black bg-red-600 px-5 py-2.5 sm:py-2 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-red-700 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50"
                >
                    {processing ? 'Creating...' : 'Create Space'}
                </button>
            </div>
        </form>
    );
}
