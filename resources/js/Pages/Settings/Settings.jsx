import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { CreditCard, Download, ShieldAlert } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Settings() {
    const [defaultFormat, setDefaultFormat] = useState('pdf');
    // const [apiKey] = useState('tos_live_9f83a21bc4e08a91');

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-[#fffdfa] bg-[radial-gradient(#000000_1px,transparent_1px)] text-black [background-size:16px_16px]">
                <Head title="Settings - TutorOS" />

                <div className="mx-auto max-w-5xl space-y-8 p-6 md:p-10">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b-4 border-black pb-6">
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tight">
                                System Settings
                            </h1>
                            <p className="mt-1 font-mono text-sm text-gray-700">
                                Manage workspace parameters, subscription
                                status, and developer integrations.
                            </p>
                        </div>

                        <Link
                            href={route('dashboard')}
                            className="border-2 border-black bg-yellow-300 px-4 py-2 text-sm font-black uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>

                    {/* SECTION 1: SUBSCRIPTION & PAYMENT PLAN */}
                    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-8">
                        <div className="mb-6 flex items-center gap-3 border-b-2 border-black pb-4">
                            <CreditCard className="h-6 w-6 text-purple-600" />
                            <h2 className="text-2xl font-black uppercase">
                                Subscription & Billing
                            </h2>
                        </div>

                        <div className="border-3 flex flex-col items-start justify-between gap-6 border-black bg-purple-100 p-6 text-black md:flex-row md:items-center">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-black uppercase">
                                        Free Scholar Tier
                                    </span>
                                    <span className="border border-black bg-yellow-300 px-2.5 py-1 text-xs font-black uppercase text-black">
                                        Active Plan
                                    </span>
                                </div>
                                <p className="max-w-xl font-mono text-sm text-gray-800">
                                    Access standard OpenRouter generation
                                    models, unlimited local resource spaces, and
                                    manual note exports.
                                </p>
                            </div>

                            <div className="flex w-full flex-col items-center gap-3 sm:flex-row md:w-auto">
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-900">
                                    Pro Tier ($9.99/mo) Coming Soon
                                </span>
                                <button
                                    disabled
                                    className="w-full cursor-not-allowed border-2 border-black bg-black px-6 py-3 text-sm font-black uppercase text-white opacity-70 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:w-auto"
                                >
                                    Upgrade Plan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: EXPORT PREFERENCES */}
                    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-8">
                        <div className="mb-6 flex items-center gap-3 border-b-2 border-black pb-4">
                            <Download className="h-6 w-6 text-emerald-600" />
                            <h2 className="text-2xl font-black uppercase">
                                Study Export Preferences
                            </h2>
                        </div>

                        <div className="border-3 flex flex-col items-start justify-between gap-6 border-black bg-emerald-50 p-6 text-black md:flex-row md:items-center">
                            <div className="space-y-1">
                                <h3 className="text-lg font-black uppercase">
                                    Default Download Format
                                </h3>
                                <p className="font-mono text-xs text-gray-700">
                                    Select default format for generated study
                                    packs, flashcards, and sessions.
                                </p>
                            </div>

                            <div className="flex w-full items-center gap-3 md:w-auto">
                                {['pdf', 'markdown', 'json'].map((fmt) => (
                                    <button
                                        key={fmt}
                                        onClick={() => setDefaultFormat(fmt)}
                                        className={`border-2 border-black px-4 py-2 text-xs font-black uppercase transition-all ${
                                            defaultFormat === fmt
                                                ? '-translate-y-0.5 bg-emerald-300 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white text-black hover:bg-gray-100'
                                        }`}
                                    >
                                        .{fmt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: API KEYS */}
                    {/* <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-8">
                        <div className="mb-6 flex items-center gap-3 border-b-2 border-black pb-4">
                            <Key className="h-6 w-6 text-cyan-600" />
                            <h2 className="text-2xl font-black uppercase">
                                API & Integrations
                            </h2>
                        </div>

                        <div className="border-3 flex flex-col items-start justify-between gap-6 border-black bg-cyan-50 p-6 text-black md:flex-row md:items-center">
                            <div className="space-y-1">
                                <h3 className="text-lg font-black uppercase">
                                    TutorOS Secret API Key
                                </h3>
                                <p className="font-mono text-xs text-gray-700">
                                    Connect external study workflows or browser
                                    extensions using your personal token.
                                </p>
                            </div>

                            <div className="flex w-full items-center gap-2 font-mono text-xs md:w-auto">
                                <input
                                    type="password"
                                    readOnly
                                    value={apiKey}
                                    className="w-full border-2 border-black bg-white p-2.5 font-bold text-black focus:outline-none md:w-56"
                                />
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(apiKey)
                                    }
                                    className="border-2 border-black bg-cyan-300 px-4 py-2.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div> */}

                    {/* SECTION 4: DATA MAINTENANCE */}
                    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-8">
                        <div className="mb-6 flex items-center gap-3 border-b-2 border-black pb-4">
                            <ShieldAlert className="h-6 w-6 text-red-600" />
                            <h2 className="text-2xl font-black uppercase text-red-600">
                                Data Maintenance
                            </h2>
                        </div>

                        <div className="border-3 flex flex-col items-start justify-between gap-6 border-red-600 bg-red-50 p-6 text-black md:flex-row md:items-center">
                            <div className="space-y-1">
                                <h3 className="text-lg font-black uppercase text-red-600">
                                    Clear Local AI Generation Cache
                                </h3>
                                <p className="font-mono text-xs text-red-700">
                                    Force reset cached OpenRouter session
                                    outputs and re-index resource spaces.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="w-full border-2 border-red-600 bg-red-600 px-6 py-3 text-xs font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-red-700 md:w-auto"
                            >
                                Purge Cache
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
