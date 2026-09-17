import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
                <div className="w-full max-w-md rounded-3xl border-2 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-10">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#FF6B35] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            🔑
                        </div>
                        <span className="text-xl font-black text-[#121212]">
                            TutorOS
                        </span>
                    </div>

                    <h1 className="text-3xl font-black tracking-tight text-[#121212]">
                        Reset password.
                    </h1>
                    <p className="mb-8 mt-1 text-sm font-medium leading-relaxed text-gray-500">
                        Forgot your password? No problem. Just enter your email
                        and we'll send you a password reset link.
                    </p>

                    {status && (
                        <div className="mb-6 rounded-2xl border-2 border-black bg-green-100 p-4 text-xs font-bold text-green-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
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

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#FF6B35] py-4 text-sm font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                            <span>Send Password Reset Link</span>
                            <span>→</span>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link
                            href={route('login')}
                            className="text-xs font-bold text-gray-500 hover:text-black"
                        >
                            ← Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
