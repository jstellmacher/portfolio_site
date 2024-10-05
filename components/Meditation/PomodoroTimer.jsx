'use client';

import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop, FaRedo, FaRegLightbulb } from 'react-icons/fa';
import { AiOutlineBulb } from 'react-icons/ai';import { motion } from 'framer-motion';
import Draggable from 'react-draggable';
import Confetti from 'react-confetti';
import { differenceInSeconds } from 'date-fns';



const TimerControls = ({ isRunning, handleStart, handleStop, handleReset, toggleFocusMode, isFocusMode }) => (
    <div className="flex justify-center space-x-4 mb-4">
        <Button onClick={handleStart} color="green">
            <FaPlay className="text-2xl" />
        </Button>
        <Button onClick={handleStop} color="red">
            <FaStop className="text-2xl" />
        </Button>
        <Button onClick={handleReset} color="yellow">
            <FaRedo className="text-2xl" />
        </Button>
        <Button onClick={toggleFocusMode} color={isFocusMode ? 'white' : 'yellow'}>
            {isFocusMode ? <AiOutlineBulb className="text-2xl" /> : <FaRegLightbulb className="text-2xl" />}
        </Button>
    </div>
);
const TimerDisplay = ({ minutes, seconds, blinkingColon }) => (
    <div className="text-7xl font-mono text-white text-center" style={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}>
        {String(minutes).padStart(2, '0')}
        <motion.span animate={blinkingColon}>:</motion.span>
        {String(seconds).padStart(2, '0')}
    </div>
);

const Button = ({ onClick, color, children }) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center w-16 h-16 text-gray-800 text-lg font-bold rounded-lg hover:bg-${color}-300 bg-${color}-400 transition duration-300 ease-in-out transform hover:scale-105 shadow-md`}
    >
        {children}
    </button>
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
        setBreakMinutes(calculateBreakTime(timeInput));
        setMultipleBreaks(timeInput > 60);
    }, [timeInput]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            setStartTime(Date.now());
            interval = setInterval(() => {
                const elapsedSeconds = differenceInSeconds(Date.now(), startTime);
                const remainingSeconds = (isBreak ? breakMinutes : minutes) * 60 - elapsedSeconds;

                if (remainingSeconds <= 0) {
                    if (isBreak) {
                        setIsBreak(false);
                        resetTimer();
                        setShowCongrats(true);
                        setSessionCount(prevCount => prevCount + 1);
                        if (multipleBreaks && sessionCount % breakInterval === 0) {
                            setIsBreak(true);
                            setBreakMinutes(calculateBreakTime(timeInput, true));
                        }
                    } else {
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
    }, [isRunning, isBreak, startTime, breakMinutes, minutes, multipleBreaks, sessionCount, timeInput]);

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
        document.documentElement.classList.toggle('grayscale', isFocusMode);
    }, [isFocusMode]);

    useEffect(() => {
        if (showCongrats) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
                setShowCongrats(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [showCongrats]);

    const handleTimeChange = (newTime) => {
        setTimeInput(newTime);
        setMinutes(newTime);
        setSeconds(0);
    };

    const handleMultipleBreaksChange = () => {
        setMultipleBreaks(prev => !prev);
    };

    const blinkingColon = { opacity: [1, 0], transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' } };

    useEffect(() => {
        const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 640);
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
    <div
        className="bg-gradient-to-b from-indigo-900 to-purple-800 rounded-xl shadow-2xl p-6 cursor-move fixed z-50"
        style={{ top: '5px', right: '5px', position: 'fixed' }}
    >
            
            <TimerDisplay minutes={minutes} seconds={seconds} blinkingColon={blinkingColon} />
            <TimerControls
                isRunning={isRunning}
                handleStart={handleStart}
                handleStop={handleStop}
                handleReset={handleReset}
                toggleFocusMode={toggleFocusMode}
                isFocusMode={isFocusMode}
            />
            <div className="mt-4 flex items-center">
                <select
                    value={timeInput}
                    onChange={(e) => handleTimeChange(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded text-gray-900"
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {presetTimes.map((time) => (
                        <option key={time} value={time}>
                            {time} minutes
                        </option>
                    ))}
                </select>
                <label className="ml-4 flex items-center">
                    <input
                        type="checkbox"
                        checked={multipleBreaks}
                        onChange={handleMultipleBreaksChange}
                        className="mr-2"
                    />
                    Multiple Breaks
                </label>
            </div>
        </div>
</Draggable>
        </>
    );
};

export default PomodoroTimer;