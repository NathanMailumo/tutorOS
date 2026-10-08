import { useUser } from '@clerk/clerk-react';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';

export default function ClerkSessionSync() {
    const { user, isSignedIn, isLoaded } = useUser();
    const { props } = usePage();
    const laravelUser = props.auth?.user;

    useEffect(() => {
        // Sync only if Clerk is logged in AND Laravel session doesn't match current Clerk ID
        if (
            isLoaded &&
            isSignedIn &&
            user &&
            laravelUser?.clerk_id !== user.id
        ) {
            axios
                .post('/clerk-sync', {
                    clerk_id: user.id,
                    email: user.primaryEmailAddress?.emailAddress,
                    name: user.fullName || user.firstName,
                    profile_image_url: user.imageUrl,
                })
                .then(() => {
                    // Optional: reload Inertia props after initial sync
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Failed to sync user with Laravel:', error);
                });
        }
    }, [isLoaded, isSignedIn, user, laravelUser]);

    return null;
}
