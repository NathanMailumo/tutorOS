import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function PrivateResourceSpace({ resource }) {
    return (
        <AuthenticatedLayout>
            <Head title={resource?.course_name ? `${resource.course_name} - Private Space` : 'Private Resource'} />

            <div className="p-6 sm:p-10">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-red-500 px-3 py-1 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <span>🔒</span>
                        <span>Private Space</span>
                    </div>

                    <h1 className="text-3xl font-black text-[#121212]">
                        {resource?.course_name || 'welcome to your private resource page'}
                    </h1>

                    <p className="text-sm font-medium text-gray-600">
                        Compile all your school resources in one all accessible
                        space. accessible on to you
                    </p>

                    <button className="rounded-xl border-2 border-black bg-red-600 px-5 py-2.5 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-red-700 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
                        add Resources
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
