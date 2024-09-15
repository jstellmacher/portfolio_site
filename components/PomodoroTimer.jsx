'use client';

import React, { useState, useEffect } from 'react';
import { FaRestroom } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Draggable from 'react-draggable';

const TimerDisplay = ({ minutes, seconds, isBreak, blinkingColon }) => (
    <div className="text-7xl font-mono text-white text-center" style={{ textShadow: '0 0 10px rgba(255,255,255,0.7)' }}>
        {String(minutes).padStart(2, '0')}
        <motion.span animate={blinkingColon}>:</motion.span>
        {String(seconds).padStart(2, '0')}
    </div>
);

const TimerControls = ({ isRunning, handleStart, handleStop, handleReset, handleBathroomBreak, isPaused }) => (
    <div className="grid grid-cols-2 gap-3 mb-4">
        <button onClick={handleStart} className="py-3 bg-green-400 text-gray-800 text-lg font-bold rounded-lg hover:bg-green-300 transition duration-200">
            Start
        </button>
        <button onClick={handleStop} className="py-3 bg-red-400 text-gray-800 text-lg font-bold rounded-lg hover:bg-red-300 transition duration-200">
            Stop
        </button>
        <button onClick={handleReset} className="py-3 bg-gray-400 text-gray-800 text-lg font-bold rounded-lg hover:bg-gray-300 transition duration-200">
            Reset
        </button>
        <button onClick={handleBathroomBreak} className={`py-3 text-gray-800 text-lg font-bold rounded-lg flex items-center justify-center transition duration-200 ${isPaused ? 'bg-purple-400 hover:bg-purple-300' : 'bg-purple-500 hover:bg-purple-400'}`}>
            <FaRestroom className="mr-2 text-base" />
            {isPaused ? 'Resume' : 'Break'}
        </button>
    </div>
);

const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isBreak, setIsBreak] = useState(false);
    const [timeInput, setTimeInput] = useState(minutes);
    const [isRunning, setIsRunning] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [breakSeconds, setBreakSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const calculateBreakTime = (workMinutes) => (workMinutes <= 25 ? 5 : workMinutes <= 45 ? 10 : 15);
    const [breakTime, setBreakTime] = useState(calculateBreakTime(timeInput));

    const decrementTimer = (currentMinutes, currentSeconds, setMinutes, setSeconds) => {
        if (currentSeconds === 0) {
            if (currentMinutes === 0) return false;
            setMinutes(currentMinutes - 1);
            setSeconds(59);
        } else {
            setSeconds(currentSeconds - 1);
        }
        return true;
    };

    const resetTimer = () => {
        setMinutes(timeInput);
        setSeconds(0);
        setBreakMinutes(breakTime);
        setBreakSeconds(0);
        setShowCongrats(false);
        setIsBreak(false);
        setIsPaused(false);
    };

    useEffect(() => {
        setMinutes(timeInput);
        setBreakTime(calculateBreakTime(timeInput));
    }, [timeInput]);

    useEffect(() => {
        let interval;
        if (isRunning && !isPaused) {
            interval = setInterval(() => {
                const stillRunning = isBreak
                    ? decrementTimer(breakMinutes, breakSeconds, setBreakMinutes, setBreakSeconds)
                    : decrementTimer(minutes, seconds, setMinutes, setSeconds);

                if (!stillRunning) {
                    setIsBreak(!isBreak);
                    setShowCongrats(isBreak ? false : true);
                    resetTimer();
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [seconds, minutes, isBreak, isRunning, isPaused, breakMinutes, breakSeconds]);

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => { resetTimer(); setIsRunning(false); };
    const handleBathroomBreak = () => { setIsPaused(!isPaused); setIsRunning(isPaused); };

    const blinkingColon = { opacity: [1, 0], transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' } };

    return (
        <Draggable defaultPosition={{x: 20, y: 20}}>
            <div className="bg-gradient-to-b from-indigo-900 to-purple-800 rounded-xl shadow-2xl p-6 cursor-move" style={{ width: '400px', position: 'fixed', zIndex: 9999, left: 0, top: 0 }}>
                <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-lg p-4 mb-4">
                    <TimerDisplay minutes={isBreak ? breakMinutes : minutes} seconds={isBreak ? breakSeconds : seconds} isBreak={isBreak} blinkingColon={blinkingColon} />
                </div>
                {!isBreak && (
                    <div className="mb-4 text-center">
                        <input
                            type="number"
                            min="1"
                            value={timeInput}
                            onChange={(e) => setTimeInput(Number(e.target.value))}
                            className="px-4 py-2 border border-gray-600 rounded-lg text-lg bg-gray-800 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-red-500 w-24 text-center"
                        />
                        <span className="ml-2 text-lg text-white">minutes</span>
                    </div>
                )}
                <TimerControls
                    isRunning={isRunning}
                    handleStart={handleStart}
                    handleStop={handleStop}
                    handleReset={handleReset}
                    handleBathroomBreak={handleBathroomBreak}
                    isPaused={isPaused}
                />
                {showCongrats && <div className="text-lg font-bold text-green-300 text-center">Congratulations! Break Time!</div>}
            </div>
        </Draggable>
    );
};

export default PomodoroTimer;