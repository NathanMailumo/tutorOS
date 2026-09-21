import React from 'react';
import { useForm } from '@inertiajs/react';

export default function PublicResourceForm({ onSuccess, onClose }) {

    const [data, setData, post, processing, errors] = useForm({
        course_name : '',
        resource_type : 'public',
        invite_emails : ''
    })

    const submit = (e)=>{
        e.preventDefault();
    
        post(route('resources.store'), {
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
                if (onClose) onClose();
            },
        });
    }

    return (
        <form onSubmit={submit} className="mt-4 space-y-4">
            <div>
                <label className="mb-1.5 block text-xs font-black uppercase text-[#121212]">
                    Course / Space Name <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={data.course_name}
                    onChange={(e) => setData('course_name', e.target.value)}
                    placeholder="e.g. SEN 307 - Software Design"
                    className="w-full rounded-xl border-2 border-black bg-gray-50 px-3.5 py-2.5 text-xs font-bold text-[#121212] placeholder-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-xs font-black uppercase text-[#121212]">
                    Invite Collaborators (Email)
                </label>
                <input
                    type="text"
                    value={data.invite_emails}
                    onChange={(e) => setData('invite_emails', e.target.value)}
                    placeholder="student1@uni.edu, student2@uni.edu"
                    className="w-full rounded-xl border-2 border-black bg-gray-50 px-3.5 py-2.5 text-xs font-bold text-[#121212] placeholder-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:outline-none focus:ring-0"
                />
                <p className="mt-1 text-[10px] font-bold text-gray-500">
                    Separate multiple email addresses with commas.
                </p>
            </div>

            <div className="flex flex-col-reverse items-stretch justify-end gap-2 border-t-2 border-black/10 pt-3 sm:flex-row sm:items-center sm:gap-2.5">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl border-2 border-black bg-white px-4 py-2.5 text-center text-xs font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none sm:w-auto sm:py-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl border-2 border-black bg-[#2ED573] px-5 py-2.5 text-center text-xs font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#2bc469] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50 sm:w-auto sm:py-2"
                >
                    {processing ? 'Creating & Sending...' : 'Create & Invite'}
                </button>
            </div>
        </form>
    );
}
