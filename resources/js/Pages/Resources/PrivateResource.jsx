import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function PrivateResourceSpace({ resource }) {
    return (
        <AuthenticatedLayout>
            <Head
                title={
                    resource?.course_name
                        ? `${resource.course_name} - Private Space`
                        : 'Private Resource'
                }
            />

            <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden bg-[#fafafa] px-6 py-12 md:min-h-screen">
                <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#c7c7c7_1px,transparent_1px)] [background-size:18px_18px]" />
                <div className="relative flex w-full max-w-2xl flex-col items-center space-y-5 text-center">
                    <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-red-500 px-3 py-1 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <span>🔒</span>
                        <span>Private Space</span>
                    </div>

                    <h1 className="w-full text-center text-3xl font-black tracking-tight text-[#121212] sm:text-4xl">
                        {resource?.course_name ||
                            'welcome to your private resource page'}
                    </h1>

                    <p className="w-full max-w-md text-center text-sm font-medium leading-6 text-gray-600">
                        Compile all your school resources in one accessible
                        space, just for you.
                    </p>

                    <button className="rounded-xl border-2 border-black bg-red-600 px-5 py-2.5 text-xs font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-red-700 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
                        Add Resource
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
