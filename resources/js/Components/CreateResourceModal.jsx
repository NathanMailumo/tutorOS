import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import PrivateResource from './PrivateResource';
import PublicResource from './PublicResource';

export default function CreateResourceModal({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('private'); // 'private' | 'public'

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        type: 'private',
        invite_emails: '',
    });

    if (!isOpen) return null;

    const handleTabSwitch = (type) => {
        setActiveTab(type);
        setData('type', type);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route().has('resources.store') ? route('resources.store') : '#', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            {/* MODAL CARD */}
            <div className="border-3 relative w-full max-w-md rounded-3xl border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* HEADER & CLOSE BUTTON */}
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <h2 className="flex items-center gap-2 text-lg font-black text-[#121212]">
                        <span>Create Resource Space</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-black bg-red-500 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600"
                    >
                        ✕
                    </button>
                </div>

                {/* TYPE SELECTOR TABS */}
                <div className="mt-4 flex gap-2 rounded-2xl border-2 border-black bg-gray-100 p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <button
                        type="button"
                        onClick={() => handleTabSwitch('private')}
                        className={`flex-1 rounded-xl border-2 py-2 text-xs font-black transition-all ${
                            activeTab === 'private'
                                ? 'border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                : 'border-transparent text-gray-500 hover:text-black'
                        }`}
                    >
                        🔒 Private Space
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabSwitch('public')}
                        className={`flex-1 rounded-xl border-2 py-2 text-xs font-black transition-all ${
                            activeTab === 'public'
                                ? 'border-black bg-[#2ED573] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                : 'border-transparent text-gray-500 hover:text-black'
                        }`}
                    >
                        🌐 Public / Shared
                    </button>
                </div>

                {/* TAB CONTENT */}
                {activeTab === 'private' ? (
                    <PrivateResource
                        data={data}
                        setData={setData}
                        onSubmit={handleSubmit}
                        onClose={onClose}
                        processing={processing}
                    />
                ) : (
                    <PublicResource
                        data={data}
                        setData={setData}
                        onSubmit={handleSubmit}
                        onClose={onClose}
                        processing={processing}
                    />
                )}
            </div>
        </div>
    );
}
