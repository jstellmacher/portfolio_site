'use client';

import React, { useState, useEffect } from 'react';
import { FaRestroom } from 'react-icons/fa';
import Draggable from 'react-draggable';

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
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const calculateBreakTime = (workMinutes) => {
        if (workMinutes <= 25) return 5;
        if (workMinutes <= 45) return 10;
        return 15;
    };

    useEffect(() => {
        setMinutes(timeInput);
        setSeconds(0);
    }, [timeInput]);

    useEffect(() => {
        let interval;
        if (isRunning && !isPaused) {
            interval = setInterval(() => {
                if (isBreak) {
                    if (breakSeconds === 0) {
                        if (breakMinutes === 0) {
                            setIsBreak(false);
                            setMinutes(timeInput);
                            setSeconds(0);
                            setShowCongrats(false);
                            setBreakMinutes(calculateBreakTime(timeInput));
                            setBreakSeconds(0);
                        } else {
                            setBreakMinutes(breakMinutes - 1);
                            setBreakSeconds(59);
                        }
                    } else {
                        setBreakSeconds(breakSeconds - 1);
                    }
                } else {
                    if (seconds === 0) {
                        if (minutes === 0) {
                            setIsBreak(true);
                            setShowCongrats(true);
                            setBreakMinutes(calculateBreakTime(timeInput));
                            setBreakSeconds(0);
                        } else {
                            setMinutes(minutes - 1);
                            setSeconds(59);
                        }
                    } else {
                        setSeconds(seconds - 1);
                    }
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [seconds, minutes, isBreak, isRunning, timeInput, breakMinutes, breakSeconds, isPaused]);

    useEffect(() => {
        setPosition({
            x: window.innerWidth / 2 - 200,  // Adjusted for wider component
            y: window.innerHeight / 2 - 150
        });
    }, []);

    const handleStart = () => {
        setIsRunning(true);
        setIsPaused(false);
    };
    
    const handleStop = () => setIsRunning(false);
    
    const handleReset = () => {
        setIsRunning(false);
        setIsBreak(false);
        setMinutes(timeInput);
        setSeconds(0);
        setBreakMinutes(calculateBreakTime(timeInput));
        setBreakSeconds(0);
        setShowCongrats(false);
        setIsPaused(false);
    };
    
    const handleBathroomBreak = () => {
        if (isPaused) {
            setIsPaused(false);
            setIsRunning(true);
        } else {
            setIsPaused(true);
            setIsRunning(false);
        }
    };

    return (
        <Draggable defaultPosition={position}>
            <div className="fixed z-[9999] bg-gradient-to-b from-gray-800 to-gray-700 rounded-xl shadow-2xl p-6" style={{width: '400px'}}>
                <div className="bg-black rounded-lg p-4 mb-4">
                    <div className="text-7xl font-mono text-red-500 text-center" style={{textShadow: '0 0 10px rgba(255,0,0,0.7)'}}>
                        {isBreak ? (
                            `${String(breakMinutes).padStart(2, '0')}:${String(breakSeconds).padStart(2, '0')}`
                        ) : (
                            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                        )}
                    </div>
                </div>
                {!isBreak && (
                    <div className="mb-4 text-center">
                        <input
                            type="number"
                            min="1"
                            value={timeInput}
                            onChange={(e) => setTimeInput(Number(e.target.value))}
                            className="px-4 py-2 border border-gray-600 rounded-lg text-lg bg-gray-800 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 w-24 text-center"
                        />
                        <span className="ml-2 text-lg text-white">minutes</span>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                        onClick={handleStart}
                        className="py-3 bg-green-500 text-white text-lg font-bold rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Start
                    </button>
                    <button
                        onClick={handleStop}
                        className="py-3 bg-red-500 text-white text-lg font-bold rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Stop
                    </button>
                    <button
                        onClick={handleReset}
                        className="py-3 bg-gray-500 text-white text-lg font-bold rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleBathroomBreak}
                        className={`py-3 text-white text-lg font-bold rounded-lg flex items-center justify-center transition duration-200 ${
                            isPaused ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
                        }`}
                    >
                        <FaRestroom className="mr-2 text-base" />
                        {isPaused ? 'Resume' : 'Break'}
                    </button>
                </div>
                {showCongrats && (
                    <div className="text-lg font-bold text-green-400 text-center">
                        Congratulations! Break Time!
                    </div>
                )}
            </div>
        </Draggable>
    );
};

export default PomodoroTimer;