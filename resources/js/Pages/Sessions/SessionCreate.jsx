import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function SessionCreate() {
    const [mode, setMode] = useState('topics'); // 'topics' or 'resource'

    const { data, setData, post, processing, errors } = useForm({
        course_title: '',
        course_code: '',
        input_option: 'text', // 'file' or 'text'
        file: null,
        focus_prompt: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sessions.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Session" />

            {/* FULL SCREEN DOTTED BACKGROUND - FULLY CENTERED VERTICALLY & HORIZONTALLY */}
            <div className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center bg-[#F8F9FA] bg-[radial-gradient(#d1d5db_1.5px,transparent_1.5px)] px-4 py-8 [background-size:16px_16px] sm:px-8 md:min-h-screen">
                {/* CENTERED & CONSTRAINED CONTENT CONTAINER */}
                <div className="w-full max-w-2xl space-y-6">
                    {/* PAGE HEADER */}
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[#121212] sm:text-3xl">
                            Create Session
                        </h1>
                        <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                            Select an input method to generate your study
                            materials.
                        </p>
                    </div>

                    {/* MODE SELECTION TABS */}
                    <div className="grid grid-cols-2 gap-2 rounded-xl border-2 border-black bg-white p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <button
                            type="button"
                            onClick={() => {
                                setMode('topics');
                                setData('input_option', 'text');
                            }}
                            className={`rounded-lg border-2 px-3 py-2 text-xs font-black transition-all sm:text-sm ${
                                mode === 'topics'
                                    ? 'border-black bg-[#FF6B35] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                    : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-black'
                            }`}
                        >
                            Prompt & Topics
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setMode('resource');
                                setData('input_option', 'file');
                            }}
                            className={`rounded-lg border-2 px-3 py-2 text-xs font-black transition-all sm:text-sm ${
                                mode === 'resource'
                                    ? 'border-black bg-[#FF6B35] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                    : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-black'
                            }`}
                        >
                            Import Notes / Material
                        </button>
                    </div>

                    {/* FORM CONTAINER */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 rounded-2xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-7"
                    >
                        {/* MODE INSTRUCTION SUBTEXT */}
                        <p className="text-xs font-bold italic text-gray-600">
                            {mode === 'topics'
                                ? 'dont have any materials?... generate sessions without importing study materials'
                                : 'import study materials with content specifics to generate study materials'}
                        </p>

                        {/* COURSE IDENTIFICATION */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-1 sm:col-span-2">
                                <label className="block text-[11px] font-black uppercase tracking-wide text-black sm:text-xs">
                                    Course Title{' '}
                                    <span className="text-[#FF6B35]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g... Data Structures and Algorithms"
                                    value={data.course_title}
                                    onChange={(e) =>
                                        setData('course_title', e.target.value)
                                    }
                                    className="w-full rounded-lg border-2 border-black bg-gray-50 px-3 py-2 text-xs font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0 sm:text-sm"
                                    required
                                />
                                {errors.course_title && (
                                    <p className="text-xs font-bold text-red-600">
                                        {errors.course_title}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="block text-[11px] font-black uppercase tracking-wide text-black sm:text-xs">
                                    Course Code
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., CS201"
                                    value={data.course_code}
                                    onChange={(e) =>
                                        setData('course_code', e.target.value)
                                    }
                                    className="w-full rounded-lg border-2 border-black bg-gray-50 px-3 py-2 text-xs font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0 sm:text-sm"
                                />
                                {errors.course_code && (
                                    <p className="text-xs font-bold text-red-600">
                                        {errors.course_code}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* DYNAMIC CONTENT INPUT */}
                        {mode === 'topics' ? (
                            /* PROMPT & TOPICS MODE */
                            <div className="space-y-1">
                                <label className="block text-[11px] font-black uppercase tracking-wide text-black sm:text-xs">
                                    Study Directives & Topics Outline{' '}
                                    <span className="text-[#FF6B35]">*</span>
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="List topics or concepts to focus on..."
                                    value={data.focus_prompt}
                                    onChange={(e) =>
                                        setData('focus_prompt', e.target.value)
                                    }
                                    className="w-full rounded-lg border-2 border-black bg-gray-50 p-3 text-xs font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0 sm:text-sm"
                                    required
                                />
                                {errors.focus_prompt && (
                                    <p className="text-xs font-bold text-red-600">
                                        {errors.focus_prompt}
                                    </p>
                                )}
                            </div>
                        ) : (
                            /* IMPORT MATERIAL MODE */
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="block text-[11px] font-black uppercase tracking-wide text-black sm:text-xs">
                                        Source Document{' '}
                                        <span className="text-[#FF6B35]">
                                            *
                                        </span>
                                    </label>
                                    <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-black bg-gray-50 p-5 text-center transition-colors hover:bg-gray-100">
                                        {data.file ? (
                                            <div className="z-10 flex flex-col items-center gap-2">
                                                <p className="text-xs font-black text-black">
                                                    {data.file.name}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setData('file', null);
                                                    }}
                                                    className="rounded border border-black bg-red-500 px-2 py-0.5 text-[10px] font-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600"
                                                >
                                                    Remove File
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-xs font-black text-black">
                                                    Click to select or drop
                                                    document here
                                                </p>
                                                <p className="mt-0.5 text-[10px] font-bold text-gray-500">
                                                    PDF, TXT, or DOCX (Max 5MB)
                                                </p>
                                                <input
                                                    type="file"
                                                    accept=".pdf,.txt,.docx"
                                                    onChange={(e) =>
                                                        setData(
                                                            'file',
                                                            e.target.files[0],
                                                        )
                                                    }
                                                    className="absolute inset-0 cursor-pointer opacity-0"
                                                />
                                            </>
                                        )}
                                    </div>
                                    {errors.file && (
                                        <p className="text-xs font-bold text-red-600">
                                            {errors.file}
                                        </p>
                                    )}
                                </div>

                                {/* SPECIFIC FOCUS UNBOXED INPUT */}
                                <div className="space-y-1">
                                    <label
                                        htmlFor="focus_prompt"
                                        className="block text-[11px] font-black uppercase tracking-wide text-black sm:text-xs"
                                    >
                                        Specific Focus / Target Area{' '}
                                        <span className="text-[10px] font-normal text-gray-500">
                                            (Optional)
                                        </span>
                                    </label>
                                    <input
                                        id="focus_prompt"
                                        type="text"
                                        placeholder="List specific areas from imported files"
                                        value={data.focus_prompt}
                                        onChange={(e) =>
                                            setData(
                                                'focus_prompt',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border-2 border-black bg-gray-50 px-3 py-2 text-xs font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0 sm:text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        {/* SUBMIT BUTTON */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center rounded-xl border-2 border-black bg-[#FF6B35] px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 sm:text-sm"
                            >
                                {processing
                                    ? 'Generating Study Workspace...'
                                    : 'Generate Study Workspace'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
