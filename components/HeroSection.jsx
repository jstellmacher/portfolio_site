// components/HeroSection.js
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SocialIcons from './SocialIcons';

const HeroSection = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

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

  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-between p-4 bg-transparent text-white min-h-screen">
      <div className="flex flex-col items-center lg:items-start space-y-2 lg:w-1/2">
        <div 
          className={`w-64 h-64 rounded-full overflow-hidden mb-2 bg-white shadow-lg cursor-pointer transition-all duration-300 ${isFlipped ? 'rotate-y-180' : ''} hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] hover:scale-105`}
          onClick={handleImageClick}
        >
          <div className="relative w-full h-full transition-transform duration-500 transform-style-3d">
            <div className="absolute w-full h-full backface-hidden">
              <Image
                src="/assets/thumbsup-removebg-preview.png"
                alt="Jaichuang Stellmacher giving a thumbs up, showcasing enthusiasm and positivity"
                layout="fill"
                objectFit="cover"
                className="p-1" // Added padding to reduce margins
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-green-400 flex items-center justify-center text-black font-bold text-2xl p-4 text-center">
              Full-Stack Developer<br/>IT Consultant<br/>Project Manager
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-center lg:text-left">Jaichuang Stellmacher</h1>
        <h2 className="text-xl font-light">
          Full-Stack Developer | IT Cloud & Data Consultant | Project Manager
        </h2>
        <button 
          onClick={handleOpenPDF} 
          className="bg-white text-green-400 py-3 px-5 rounded-lg font-semibold"
        >
          View Resume
        </button>
        <SocialIcons />
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
              src="/assets/Public_Resume.pdf" // Make sure this PDF is in the correct path
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