'use client';
import { useState, useEffect } from 'react';
import GrowingCircle from '../../components/GrowingCircle';
import PomodoroTimer from '../../components/PomodoroTimer';
import { FaPlay, FaPause, FaYoutube } from 'react-icons/fa';

const MeditationPage = () => {
    const [showGrowingCircle, setShowGrowingCircle] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoOptions] = useState([
        { title: 'Lofi Girl', url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1', channel: 'LofiGirl' },
        { title: 'ChillOut Lofi Music', url: 'https://www.youtube.com/embed/leg3dJ4Xl_Q?autoplay=1', channel: 'ChillOutLofiMusic' },
        // ... add other video options here
    ]);
    const [showFakeYoutube, setShowFakeYoutube] = useState(true);

    const handleVideoChange = (url) => {
        if (url === '') {
            setVideoUrl('');
            setIsVideoPlaying(false);
            setSelectedVideo(null);
            setShowFakeYoutube(true);
        } else {
            setVideoUrl(url);
            setIsVideoPlaying(true);
            setSelectedVideo(videoOptions.find(video => video.url === url));
            setShowFakeYoutube(false);
        }
    };

    const handleVideoPlay = () => {
        setIsVideoPlaying(!isVideoPlaying);
        if (videoUrl) {
            const iframe = document.querySelector('iframe');
            if (iframe) {
                const iframeSrc = iframe.src;
                iframe.src = isVideoPlaying 
                    ? iframeSrc.replace('autoplay=1', 'autoplay=0') 
                    : iframeSrc.replace('autoplay=0', 'autoplay=1');
            }
        }
    };

    useEffect(() => {
        if (videoUrl) {
            setIsVideoPlaying(true);
        }
    }, [videoUrl]);

    return (
        <div className="relative min-h-screen">
            {/* Remove the Home button */}

            {/* Make controls background transparent */}
            <div className="fixed top-24 left-0 w-full p-4 flex justify-center items-center z-30">
                <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto">
                    {/* Toggle buttons for Growing Circle and Pomodoro Timer */}
                    <div className="flex mb-4">
                        <button
                            onClick={() => setShowGrowingCircle(false)}
                            className={`mr-2 px-6 py-3 rounded text-lg font-medium ${
                                !showGrowingCircle ? 'bg-blue-500 text-white' : 'bg-opacity-50 bg-gray-200 text-gray-800'
                            }`}
                        >
                            Pomodoro Timer
                        </button>
                        <button
                            onClick={() => setShowGrowingCircle(true)}
                            className={`px-6 py-3 rounded text-lg font-medium ${
                                showGrowingCircle ? 'bg-blue-500 text-white' : 'bg-opacity-50 bg-gray-200 text-gray-800'
                            }`}
                        >
                            Growing Circle
                        </button>
                    </div>

                    {/* Video controls */}
                    <div className="flex gap-4">
                        <select
                            onChange={(e) => handleVideoChange(e.target.value)}
                            value={videoUrl}
                            className="p-2 border border-gray-300 rounded-lg bg-white bg-opacity-50 text-gray-800 shadow-sm"
                        >
                            <option value="">Select Background Music</option>
                            {videoOptions.map((video) => (
                                <option key={video.url} value={video.url}>
                                    {video.title}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleVideoPlay}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                        >
                            {isVideoPlaying ? (
                                <FaPause className="text-xl" />
                            ) : (
                                <FaPlay className="text-xl" />
                            )}
                        </button>
                        {selectedVideo && videoUrl && (
                            <button
                                onClick={() => window.open(`https://www.youtube.com/@${selectedVideo.channel}`, '_blank')}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Follow {selectedVideo.title}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Adjust content area */}
            <div className="pt-48 relative">
                {showGrowingCircle ? (
                    <GrowingCircle />
                ) : (
                    <>
                        {showFakeYoutube ? (
                            <div className="relative pb-[56.25%] bg-white overflow-hidden rounded-lg shadow-lg border-8 border-gray-200">
                                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                            <FaYoutube className="text-red-600 text-6xl mb-4 mx-auto" />
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose a background music to start</h2>
                                            <p className="text-lg text-gray-600">Relax and focus with soothing tunes</p>
                                        </div>
                                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                                            {videoOptions.map((video) => (
                                                <button
                                                    key={video.url}
                                                    onClick={() => handleVideoChange(video.url)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
                                                >
                                                    {video.title}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : videoUrl && (
                            <div className="relative pb-[56.25%] overflow-hidden">
                                <iframe
                                    src={`${videoUrl}&enablejsapi=1`}
                                    title="YouTube video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full"
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* PomodoroTimer always visible */}
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div className="pointer-events-auto transform -translate-x-1/2 -translate-y-1/2">
                    <PomodoroTimer />
                </div>
            </div>
        </div>
    );
};

export default MeditationPage;