import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account" />

            <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
                <div className="w-full max-w-md rounded-3xl border-2 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-10">
                    {/* Header Logo */}
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#FF6B35] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            🎓
                        </div>
                        <span className="text-xl font-black text-[#121212]">
                            TutorOS
                        </span>
                    </div>

                    {/* Form Titles */}
                    <h1 className="text-3xl font-black tracking-tight text-[#121212]">
                        Create account.
                    </h1>
                    <p className="mb-8 mt-1 text-sm font-medium text-gray-500">
                        Join TutorOS and start teaching smarter.
                    </p>

                    <form onSubmit={submit} className="space-y-4">
                        {/* NAME FIELD */}
                        <div>
                            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-700">
                                FULL NAME
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                placeholder="Nathan Clarke"
                                className="w-full rounded-2xl border-2 border-black px-4 py-3.5 font-medium text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-0"
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* EMAIL FIELD */}
                        <div>
                            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-700">
                                EMAIL
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="nathan@ucl.ac.uk"
                                className="w-full rounded-2xl border-2 border-black px-4 py-3.5 font-medium text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-0"
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

                        {/* PASSWORD FIELD */}
                        <div>
                            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-700">
                                PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    placeholder="Create a password"
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

                        {/* CONFIRM PASSWORD FIELD */}
                        <div>
                            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-700">
                                CONFIRM PASSWORD
                            </label>
                            <input
                                id="password_confirmation"
                                type={showPassword ? 'text' : 'password'}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="Confirm password"
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

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#FF6B35] py-4 text-sm font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                            <span>Create Account</span>
                            <span>→</span>
                        </button>
                    </form>

                    {/* FOOTER LINKS */}
                    <div className="mt-8 text-center text-xs font-semibold text-gray-500">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="font-bold text-[#FF6B35] underline underline-offset-2"
                        >
                            Sign In
                        </Link>
                    </div>

                    <div className="mt-4 text-center">
                        <Link
                            href="/"
                            className="text-xs font-medium text-gray-500 hover:text-black"
                        >
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
