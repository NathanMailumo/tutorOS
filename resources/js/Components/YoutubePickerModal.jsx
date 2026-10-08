import React, { useState } from 'react';
import axios from 'axios';

export default function YouTubePickerModal({ isOpen, onClose, onSelectVideo }) {
    const [mode, setMode] = useState('search'); // 'search' or 'direct'
    const [query, setQuery] = useState('');
    const [directUrl, setDirectUrl] = useState('');
    const [results, setResults] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/youtube/search', {
                params: { q: query },
            });
            setResults(response.data);
            if (response.data.length === 0) {
                setError('No videos found. Try a direct URL!');
            }
        } catch (err) {
            setError(
                'Search failed. You can paste a direct YouTube link below.',
            );
        } finally {
            setLoading(false);
        }
    };

    const getYouTubeId = (url) => {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const handleDirectUrlSubmit = async (e) => {
        e.preventDefault();
        const videoId = getYouTubeId(directUrl);

        if (!videoId) {
            setError('Invalid YouTube URL. Please paste a valid link.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch(
                `https://www.youtube.com/oembed?url=${encodeURIComponent(directUrl)}&format=json`,
            );

            if (!res.ok) throw new Error('Could not fetch video info');

            const data = await res.json();

            const customVideo = {
                id: videoId,
                title: data.title,
                uploader: data.author_name,
                thumbnail:
                    data.thumbnail_url ||
                    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                url: directUrl,
            };

            onSelectVideo(customVideo);
            handleClose();
        } catch (err) {
            const fallbackVideo = {
                id: videoId,
                title: 'YouTube Video',
                uploader: 'YouTube Channel',
                thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                url: directUrl,
            };
            onSelectVideo(fallbackVideo);
            handleClose();
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmSelection = () => {
        if (selectedVideo) {
            onSelectVideo(selectedVideo);
            handleClose();
        }
    };

    const handleClose = () => {
        setQuery('');
        setDirectUrl('');
        setResults([]);
        setSelectedVideo(null);
        setError('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                {/* HEADER & MODE SWITCHER */}
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <h2 className="text-base font-black uppercase">
                        YouTube Resource
                    </h2>
                    <button
                        onClick={handleClose}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-black bg-white font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
                    >
                        ✕
                    </button>
                </div>

                {/* MODE TOGGLE BUTTONS */}
                <div className="mt-4 flex gap-2">
                    <button
                        type="button"
                        onClick={() => setMode('search')}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black py-1.5 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                            mode === 'search'
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-100 text-black'
                        }`}
                    >
                        {/* YouTube SVG Icon */}
                        <svg
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        In-App Search
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('direct')}
                        className={`flex-1 rounded-lg border-2 border-black py-1.5 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                            mode === 'direct'
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-100 text-black'
                        }`}
                    >
                        Direct URL
                    </button>
                </div>

                {/* MODE 1: SEARCH FORM */}
                {mode === 'search' && (
                    <div className="mt-4 space-y-4">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Search YouTube videos..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full rounded-lg border-2 border-black p-2 text-xs font-bold focus:outline-none"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg border-2 border-black bg-black px-4 text-xs font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800"
                            >
                                {loading ? '...' : 'Search'}
                            </button>
                        </form>

                        {error && (
                            <p className="text-xs font-bold text-red-600">
                                {error}
                            </p>
                        )}

                        {/* RESULTS GRID */}
                        <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
                            {results.map((video) => (
                                <div
                                    key={video.id}
                                    onClick={() => setSelectedVideo(video)}
                                    className={`flex cursor-pointer gap-3 rounded-xl border-2 border-black p-2 transition-all ${
                                        selectedVideo?.id === video.id
                                            ? 'bg-red-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                                            : 'bg-white hover:bg-gray-50'
                                    }`}
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="h-16 w-24 rounded-lg border border-black object-cover"
                                    />
                                    <div className="flex-1 overflow-hidden">
                                        <h4 className="line-clamp-2 text-xs font-black text-black">
                                            {video.title}
                                        </h4>
                                        <p className="mt-1 text-[10px] font-bold text-gray-500">
                                            {video.uploader}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {selectedVideo && (
                            <button
                                type="button"
                                onClick={handleConfirmSelection}
                                className="w-full rounded-lg border-2 border-black bg-blue-600 py-2 text-xs font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700"
                            >
                                Select Video
                            </button>
                        )}
                    </div>
                )}

                {/* MODE 2: DIRECT PASTE URL FORM */}
                {mode === 'direct' && (
                    <form
                        onSubmit={handleDirectUrlSubmit}
                        className="mt-4 space-y-4"
                    >
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-700">
                                YouTube Video Link
                            </label>
                            <input
                                type="url"
                                required
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={directUrl}
                                onChange={(e) => {
                                    setDirectUrl(e.target.value);
                                    setError('');
                                }}
                                className="mt-1 w-full rounded-lg border-2 border-black p-2 text-xs font-bold focus:outline-none"
                            />
                            {error && (
                                <p className="mt-1 text-xs font-bold text-red-600">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg border-2 border-black bg-black py-2 text-xs font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 disabled:opacity-50"
                        >
                            {loading ? 'Fetching Details...' : 'Add Video Link'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
