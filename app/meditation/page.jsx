'use client';
import { useState } from 'react';
import GrowingCircle from '../../components/GrowingCircle';
import PomodoroTimer from '../../components/PomodoroTimer';
import VideoPlayer from '../../components/VideoPlayer';

const MeditationPage = () => {
    const [showGrowingCircle, setShowGrowingCircle] = useState(false);

    return (
        <div className="relative min-h-screen">
            {/* Position buttons below navbar */}
            <div className="fixed top-16 left-0 w-full p-4 flex justify-center items-center z-30">
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
            </div>

            {/* Full screen video player */}
            {!showGrowingCircle && (
                <div className="fixed inset-0 z-10">
                    <VideoPlayer />
                </div>
            )}

            {/* Adjust positioning for GrowingCircle and PomodoroTimer */}
            <div className="pt-32 relative">
                {showGrowingCircle ? (
                    <GrowingCircle />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="pointer-events-auto">
                            <PomodoroTimer />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeditationPage;