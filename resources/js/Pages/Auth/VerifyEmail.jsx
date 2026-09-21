import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verify Email" />

            <div className="flex min-h-[80vh] items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
                <div className="w-full max-w-md rounded-2xl sm:rounded-3xl border-2 border-black bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-10">
                    <div className="mb-6 sm:mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#FF6B35] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            ✉️
                        </div>
                        <span className="text-xl font-black text-[#121212]">
                            TutorOS
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#121212]">
                        Verify email.
                    </h1>
                    <p className="mb-6 sm:mb-8 mt-2 text-xs sm:text-sm font-medium leading-relaxed text-gray-500">
                        Thanks for signing up! Before getting started, please
                        verify your email address by clicking on the link we
                        just emailed to you.
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 rounded-2xl border-2 border-black bg-green-100 p-4 text-xs font-bold text-green-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            A new verification link has been sent to the email
                            address you provided during registration.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#FF6B35] py-4 text-sm font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                            <span>Resend Verification Email</span>
                            <span>→</span>
                        </button>

                        <div className="flex items-center justify-between pt-4">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-xs font-bold text-gray-500 underline hover:text-black"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
