'use client';

import React, { useState, useEffect } from 'react';
import { FaCircle, FaArrowDown, FaArrowUp, FaPause } from 'react-icons/fa';
import { GiNoseFront } from 'react-icons/gi';
import { MdOutlineAir } from 'react-icons/md';
import styles from './GrowingCircle.module.css';

const phaseDuration = 4000; // 4 seconds for each phase
const minSize = 50;
const maxSize = 200;

const GrowingCircle = () => {
    const [phase, setPhase] = useState('inhale');
    const [size, setSize] = useState(minSize);
    const [isPulsing, setIsPulsing] = useState(false);
    const [started, setStarted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(phaseDuration / 1000); // initial time in seconds
    const [count, setCount] = useState(1); // New state for the countdown

    useEffect(() => {
        if (!started) return;

        let timer;
        let growthInterval;
        let phaseEndTime;
        let countInterval;

        const updateRemainingTime = () => {
            const now = Date.now();
            const timeLeft = Math.max(0, Math.ceil((phaseEndTime - now) / 1000));
            setRemainingTime(timeLeft);

            if (timeLeft <= 0) {
                setPhase(phase === 'holdIn' ? 'exhale' : phase === 'holdOut' ? 'inhale' : phase);
            }
        };

        const updateCount = () => {
            if (phase === 'inhale') {
                setCount(prev => prev < 3 ? prev + 1 : 3);
            } else if (phase === 'exhale') {
                setCount(prev => prev > 1 ? prev - 1 : 1);
            }
        };

        if (phase === 'inhale' || phase === 'exhale') {
            phaseEndTime = Date.now() + phaseDuration;
            let progress = 0;
            growthInterval = setInterval(() => {
                progress += 0.25;
                setSize(phase === 'inhale' 
                    ? minSize + (maxSize - minSize) * (progress / 4)
                    : maxSize - (maxSize - minSize) * (progress / 4)
                );
                if (progress >= 4) {
                    clearInterval(growthInterval);
                    setPhase(phase === 'inhale' ? 'holdIn' : 'holdOut');
                }
            }, 250);

            // Set up count interval
            setCount(phase === 'inhale' ? 1 : 3);
            countInterval = setInterval(updateCount, 1000);
        } else {
            phaseEndTime = Date.now() + phaseDuration;
            timer = setInterval(updateRemainingTime, 1000);
        }

        setIsPulsing(phase === 'holdIn' || phase === 'holdOut');

        return () => {
            clearTimeout(timer);
            clearInterval(growthInterval);
            clearInterval(timer);
            clearInterval(countInterval);
        };
    }, [phase, started]);

    const getPhaseText = () => {
        switch (phase) {
            case 'inhale':
                return (
                    <div className={`${styles.description} ${styles.largeText}`}>
                        <GiNoseFront className={styles.icon} /> Breathe in...
                    </div>
                );
            case 'holdIn':
            case 'holdOut':
                return (
                    <div className={`${styles.description} ${styles.largeText}`}>
                        <FaPause className={styles.icon} /> Hold your breath...
                    </div>
                );
            case 'exhale':
                return (
                    <div className={`${styles.description} ${styles.largeText}`}>
                        <MdOutlineAir className={styles.icon} /> Breathe out...
                    </div>
                );
            default:
                return null;
        }
    };

    const handleStart = () => {
        setStarted(true);
        setSize(minSize);
        setPhase('inhale');
        setRemainingTime(phaseDuration / 1000);
        setCount(1);
    };

    const handleStop = () => {
        setStarted(false);
        setSize(minSize);
        setPhase('inhale');
        setRemainingTime(phaseDuration / 1000);
        setCount(1);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Box Breathing Exercise</h1>
            {!started ? (
                <>
                    <div className={styles.infoBox}>
                    <p className={styles.explanation}>
  When I need to ground myself and find calm during stressful moments, I turn to box breathing. It&apos;s a simple yet powerful technique that helps me regain my center. Here&apos;s how it works: I breathe in slowly for 4 seconds, hold the breath for 4 seconds, exhale gently for 4 seconds, and then hold again for 4 seconds. This rhythm creates a soothing &quot;box&quot; pattern, offering a moment of peace and clarity amidst the chaos.
</p>
<p className={styles.instructions}>
  Click &quot;Start&quot; to begin. Follow the circle&apos;s growth and the on-screen instructions 
  to guide your breathing.
</p>
                    </div>
                    <button className={styles.startButton} onClick={handleStart}>
                        Start
                    </button>
                </>
            ) : (
                <>
                    {getPhaseText()}
                    <div className={styles.circleContainer}>
                        <div className={`${styles.ring} ${isPulsing ? styles.pulsingRing : ''}`} />
                        <FaCircle
                            className={styles.circle}
                            style={{
                                fontSize: size,
                            }}
                        />
                        <div className={styles.remainingTime}>
                            {(phase === 'inhale' || phase === 'exhale') ? count : remainingTime}
                        </div>
                    </div>
                    <button className={styles.stopButton} onClick={handleStop}>
                        Stop
                    </button>
                </>
            )}
        </div>
    );
};

export default GrowingCircle;