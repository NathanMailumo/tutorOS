import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    // Profile Information Form State
    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
    });

    // Password Update Form State
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'));
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'));
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-[#F4F0EA] p-6 font-mono text-black md:p-12">
                <Head title="TutorOS - Edit Profile" />

                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Header Header Banner */}
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

                    {/* Section 1: Update Account Info */}
                    <div className="border-4 border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="mb-6 border-b-4 border-black pb-3 text-xl font-black uppercase">
                            Profile Information
                        </h2>

                        <form onSubmit={submitProfile} className="space-y-6">
                            <div>
                                <label className="mb-2 block text-xs font-black uppercase">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            'name',
                                            e.target.value,
                                        )
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

                            <div>
                                <label className="mb-2 block text-xs font-black uppercase">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            'email',
                                            e.target.value,
                                        )
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

                            <div className="flex items-center gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="border-4 border-black bg-yellow-300 px-6 py-3 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-1 hover:translate-y-1 disabled:opacity-50"
                                >
                                    {profileForm.processing
                                        ? 'Saving...'
                                        : 'Save Changes'}
                                </button>

                                {profileForm.recentlySuccessful && (
                                    <span className="border-2 border-black bg-green-200 px-3 py-1 text-xs font-bold uppercase text-green-700">
                                        Saved!
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Section 2: Change Password */}
                    <div className="border-4 border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="mb-6 border-b-4 border-black pb-3 text-xl font-black uppercase">
                            Update Password
                        </h2>

                        <form onSubmit={submitPassword} className="space-y-6">
                            <div>
                                <label className="mb-2 block text-xs font-black uppercase">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.current_password}
                                    onChange={(e) =>
                                        passwordForm.setData(
                                            'current_password',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full border-4 border-black bg-[#F4F0EA] p-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {passwordForm.errors.current_password && (
                                    <p className="mt-1 text-xs font-bold text-red-600">
                                        {passwordForm.errors.current_password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-black uppercase">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password}
                                    onChange={(e) =>
                                        passwordForm.setData(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full border-4 border-black bg-[#F4F0EA] p-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {passwordForm.errors.password && (
                                    <p className="mt-1 text-xs font-bold text-red-600">
                                        {passwordForm.errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-black uppercase">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={
                                        passwordForm.data.password_confirmation
                                    }
                                    onChange={(e) =>
                                        passwordForm.setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full border-4 border-black bg-[#F4F0EA] p-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="border-4 border-black bg-[#D8B4FE] px-6 py-3 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-1 hover:translate-y-1 disabled:opacity-50"
                                >
                                    {passwordForm.processing
                                        ? 'Updating...'
                                        : 'Update Password'}
                                </button>

                                {passwordForm.recentlySuccessful && (
                                    <span className="border-2 border-black bg-green-200 px-3 py-1 text-xs font-bold uppercase text-green-700">
                                        Password Updated!
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
