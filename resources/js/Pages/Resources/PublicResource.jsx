import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function PublicResourceSpace() {
    return (
        <>
            <AuthenticatedLayout>
                <h1>Welcome to your public resource page</h1>
                <p>
                    Compile all your school resources in one all accessible
                    space, also visible to invited accounts
                </p>
                <button>add Resources</button>
            </AuthenticatedLayout>
        </>
    );
}
