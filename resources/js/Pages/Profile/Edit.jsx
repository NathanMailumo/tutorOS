import React, { useState, useRef } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const PRESET_AVATARS = [
    { id: 'bot-1', label: 'Cosmo Bot', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cosmo' },
    { id: 'bot-2', label: 'Gizmo Bot', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Gizmo' },
    { id: 'bot-3', label: 'Spark Bot', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Circuit' },
    { id: 'adv-1', label: 'Explorer Felix', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix' },
    { id: 'adv-2', label: 'Explorer Maya', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Maya' },
    { id: 'adv-3', label: 'Explorer Sam', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sammy' },
    { id: 'per-1', label: 'Scholar Alex', url: 'https://api.dicebear.com/7.x/personas/svg?seed=Alex' },
    { id: 'per-2', label: 'Scholar Zoe', url: 'https://api.dicebear.com/7.x/personas/svg?seed=Zoe' },
    { id: 'per-3', label: 'Scholar Leo', url: 'https://api.dicebear.com/7.x/personas/svg?seed=Leo' },
    { id: 'fun-1', label: 'Super Star', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Star' },
    { id: 'fun-2', label: 'Cool Cat', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Chill' },
    { id: 'fun-3', label: 'Sunny Joy', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Sunny' },
];

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const fileInputRef = useRef(null);

    // Modal state for avatar selector popup
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    // Live preview state (file blob URL or preset avatar URL or current user image)
    const [previewUrl, setPreviewUrl] = useState(user?.profile_image_url || null);

    // Profile Form State
    const profileForm = useForm({
        name: user?.name || '',
        email: user?.email || '',
        profile_image: null,
        avatar_url: '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            profileForm.setData((prev) => ({
                ...prev,
                profile_image: file,
                avatar_url: '',
            }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSelectPreset = (url) => {
        profileForm.setData((prev) => ({
            ...prev,
            avatar_url: url,
            profile_image: null,
        }));
        setPreviewUrl(url);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setIsAvatarModalOpen(false);
    };

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-[#F4F0EA] p-6 font-mono text-black md:p-12">
                <Head title="TutorOS - Edit Profile" />

                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Header Banner */}
                    <div className="flex items-center justify-between border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div>
                            <span className="border-2 border-black bg-[#50E3C2] px-2 py-1 text-xs font-bold uppercase tracking-widest">
                                ACCOUNT SETTINGS
                            </span>
                            <h1 className="mt-2 text-3xl font-extrabold uppercase">
                                USER PROFILE
                            </h1>
                        </div>
                        <a
                            href="/dashboard"
                            className="border-4 border-black bg-[#FF5050] px-6 py-3 font-extrabold uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-1 hover:translate-y-1"
                        >
                            ← Dashboard
                        </a>
                    </div>

                    {/* Section: Profile Information & Avatar */}
                    <div className="border-4 border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="mb-6 border-b-4 border-black pb-3 text-xl font-black uppercase">
                            Profile Information
                        </h2>

                        <form onSubmit={submitProfile} className="space-y-6">
                            {/* Avatar / Profile Picture Row */}
                            <div className="border-4 border-black bg-[#F4F0EA] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <label className="mb-3 block text-xs font-black uppercase tracking-wider">
                                    Profile Avatar
                                </label>
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                                    {/* Avatar Preview */}
                                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        {previewUrl ? (
                                            <img
                                                src={previewUrl}
                                                alt="Avatar Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-3xl font-black">
                                                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Avatar Actions */}
                                    <div className="flex flex-wrap items-center gap-3">
                                        {/* Button: Open Preset Popup */}
                                        <button
                                            type="button"
                                            onClick={() => setIsAvatarModalOpen(true)}
                                            className="border-3 border-4 border-black bg-[#50E3C2] px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
                                        >
                                            Choose Avatar Preset
                                        </button>

                                        {/* Button: Upload Custom Picture */}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-4 border-black bg-yellow-300 px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
                                        >
                                            Upload Photo
                                        </button>

                                        {/* Hidden File Input */}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/png,image/jpeg,image/webp,image/gif"
                                            className="hidden"
                                        />

                                        {/* Selected state indicator */}
                                        {profileForm.data.profile_image && (
                                            <span className="border-2 border-black bg-white px-2 py-1 text-[11px] font-bold text-gray-700">
                                                File ready to upload ({profileForm.data.profile_image.name})
                                            </span>
                                        )}
                                        {profileForm.data.avatar_url && (
                                            <span className="border-2 border-black bg-white px-2 py-1 text-[11px] font-bold text-gray-700">
                                                Preset avatar selected
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {profileForm.errors.profile_image && (
                                    <p className="mt-2 text-xs font-bold text-red-600">
                                        {profileForm.errors.profile_image}
                                    </p>
                                )}
                            </div>

                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-xs font-black uppercase">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={(e) =>
                                        profileForm.setData('name', e.target.value)
                                    }
                                    className="w-full border-4 border-black bg-[#F4F0EA] p-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                                {profileForm.errors.name && (
                                    <p className="mt-1 text-xs font-bold text-red-600">
                                        {profileForm.errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Address */}
                            <div>
                                <label className="mb-2 block text-xs font-black uppercase">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={(e) =>
                                        profileForm.setData('email', e.target.value)
                                    }
                                    className="w-full border-4 border-black bg-[#F4F0EA] p-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                                {profileForm.errors.email && (
                                    <p className="mt-1 text-xs font-bold text-red-600">
                                        {profileForm.errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Submit Actions */}
                            <div className="flex items-center gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="border-4 border-black bg-yellow-300 px-6 py-3 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-1 hover:translate-y-1 disabled:opacity-50"
                                >
                                    {profileForm.processing ? 'Saving...' : 'Save Changes'}
                                </button>

                                {profileForm.recentlySuccessful && (
                                    <span className="border-2 border-black bg-green-200 px-3 py-1 text-xs font-bold uppercase text-green-700">
                                        Saved!
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* AVATAR OPTIONS POPUP MODAL */}
            {isAvatarModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 font-mono">
                    <div className="relative w-full max-w-2xl border-4 border-black bg-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:p-8">
                        {/* Modal Header */}
                        <div className="mb-6 flex items-center justify-between border-b-4 border-black pb-4">
                            <div>
                                <span className="border-2 border-black bg-[#D8B4FE] px-2 py-0.5 text-xs font-bold uppercase">
                                    Avatars
                                </span>
                                <h3 className="mt-1 text-xl font-black uppercase">
                                    Choose An Avatar
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAvatarModalOpen(false)}
                                className="flex h-9 w-9 items-center justify-center border-3 border-2 border-black bg-red-400 font-black text-black hover:bg-red-500"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Avatars Grid */}
                        <div className="grid max-h-[60vh] grid-cols-3 gap-4 overflow-y-auto p-1 sm:grid-cols-4">
                            {PRESET_AVATARS.map((avatar) => (
                                <button
                                    key={avatar.id}
                                    type="button"
                                    onClick={() => handleSelectPreset(avatar.url)}
                                    className="group flex flex-col items-center justify-center rounded-xl border-3 border-2 border-black bg-[#F4F0EA] p-3 text-center transition-all hover:-translate-y-1 hover:border-black hover:bg-yellow-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-black bg-white p-1">
                                        <img
                                            src={avatar.url}
                                            alt={avatar.label}
                                            className="h-full w-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="mt-2 text-[11px] font-black uppercase tracking-tight text-neutral-800">
                                        {avatar.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t-4 border-black pt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAvatarModalOpen(false);
                                    fileInputRef.current?.click();
                                }}
                                className="border-2 border-black bg-yellow-300 px-4 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                            >
                                Upload From Computer Instead
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsAvatarModalOpen(false)}
                                className="border-2 border-black bg-gray-200 px-4 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
