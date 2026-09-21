import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function PrivateResourceSpace() {
    return (
        <>
            <AuthenticatedLayout>
                <h1>welcome to your private resource page</h1>
                <p>
                    Compile all your school resources in one all accessible
                    space. accessible on to you
                </p>
                <button>add Resources</button>
            </AuthenticatedLayout>
        </>
    );
}
