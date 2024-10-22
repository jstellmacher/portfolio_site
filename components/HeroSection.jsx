'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import SocialIcons from './SocialIcons';
import BraveHeroSection from './BraveHeroSection';

const HeroSection = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);
  
  const audioRef = useRef(null);

  useEffect(() => {
    const detectBrave = async () => {
      if (navigator.brave && (await navigator.brave.isBrave())) {
        setIsBraveBrowser(true);
      }
    };
    detectBrave();
  }, []);

  const handleOpenPDF = () => {
    setShowPDF(true);
  };

  const handleClosePDF = () => {
    setShowPDF(false);
  };

  const handleImageClick = () => {
    setIsFlipped(prev => !prev);
  };

  const handleAudioEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  if (isBraveBrowser) {
    return <BraveHeroSection />;
  }

  return (
    <div className="relative bg-transparent text-[var(--foreground)] min-h-screen py-10">
      <div className="absolute top-1/4 left-24 lg:left-32">
        <div className="flex flex-col items-start space-y-6">
          <div 
            className={`w-80 h-80 rounded-full overflow-hidden mb-4 cursor-pointer transition-all duration-300 ${isFlipped ? 'rotate-y-180' : ''} hover:shadow-lg`}
            onClick={handleImageClick}
            role="button"
            aria-label="Click to flip image"
          >
            <div className="relative w-full h-full transition-transform duration-500 transform-style-3d">
              <div className="absolute w-full h-full backface-hidden">
                <Image
                  src="/assets/jaihead_highqual.png"
                  alt="Jaichuang Stellmacher"
                  width={1200}
                  height={1200}
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-green-400 flex items-center justify-center text-black font-bold text-2xl p-4 text-center">
                Full-Stack Developer<br/>IT Consultant<br/>Project Manager
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-2">
            Jaichuang Stellmacher
          </h1>

          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-light font-sans tracking-wide dark:text-gray-300 text-gray-700 mb-4">
            <span className="inline-block">Full-Stack Developer</span>
            <span className="mx-1 sm:mx-2">|</span>
            <span className="inline-block">IT Cloud & Data Consultant</span>
            <span className="mx-1 sm:mx-2">|</span>
            <span className="inline-block">Project Manager</span>
          </h2>
          
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={handleOpenPDF} 
              className="bg-black text-white py-2 px-4 md:py-3 md:px-5 rounded-lg font-sans font-semibold tracking-wide transition-all duration-300 hover:bg-green-400 hover:text-white text-sm md:text-base dark:bg-white dark:text-black dark:hover:bg-green-400 dark:hover:text-black"
              aria-label="View Resume"
            >
              View Resume
            </button>
            <SocialIcons />
          </div>
          
          <audio 
            controls 
            aria-label="Audio pronunciation of Jaichuang Stellmacher" 
            ref={audioRef}
            onEnded={handleAudioEnded}
            className="mb-4"
          >
            <source src="/assets/Jai_pronounce.m4a" type="audio/mp4" />
            Your browser does not support the audio element.
          </audio>

        </div>
      </div>

      {showPDF && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-[90vh] flex flex-col relative">
            <button 
              onClick={handleClosePDF}
              className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 text-2xl font-bold rounded-full m-2"
              aria-label="Close PDF viewer"
            >
              X
            </button>
            <iframe
              src="/assets/JaichuangStellmacher_Template.pdf"
              className="w-full flex-grow border-2 border-gray-300 rounded"
              title="Resume PDF"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
