'use client';
import { useState } from 'react';
import GrowingCircle from '../../components/GrowingCircle';
import PomodoroTimer from '../../components/PomodoroTimer';
import VideoPlayer from '../../components/VideoPlayer';
import MeditationNav from '../../components/MeditationNav'; // Add this import

const MeditationPage = () => {
    const [showGrowingCircle, setShowGrowingCircle] = useState(false);

    return (
        <div className="relative min-h-screen">
            <MeditationNav 
                showGrowingCircle={showGrowingCircle} 
                setShowGrowingCircle={setShowGrowingCircle} 
            />
            <div className="fixed top-24 left-0 w-full p-4 flex justify-center items-center z-30">
                <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto">
                    {!showGrowingCircle && <VideoPlayer />}
                </div>
            </div>

            <div className="pt-48 relative">
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