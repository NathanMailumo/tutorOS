import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function InviteModal({
    isOpen,
    onClose,
    resourceId,
    inviteLink = '',
}) {
    const [activeTab, setActiveTab] = useState('email');
    const [emailInput, setEmailInput] = useState('');
    const [emailTags, setEmailTags] = useState([]);
    const [validationError, setValidationError] = useState('');
    const [copied, setCopied] = useState(false);

    const { post, processing, errors, setData, reset, clearErrors } = useForm({
        email: '',
    });

    const handleClose = () => {
        reset();
        clearErrors();
        setEmailInput('');
        setEmailTags([]);
        setValidationError('');
        setCopied(false);
        setActiveTab('email');
        onClose();
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const addEmailTag = (rawEmail) => {
        const cleaned = rawEmail.trim().replace(/,$/, '');
        if (!cleaned) return;

        if (!isValidEmail(cleaned)) {
            setValidationError(`"${cleaned}" is not a valid email address.`);
            return;
        }

        if (emailTags.includes(cleaned)) {
            setValidationError(`"${cleaned}" has already been added.`);
            return;
        }

        setEmailTags((prevTags) => [...prevTags, cleaned]);
        setData('email', cleaned);
        setEmailInput('');
        setValidationError('');
    };

    const handleKeyDown = (e) => {
        if (['Enter', ',', ' '].includes(e.key)) {
            e.preventDefault();
            addEmailTag(emailInput);
        } else if (
            e.key === 'Backspace' &&
            !emailInput &&
            emailTags.length > 0
        ) {
            setEmailTags(emailTags.slice(0, -1));
        }
    };

    const handleBlur = () => {
        if (emailInput.trim()) {
            addEmailTag(emailInput);
        }
    };

    const removeTag = (indexToRemove) => {
        setEmailTags(emailTags.filter((_, idx) => idx !== indexToRemove));
        setValidationError('');
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();

        let currentTags = [...emailTags];
        if (emailInput.trim() && isValidEmail(emailInput.trim())) {
            currentTags.push(emailInput.trim());
            setEmailTags(currentTags);
            setEmailInput('');
        }

        if (currentTags.length === 0) {
            setValidationError('Please enter at least one email address.');
            return;
        }

        // Target single email or first tag for backend invite structure
        const targetEmail = currentTags[0];

        post(
            typeof route === 'function'
                ? route('resources.invite', resourceId)
                : `/resources/${resourceId}/invite`,
            {
                data: {
                    email: targetEmail,
                },
                onSuccess: () => {
                    handleClose(); // Closes modal automatically on successful request
                },
            },
        );
    };

    const handleCopyLink = async () => {
        if (!inviteLink) return;
        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border-2 border-black bg-white p-6 text-[#121212] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                {/* HEADER */}
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">👥</span>
                        <h2 className="text-base font-black">
                            Invite Collaborators
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-black bg-white font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
                    >
                        ✕
                    </button>
                </div>

                {/* TAB SWITCHER */}
                <div className="mt-4 flex gap-2 rounded-xl border-2 border-black bg-gray-100 p-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab('email')}
                        className={`flex-1 rounded-lg py-1.5 text-xs font-black transition-all ${
                            activeTab === 'email'
                                ? 'border-2 border-black bg-sky-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                : 'text-gray-600 hover:text-black'
                        }`}
                    >
                        📧 Invite by Email
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('link')}
                        className={`flex-1 rounded-lg py-1.5 text-xs font-black transition-all ${
                            activeTab === 'link'
                                ? 'border-2 border-black bg-yellow-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                : 'text-gray-600 hover:text-black'
                        }`}
                    >
                        🔗 Invite by Link
                    </button>
                </div>

                {/* TAB CONTENT */}
                <div className="mt-4">
                    {activeTab === 'email' && (
                        <form
                            onSubmit={handleEmailSubmit}
                            className="space-y-3"
                        >
                            <label className="block text-xs font-black uppercase text-gray-700">
                                Email Address
                            </label>

                            {/* TAG INPUT CONTAINER */}
                            <div className="flex flex-wrap items-start gap-1.5 rounded-lg border-2 border-black bg-white p-2 text-xs">
                                {emailTags.map((email, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center gap-1 rounded-md border border-black bg-sky-200 px-2 py-0.5 text-[11px] font-bold text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        {email}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            className="ml-0.5 font-black text-red-600 hover:text-red-800"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}

                                <input
                                    type="text"
                                    placeholder={
                                        emailTags.length === 0
                                            ? 'Enter email address...'
                                            : 'Add more...'
                                    }
                                    value={emailInput}
                                    onChange={(e) => {
                                        setEmailInput(e.target.value);
                                        setValidationError('');
                                    }}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                    className="min-w-[120px] flex-1 border-none bg-transparent p-0 text-xs font-medium text-black focus:outline-none focus:ring-0"
                                />
                            </div>

                            {(validationError || errors.email) && (
                                <p className="text-[11px] font-bold text-red-600">
                                    {validationError || errors.email}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg border-2 border-black bg-sky-400 py-2 text-xs font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none disabled:opacity-50"
                            >
                                {processing
                                    ? 'Sending Invitation...'
                                    : 'Send Invitation'}
                            </button>
                        </form>
                    )}

                    {activeTab === 'link' && (
                        <div className="space-y-3">
                            <label className="block text-xs font-black uppercase text-gray-700">
                                Shareable Invite Link
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={inviteLink}
                                    placeholder="Generating invite link..."
                                    className="w-full rounded-lg border-2 border-black bg-gray-50 p-2 font-mono text-xs text-gray-600 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    disabled={!inviteLink}
                                    className="h-9 shrink-0 rounded-lg border-2 border-black bg-yellow-400 px-3 text-xs font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none disabled:opacity-50"
                                >
                                    {copied ? 'Copied! ✓' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
