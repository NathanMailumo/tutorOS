import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ResourceIndex({ resources = [] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Resources" />
            <div className="p-6 lg:p-10">
                <h1 className="text-3xl font-black text-[#121212]">
                    Resources
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    {resources.length} resources available.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
