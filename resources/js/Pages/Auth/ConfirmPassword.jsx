import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="flex min-h-[80vh] items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
                <div className="w-full max-w-md rounded-2xl sm:rounded-3xl border-2 border-black bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-10">
                    <div className="mb-6 sm:mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#FF6B35] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            🛡️
                        </div>
                        <span className="text-xl font-black text-[#121212]">
                            TutorOS
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#121212]">
                        Security Check.
                    </h1>
                    <p className="mb-6 sm:mb-8 mt-1 text-xs sm:text-sm font-medium leading-relaxed text-gray-500">
                        This is a secure area of the application. Please confirm
                        your password before continuing.
                    </p>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-700">
                                PASSWORD
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Confirm password"
                                className="w-full rounded-2xl border-2 border-black px-4 py-3.5 font-medium text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-0"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#FF6B35] py-4 text-sm font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                            <span>Confirm Password</span>
                            <span>→</span>
                        </button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
