// components/HeroSection.js
'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/legacy/image";
import SocialIcons from './SocialIcons';
import BraveHeroSection from './BraveHeroSection';
import ReCenterButton from './ReCenter';
import { FaStar } from 'react-icons/fa';

const HeroSection = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);

  useEffect(() => {
    const detectBrave = async () => {
      if (navigator.brave && (await navigator.brave.isBrave())) {
        setIsBraveBrowser(true);
      }
    };

    detectBrave();
  }, []);

  const handleOpenPDF = () => {
    console.log("Opening PDF viewer");
    setShowPDF(true);
  };

  const handleClosePDF = () => {
    console.log("Closing PDF viewer");
    setShowPDF(false);
  };

  const handleImageClick = () => {
    setIsFlipped(!isFlipped);
  };

  if (isBraveBrowser) {
    return <BraveHeroSection />;
  }

  return (
    <div className="relative bg-transparent text-white min-h-screen">
      {/* Main content */}
      <div className="absolute top-1/4 left-8 lg:left-16">
        <div className="flex flex-col items-start space-y-6">
          <div 
            className={`w-64 h-64 rounded-full overflow-hidden mb-2 cursor-pointer transition-all duration-300 ${isFlipped ? 'rotate-y-180' : ''} hover:shadow-[0_0_20px_5px_rgba(0,162,255,0.7)]`}
            onClick={handleImageClick}
          >
            <div className="relative w-full h-full transition-transform duration-500 transform-style-3d">
              <div className="absolute w-full h-full backface-hidden">
                <Image
                  src="/assets/thumbsup-removebg-preview.png"
                  alt="Jaichuang Stellmacher giving a thumbs up, showcasing enthusiasm and positivity"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-green-400 flex items-center justify-center text-black font-bold text-2xl p-4 text-center">
                Full-Stack Developer<br/>IT Consultant<br/>Project Manager
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif">Jaichuang Stellmacher</h1>
      <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-light font-sans tracking-wide">
        <span className="inline-block">Full-Stack Developer</span>
        <span className="mx-1 sm:mx-2">|</span>
        <span className="inline-block">IT Cloud & Data Consultant</span>
        <span className="mx-1 sm:mx-2">|</span>
        <span className="inline-block">Project Manager</span>
      </h2>
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleOpenPDF} 
          className="bg-white text-green-400 py-2 px-4 md:py-3 md:px-5 rounded-lg font-sans font-semibold tracking-wide transition-all duration-300 hover:bg-green-400 hover:text-white text-sm md:text-base"
        >
          View Resume
        </button>
        <SocialIcons />
      </div>
    </div>
  </div>

  {/* Featured Card for ReCenterButton */}
  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 md:bottom-8 md:left-auto md:translate-x-0 md:w-auto">
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 shadow-lg">
      <div className="flex justify-center mb-4">
        <FaStar className="text-yellow-300 text-3xl mx-1" />
        <FaStar className="text-yellow-300 text-3xl mx-1" />
        <FaStar className="text-yellow-300 text-3xl mx-1" />
      </div>
      <h3 className="text-xl font-bold text-center mb-4">Featured Tool</h3>
      <ReCenterButton />
    </div>
  </div>

  {showPDF && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-[90vh] flex flex-col relative">
        <button 
          onClick={handleClosePDF}
          className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 text-2xl font-bold rounded-full m-2"
        >
          X
        </button>
        <iframe
          src="/assets/Public_Resume.pdf"
          className="w-full flex-grow border-2 border-gray-300 rounded"
          title="Resume PDF"
        />
      </div>
    </div>
  )}
</div>
  );
};

export default HeroSection;