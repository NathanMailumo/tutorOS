import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { Head, Link } from '@inertiajs/react';

export default function ForgotPassword() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Send reset code to email via Clerk
    const handleSendCode = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        setError('');
        setLoading(true);

        try {
            await signIn.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            });
            setSuccessfulCreation(true);
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Failed to send reset code.');
        } finally {
            setLoading(false);
        }
    };

    // Verify code and set new password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        setError('');
        setLoading(true);

        try {
            const result = await signIn.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                window.location.href = '/dashboard';
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Invalid code or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex min-h-screen flex-col justify-center p-4 sm:p-6 lg:p-8"
            style={{
                backgroundColor: '#ffffff',
                backgroundImage:
                    'radial-gradient(rgba(0, 0, 0, 0.15) 1.5px, transparent 1.5px)',
                backgroundSize: '16px 16px',
            }}
        >
            <Head title="Reset Password" />

            <div className="mx-auto w-full max-w-md">
                <div className="mb-6 flex flex-col items-center justify-center gap-2 text-center">
                    <div className="inline-block rounded-lg border-4 border-black bg-white px-4 py-1 text-2xl font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        TOS
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-black">
                        TutorOS
                    </h1>
                </div>

                <div className="rounded-2xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:p-8">
                    {error && (
                        <div className="mb-6 rounded-xl border-2 border-black bg-red-100 p-3 text-xs font-black text-red-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {error}
                        </div>
                    )}

                    {!successfulCreation ? (
                        <form onSubmit={handleSendCode} className="space-y-4">
                            <p className="text-xs font-bold text-gray-600">
                                Enter your email address to receive a password
                                reset code.
                            </p>
                            <div>
                                <label className="mb-1 block text-xs font-black uppercase text-black">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border-3 w-full rounded-xl border-black p-3 text-sm font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-red-50"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="border-3 w-full rounded-xl border-black bg-red-600 p-3.5 text-sm font-black uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-red-700 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
                            >
                                {loading
                                    ? 'Sending Code...'
                                    : 'Send Reset Code'}
                            </button>
                        </form>
                    ) : (
                        <form
                            onSubmit={handleResetPassword}
                            className="space-y-4"
                        >
                            <div>
                                <label className="mb-1 block text-xs font-black uppercase text-black">
                                    Reset Code
                                </label>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                    className="border-3 w-full rounded-xl border-black p-3 text-center text-lg font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-red-50"
                                    placeholder="123456"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-black uppercase text-black">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="border-3 w-full rounded-xl border-black p-3 text-sm font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-red-50"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="border-3 w-full rounded-xl border-black bg-red-600 p-3.5 text-sm font-black uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-red-700 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
                            >
                                {loading
                                    ? 'Resetting...'
                                    : 'Reset Password & Log In'}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center text-xs font-bold text-black">
                        <Link
                            href="/login"
                            className="font-black underline hover:text-red-600"
                        >
                            ← Back to Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
