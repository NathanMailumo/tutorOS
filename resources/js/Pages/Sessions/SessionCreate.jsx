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
        card_count: 10,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sessions.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Revision Pack" />

            <div className="mx-40 w-full max-w-4xl space-y-6 overflow-x-hidden px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8 lg:px-8">
                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-[#121212] sm:text-4xl md:text-5xl">
                        Create Revision Pack
                    </h1>
                    <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                        Generate flashcards, summaries, and quizzes using course
                        topics or your uploaded notes.
                    </p>
                </div>

                {/* MODE SELECTION TABS */}
                <div className="grid grid-cols-2 gap-3 rounded-2xl border-2 border-black bg-white p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:gap-4">
                    <button
                        type="button"
                        onClick={() => setMode('topics')}
                        className={`rounded-xl border-2 px-4 py-3 text-xs font-black transition-all sm:py-4 sm:text-sm ${
                            mode === 'topics'
                                ? 'border-black bg-[#FF6B35] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                    >
                        📚 Course & Topics
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('resource')}
                        className={`rounded-xl border-2 px-4 py-3 text-xs font-black transition-all sm:py-4 sm:text-sm ${
                            mode === 'resource'
                                ? 'border-black bg-[#FF6B35] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                    >
                        📄 Import Notes / File
                    </button>
                </div>

                {/* FORM CONTAINER */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:space-y-8 sm:rounded-3xl sm:p-10"
                >
                    {/* COMMON FIELD: COURSE INFORMATION */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">
                            1. Course Information
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="block text-xs font-black uppercase tracking-wide text-black sm:text-sm">
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
                                    className="w-full rounded-xl border-2 border-black bg-gray-50 px-4 py-3 text-sm font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0"
                                    required
                                />
                                {errors.course_title && (
                                    <p className="text-xs font-bold text-red-600">
                                        {errors.course_title}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-black uppercase tracking-wide text-black sm:text-sm">
                                    Course Code
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., CS201"
                                    value={data.course_code}
                                    onChange={(e) =>
                                        setData('course_code', e.target.value)
                                    }
                                    className="w-full rounded-xl border-2 border-black bg-gray-50 px-4 py-3 text-sm font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0"
                                />
                                {errors.course_code && (
                                    <p className="text-xs font-bold text-red-600">
                                        {errors.course_code}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className="border-t-2 border-black" />

                    {/* DYNAMIC CONTENT MODE SECTION */}
                    {mode === 'topics' ? (
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">
                                2. Curriculum & Topics
                            </h3>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-black uppercase tracking-wide text-black sm:text-sm">
                                    Topics to Learn{' '}
                                    <span className="text-[#FF6B35]">*</span>
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Enter the topics or curriculum points separated by lines or commas... e.g. Binary Search Trees, Graph Traversal, Sorting Algorithms"
                                    value={data.topics}
                                    onChange={(e) =>
                                        setData('topics', e.target.value)
                                    }
                                    className="w-full rounded-xl border-2 border-black bg-gray-50 p-4 text-sm font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0"
                                    required
                                />
                                <p className="text-[11px] font-bold text-gray-500">
                                    Our AI will structure comprehensive revision
                                    material around these specific topics.
                                </p>
                                {errors.topics && (
                                    <p className="text-xs font-bold text-red-600">
                                        {errors.topics}
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">
                                    2. Import Notes & Resources
                                </h3>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData('resource_type', 'file')
                                        }
                                        className={`rounded-lg border-2 px-3 py-1 text-xs font-black ${
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
                                        className={`rounded-lg border-2 px-3 py-1 text-xs font-black ${
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
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-black uppercase tracking-wide text-black sm:text-sm">
                                        Upload Document (PDF, TXT, DOCX)
                                    </label>
                                    <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black bg-gray-50 p-8 text-center transition-colors hover:bg-gray-100">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#FF6B35] text-xl font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            📁
                                        </div>
                                        <p className="mt-3 text-xs font-black text-black sm:text-sm">
                                            {data.file
                                                ? data.file.name
                                                : 'Click to select or drag and drop your file here'}
                                        </p>
                                        <p className="mt-1 text-[11px] font-bold text-gray-500">
                                            Maximum file size: 10MB
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
                                    {errors.file && (
                                        <p className="text-xs font-bold text-red-600">
                                            {errors.file}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-black uppercase tracking-wide text-black sm:text-sm">
                                        Paste Lecture Notes / Content
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder="Paste your raw lecture notes, syllabus content, or study materials here..."
                                        value={data.raw_notes}
                                        onChange={(e) =>
                                            setData('raw_notes', e.target.value)
                                        }
                                        className="w-full rounded-xl border-2 border-black bg-gray-50 p-4 text-sm font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0"
                                    />
                                    {errors.raw_notes && (
                                        <p className="text-xs font-bold text-red-600">
                                            {errors.raw_notes}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <hr className="border-t-2 border-black" />

                    {/* PACK PREFERENCES */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">
                            3. Pack Customization
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* NUMBER OF CARDS */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-black uppercase tracking-wide text-black sm:text-sm">
                                    Target Card Count
                                </label>
                                <select
                                    value={data.card_count}
                                    onChange={(e) =>
                                        setData('card_count', e.target.value)
                                    }
                                    className="w-full rounded-xl border-2 border-black bg-gray-50 px-4 py-3 text-sm font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0"
                                >
                                    <option value={5}>5 Flashcards</option>
                                    <option value={10}>10 Flashcards</option>
                                    <option value={15}>15 Flashcards</option>
                                    <option value={20}>20 Flashcards</option>
                                </select>
                            </div>

                            {/* INCLUDE QUIZ CHECKBOX */}
                            <div className="flex items-center space-x-3 pt-6">
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
                                    className="h-6 w-6 rounded-lg border-2 border-black text-[#FF6B35] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:ring-0"
                                />
                                <label
                                    htmlFor="include_quiz"
                                    className="cursor-pointer text-xs font-black text-black sm:text-sm"
                                >
                                    Generate interactive quiz questions
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#FF6B35] px-8 py-4 text-base font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50"
                        >
                            <span>
                                {processing
                                    ? 'Generating Pack...'
                                    : 'Generate Revision Pack'}
                            </span>
                            <span>⚡</span>
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
