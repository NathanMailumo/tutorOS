import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Register() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleSignUp = async () => {
        if (!isLoaded) return;

        setError('');
        setLoading(true);

        try {
            await signUp.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: `${window.location.origin}/sso-callback`,
                redirectUrlComplete: `${window.location.origin}/sso-callback?complete=1`,
            });
        } catch (err) {
            setLoading(false);
            setError(
                err.errors?.[0]?.message ||
                    'Google registration could not be started. Please try again.',
            );
        }
    };

    const syncAndRedirect = (clerkUserId, userEmail, fullName) => {
        if (!clerkUserId || !userEmail) {
            setError('Google registration did not return a complete account.');
            return;
        }

        router.post(
            '/clerk-sync',
            {
                clerk_id: clerkUserId,
                email: userEmail,
                name: fullName || userEmail.split('@')[0],
                profile_image_url: null,
            },
            {
                onError: (errors) => {
                    setError(
                        errors.email ||
                            errors.clerk_id ||
                            'Unable to finish creating your account. Please try again.',
                    );
                },
                onSuccess: () => {
                    window.location.assign('/dashboard');
                },
            },
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        setError('');
        setLoading(true);

        try {
            await signUp.create({
                emailAddress: email,
                password,
                firstName,
                lastName,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            });

            setPendingVerification(true);
        } catch (err) {
            setError(
                err.errors?.[0]?.message ||
                    'Registration failed. Please check your details.',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        setError('');
        setLoading(true);

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                const userId = result.createdUserId || signUp.createdUserId;
                const fullName = `${firstName} ${lastName}`.trim();
                syncAndRedirect(userId, email, fullName);
            } else {
                setError(`Verification status: ${result.status}`);
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Invalid verification code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex min-h-screen flex-col"
            style={{
                backgroundColor: '#ffffff',
                backgroundImage:
                    'radial-gradient(rgba(0, 0, 0, 0.15) 1.5px, transparent 1.5px)',
                backgroundSize: '16px 16px',
            }}
        >
            <Head title="Register" />
            <Navbar />

            <div className="flex flex-1 flex-col justify-center p-4 sm:p-6 lg:p-8">
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

                        {!pendingVerification ? (
                            <>
                                <button
                                    type="button"
                                    onClick={handleGoogleSignUp}
                                    disabled={loading || !isLoaded}
                                    className="border-3 flex w-full items-center justify-center gap-3 rounded-xl border-black bg-white p-3.5 text-sm font-black uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-gray-100 active:translate-x-1 active:translate-y-1 active:shadow-none"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                        />
                                    </svg>
                                    Continue with Google
                                </button>

                                <div className="my-6 flex items-center gap-3">
                                    <div className="h-[2px] flex-1 bg-black"></div>
                                    <span className="text-xs font-black uppercase text-black">
                                        OR
                                    </span>
                                    <div className="h-[2px] flex-1 bg-black"></div>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="mb-1 block text-xs font-black uppercase text-black">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                                required
                                                className="border-3 w-full rounded-xl border-black p-3 text-sm font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-red-50"
                                                placeholder="John"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-xs font-black uppercase text-black">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                                required
                                                className="border-3 w-full rounded-xl border-black p-3 text-sm font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-red-50"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-xs font-black uppercase text-black">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                            className="border-3 w-full rounded-xl border-black p-3 text-sm font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-red-50"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-xs font-black uppercase text-black">
                                            Password
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
                                        disabled={loading || !isLoaded}
                                        className="border-3 w-full rounded-xl border-black bg-red-600 p-3.5 text-sm font-black uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-red-700 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
                                    >
                                        {loading
                                            ? 'Creating Account...'
                                            : 'Register'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <form
                                onSubmit={handleVerifyCode}
                                className="space-y-4"
                            >
                                <div className="text-center">
                                    <h2 className="text-base font-black uppercase text-black">
                                        Verify Your Email
                                    </h2>
                                    <p className="mt-1 text-xs font-bold text-gray-700">
                                        We sent a 6-digit code to <br />
                                        <span className="font-black text-black">
                                            {email}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) =>
                                            setCode(e.target.value)
                                        }
                                        required
                                        maxLength={6}
                                        className="border-3 w-full rounded-xl border-black p-3 text-center text-2xl font-black tracking-widest text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-red-50"
                                        placeholder="123456"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="border-3 w-full rounded-xl border-black bg-red-600 p-3.5 text-sm font-black uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-red-700 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
                                >
                                    {loading
                                        ? 'Verifying...'
                                        : 'Complete Registration'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPendingVerification(false)
                                    }
                                    className="w-full text-center text-xs font-black uppercase text-black underline hover:text-red-600"
                                >
                                    ← Back
                                </button>
                            </form>
                        )}

                        <div className="mt-6 text-center text-xs font-bold text-black">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-black underline hover:text-red-600"
                            >
                                Log in here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
