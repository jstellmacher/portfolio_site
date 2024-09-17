'use client';

import React, { useState, useEffect } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Draggable from 'react-draggable';
import Confetti from 'react-confetti';
import { differenceInSeconds } from 'date-fns';

const TimerDisplay = ({ minutes, seconds, isBreak, blinkingColon }) => (
    <div className="text-7xl font-mono text-white text-center" style={{ textShadow: '0 0 10px rgba(255,255,255,0.7)' }}>
        {String(minutes).padStart(2, '0')}
        <motion.span animate={blinkingColon}>:</motion.span>
        {String(seconds).padStart(2, '0')}
    </div>
);

const TimerControls = ({ isRunning, handleStart, handleStop, handleReset, toggleFocusMode, isFocusMode }) => (
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
        <button onClick={toggleFocusMode} className={`py-3 text-gray-800 text-lg font-bold rounded-lg flex items-center justify-center transition duration-200 ${isFocusMode ? 'bg-yellow-400 hover:bg-yellow-300' : 'bg-blue-400 hover:bg-blue-300'}`}>
            <FaLightbulb className="mr-2 text-base" />
            {isFocusMode ? 'Normal Mode' : 'Focus Mode'}
        </button>
    </div>
);

const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isBreak, setIsBreak] = useState(false);
    const [timeInput, setTimeInput] = useState(25);
    const [isRunning, setIsRunning] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [breakSeconds, setBreakSeconds] = useState(0);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [multipleBreaks, setMultipleBreaks] = useState(false);
    const [breakInterval, setBreakInterval] = useState(30); // minutes between breaks
    const [sessionCount, setSessionCount] = useState(0);
    const [longBreakInterval, setLongBreakInterval] = useState(4);
    const [isLongBreak, setIsLongBreak] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [startTime, setStartTime] = useState(null);

    const presetTimes = [25, 30, 45, 60, 90, 120];

    const calculateBreakTime = (workMinutes, isLong = false) => {
        if (isLong) return Math.min(30, Math.round(workMinutes / 2));
        if (workMinutes <= 25) return 5;
        if (workMinutes <= 50) return 10;
        if (workMinutes <= 90) return 15;
        if (workMinutes <= 120) return 20;
        return Math.min(30, Math.round(workMinutes / 4));
    };

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
        setBreakMinutes(calculateBreakTime(timeInput));
        setBreakSeconds(0);
        setShowCongrats(false);
        setIsBreak(false);
        setIsFocusMode(false);
    };

    useEffect(() => {
        setMinutes(timeInput);
        const calculatedBreakTime = calculateBreakTime(timeInput);
        setBreakMinutes(calculatedBreakTime);
        setMultipleBreaks(timeInput > 60);
    }, [timeInput]);

    const handleMultipleBreaksChange = (e) => {
        setMultipleBreaks(e.target.checked);
    };

    const handleBreakIntervalChange = (e) => {
        setBreakInterval(Number(e.target.value));
    };

    useEffect(() => {
        let interval;
        if (isRunning) {
            setStartTime(Date.now());
            interval = setInterval(() => {
                const elapsedSeconds = differenceInSeconds(Date.now(), startTime);
                const remainingSeconds = (isBreak ? breakMinutes : minutes) * 60 - elapsedSeconds;

                if (remainingSeconds <= 0) {
                    if (isBreak) {
                        // Transition back to work session or reset
                        setIsBreak(false);
                        resetTimer();
                        setShowCongrats(true);
                        setSessionCount(prevCount => prevCount + 1);
                        if (multipleBreaks && sessionCount % breakInterval === 0) {
                            setIsBreak(true);
                            setBreakMinutes(calculateBreakTime(timeInput, true));
                        }
                    } else {
                        // Transition to break session
                        setIsBreak(true);
                        setBreakMinutes(calculateBreakTime(timeInput));
                    }
                } else {
                    if (isBreak) {
                        setBreakMinutes(Math.floor(remainingSeconds / 60));
                        setBreakSeconds(remainingSeconds % 60);
                    } else {
                        setMinutes(Math.floor(remainingSeconds / 60));
                        setSeconds(remainingSeconds % 60);
                    }
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, isBreak, startTime, breakMinutes, minutes, multipleBreaks, sessionCount, timeInput]); // Add all relevant dependencies

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
        resetTimer();
        setIsRunning(false);
        setSessionCount(0);
    };

    const toggleFocusMode = () => {
        setIsFocusMode(!isFocusMode);
    };

    useEffect(() => {
        const root = document.documentElement;
        if (isFocusMode) {
            root.classList.add('grayscale');
        } else {
            root.classList.remove('grayscale');
        }
    }, [isFocusMode]);

    useEffect(() => {
        if (showCongrats) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
                setShowCongrats(false);
            }, 10000); // Increased from 5000 to 10000 (10 seconds)
            return () => clearTimeout(timer);
        }
    }, [showCongrats]);

    const handleTimeChange = (newTime) => {
        setTimeInput(newTime);
        setMinutes(newTime);
        setSeconds(0);
    };

    const blinkingColon = { opacity: [1, 0], transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' } };

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 640); // Adjust this value as needed
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
            {showConfetti && <Confetti />}
            {isSmallScreen && (
                <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black p-2 text-center z-50">
                    Warning: This component is meant for larger screens.
                </div>
            )}
            <Draggable>
                <div className="bg-gradient-to-b from-indigo-900 to-purple-800 rounded-xl shadow-2xl p-6 cursor-move fixed top-10 left-10 z-50">
                    <div className="flex flex-col items-center">
                        <TimerDisplay minutes={minutes} seconds={seconds} isBreak={isBreak} blinkingColon={blinkingColon} />
                        <TimerControls
                            isRunning={isRunning}
                            handleStart={handleStart}
                            handleStop={handleStop}
                            handleReset={handleReset}
                            toggleFocusMode={toggleFocusMode}
                            isFocusMode={isFocusMode}
                        />
                        <div className="mt-4">
                            <select value={timeInput} onChange={(e) => handleTimeChange(Number(e.target.value))} className="p-2 border border-gray-300 rounded">
                                {presetTimes.map((time) => (
                                    <option key={time} value={time}>{time} minutes</option>
                                ))}
                            </select>
                            <input type="checkbox" checked={multipleBreaks} onChange={handleMultipleBreaksChange} className="ml-2" />
                            <label className="ml-1">Multiple Breaks</label>
                            {multipleBreaks && (
                                <input
                                    type="number"
                                    value={breakInterval}
                                    onChange={handleBreakIntervalChange}
                                    className="ml-2 p-1 border border-gray-300 rounded"
                                    min="5"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    );
};

export default PomodoroTimer;