import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ResetPassword({ token, email }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Set New Password" />

            <div className="flex min-h-[80vh] items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
                <div className="w-full max-w-md rounded-2xl sm:rounded-3xl border-2 border-black bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-10">
                    <div className="mb-6 sm:mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#FF6B35] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            🔒
                        </div>
                        <span className="text-xl font-black text-[#121212]">
                            TutorOS
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#121212]">
                        New password.
                    </h1>
                    <p className="mb-6 sm:mb-8 mt-1 text-xs sm:text-sm font-medium text-gray-500">
                        Enter your email and create a new secure password.
                    </p>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-700">
                                EMAIL
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full rounded-2xl border-2 border-black px-4 py-3.5 font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-700">
                                NEW PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    placeholder="Enter new password"
                                    className="w-full rounded-2xl border-2 border-black px-4 py-3.5 pr-12 font-medium text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-0"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                                >
                                    👁️
                                </button>
                            </div>
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-700">
                                CONFIRM NEW PASSWORD
                            </label>
                            <input
                                id="password_confirmation"
                                type={showPassword ? 'text' : 'password'}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="Confirm new password"
                                className="w-full rounded-2xl border-2 border-black px-4 py-3.5 font-medium text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-0"
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#FF6B35] py-4 text-sm font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                            <span>Update Password</span>
                            <span>→</span>
                        </button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
