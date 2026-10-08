import React, { useEffect, useRef, useState } from 'react';
import { AuthenticateWithRedirectCallback, useUser } from '@clerk/clerk-react';
import { Head, router } from '@inertiajs/react';

export default function SSOCallback() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [error, setError] = useState('');
    const syncStarted = useRef(false);
    const isComplete = new URLSearchParams(window.location.search).has(
        'complete',
    );

    useEffect(() => {
        if (
            isComplete &&
            isLoaded &&
            isSignedIn &&
            user &&
            !syncStarted.current
        ) {
            syncStarted.current = true;
            const email = user.primaryEmailAddress?.emailAddress;
            const fullName =
                user.fullName || user.firstName || email?.split('@')[0];

            if (!email) {
                setError('Google did not return an email address.');
                return;
            }

            router.post(
                '/clerk-sync',
                {
                    clerk_id: user.id,
                    email: email,
                    name: fullName,
                    profile_image_url: user.imageUrl || null,
                },
                {
                    onSuccess: () => {
                        window.location.assign('/dashboard');
                    },
                    onError: (errors) => {
                        console.error('Sync failed:', errors);
                        setError(
                            errors.email ||
                                errors.clerk_id ||
                                'Unable to finish signing you in. Please try again.',
                        );
                    },
                },
            );
        }
    }, [isComplete, isLoaded, isSignedIn, user]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-black">
            <Head title="Authenticating..." />
            {!isComplete && <AuthenticateWithRedirectCallback />}
            {error && (
                <p className="absolute text-center text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}
