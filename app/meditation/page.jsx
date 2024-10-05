'use client';
import { useState } from 'react';
import GrowingCircle from '../../components/Meditation/GrowingCircle';
import PomodoroTimer from '../../components/Meditation/PomodoroTimer';
import VideoPlayer from '../../components/Meditation/VideoPlayer';
import MeditationNav from '../../components/Meditation/MeditationNav'; // Add this import

const MeditationPage = () => {
    const [showGrowingCircle, setShowGrowingCircle] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <MeditationNav 
                showGrowingCircle={showGrowingCircle} 
                setShowGrowingCircle={setShowGrowingCircle} 
            />
            <div className="flex-grow relative">
                {!showGrowingCircle ? (
                    <div className="absolute inset-0">
                        <VideoPlayer />
                    </div>
                ) : (
                    <GrowingCircle />
                )}
                {!showGrowingCircle && (
                    <div className="absolute bottom-4 right-4 z-10">
                        <PomodoroTimer />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeditationPage;