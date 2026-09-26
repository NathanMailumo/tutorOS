import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function SessionCreate() {
    const [mode, setMode] = useState('topics'); // 'topics' or 'resource'

    const { data, setData, post, processing, errors } = useForm({
        course_title: '',
        course_code: '',
        topics: '',
        resource_type: 'file', // 'file' or 'text'
        file: null,
        raw_notes: '',
        include_quiz: true,
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
                            materials and interactive quiz.
                        </p>
                    </div>

                    {/* MODE SELECTION TABS */}
                    <div className="grid grid-cols-2 gap-2 rounded-xl border-2 border-black bg-white p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <button
                            type="button"
                            onClick={() => setMode('topics')}
                            className={`rounded-lg border-2 px-3 py-2 text-xs font-black transition-all sm:text-sm ${
                                mode === 'topics'
                                    ? 'border-black bg-[#FF6B35] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                    : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-black'
                            }`}
                        >
                            Course & Topics
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('resource')}
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
                        {/* COURSE IDENTIFICATION */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-1 sm:col-span-2">
                                <label className="block text-[11px] font-black uppercase tracking-wide text-black sm:text-xs">
                                    Course Title{' '}
                                    <span className="text-[#FF6B35]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Data Structures and Algorithms"
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
                            <div className="space-y-1">
                                <label className="block text-[11px] font-black uppercase tracking-wide text-black sm:text-xs">
                                    Topics or Curriculum Outline{' '}
                                    <span className="text-[#FF6B35]">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="List your topics or syllabus concepts..."
                                    value={data.topics}
                                    onChange={(e) =>
                                        setData('topics', e.target.value)
                                    }
                                    className="w-full rounded-lg border-2 border-black bg-gray-50 p-3 text-xs font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0 sm:text-sm"
                                    required
                                />
                                {errors.topics && (
                                    <p className="text-xs font-bold text-red-600">
                                        {errors.topics}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="block text-[11px] font-black uppercase tracking-wide text-black sm:text-xs">
                                        Source Content
                                    </label>
                                    <div className="flex gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData('resource_type', 'file')
                                            }
                                            className={`rounded-md border-2 px-2.5 py-0.5 text-[11px] font-black ${
                                                data.resource_type === 'file'
                                                    ? 'border-black bg-[#FF6B35] text-white'
                                                    : 'border-black bg-white text-black'
                                            }`}
                                        >
                                            Upload File
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData('resource_type', 'text')
                                            }
                                            className={`rounded-md border-2 px-2.5 py-0.5 text-[11px] font-black ${
                                                data.resource_type === 'text'
                                                    ? 'border-black bg-[#FF6B35] text-white'
                                                    : 'border-black bg-white text-black'
                                            }`}
                                        >
                                            Paste Text
                                        </button>
                                    </div>
                                </div>

                                {data.resource_type === 'file' ? (
                                    <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-black bg-gray-50 p-5 text-center transition-colors hover:bg-gray-100">
                                        <p className="text-xs font-black text-black">
                                            {data.file
                                                ? data.file.name
                                                : 'Click to select or drop document here'}
                                        </p>
                                        <p className="mt-0.5 text-[10px] font-bold text-gray-500">
                                            PDF, TXT, or DOCX (Max 10MB)
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
                                    </div>
                                ) : (
                                    <textarea
                                        rows={4}
                                        placeholder="Paste notes, raw text, or lecture content..."
                                        value={data.raw_notes}
                                        onChange={(e) =>
                                            setData('raw_notes', e.target.value)
                                        }
                                        className="w-full rounded-lg border-2 border-black bg-gray-50 p-3 text-xs font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0 sm:text-sm"
                                    />
                                )}
                            </div>
                        )}

                        {/* OPTIONS & SUBMIT */}
                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="include_quiz"
                                    checked={data.include_quiz}
                                    onChange={(e) =>
                                        setData(
                                            'include_quiz',
                                            e.target.checked,
                                        )
                                    }
                                    className="h-4 w-4 cursor-pointer rounded border-2 border-black text-[#FF6B35] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] focus:ring-0"
                                />
                                <label
                                    htmlFor="include_quiz"
                                    className="cursor-pointer text-xs font-black text-black"
                                >
                                    Include interactive quiz
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-xl border-2 border-black bg-[#FF6B35] px-5 py-2.5 text-xs font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 sm:text-sm"
                            >
                                {processing
                                    ? 'Generating...'
                                    : 'Generate Session'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
