import { useForm } from '@inertiajs/react';

export default function Resource({ isOpen, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        course_name: '',
        resource_type: 'private',
    });

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/resources', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-resource-title"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="w-full max-w-md rounded-2xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-start justify-between gap-4 border-b-2 border-black pb-4">
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-wider text-red-600">
                            New workspace
                        </p>
                        <h2
                            id="create-resource-title"
                            className="mt-1 text-xl font-black text-[#121212]"
                        >
                            Create Resource
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-red-500 text-sm font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        aria-label="Close create resource popup"
                    >
                        X
                    </button>
                </div>

                <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label
                            htmlFor="course_name"
                            className="text-xs font-black uppercase tracking-wide text-[#121212]"
                        >
                            Course name
                        </label>
                        <input
                            value={data.course_name}
                            type="text"
                            placeholder="Enter course name"
                            onChange={(e) =>
                                setData('course_name', e.target.value)
                            }
                            className="w-full rounded-lg border-2 border-black px-3 py-2.5 text-sm font-medium text-[#121212] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-red-400"
                        />
                        {errors.course_name && <div>{errors.course_name}</div>}
                    </div>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="resource-type"
                            className="text-xs font-black uppercase tracking-wide text-[#121212]"
                        >
                            Resource type
                        </label>
                        <select
                            value={data.resource_type}
                            onChange={(e) =>
                                setData('resource_type', e.target.value)
                            }
                            className="w-full rounded-lg border-2 border-black bg-white px-3 py-2.5 text-sm font-medium text-[#121212] outline-none focus:ring-2 focus:ring-red-400"
                        >
                            <option value="private">Private resource</option>
                            <option value="public">Public resource</option>
                        </select>
                        {errors.resource_type && (
                            <div>{errors.resource_type}</div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border-2 border-black bg-white px-4 py-2 text-xs font-black text-[#121212] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg border-2 border-black bg-red-600 px-4 py-2 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-red-700 hover:shadow-none"
                        >
                            {processing ? 'Saving...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
