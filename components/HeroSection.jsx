// components/HeroSection.js
'use client';

import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaDev, FaGoogleDrive } from 'react-icons/fa';
import SocialIcons from './SocialIcons';

const HeroSection = () => {
  const [showPDF, setShowPDF] = useState(false);

  const handleOpenPDF = () => {
    console.log("Opening PDF viewer");
    setShowPDF(true);
  };

  const handleClosePDF = () => {
    console.log("Closing PDF viewer");
    setShowPDF(false);
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-between p-8 bg-transparent text-white min-h-screen">
      <div className="flex flex-col items-start space-y-4 lg:w-1/2">
        <h1 className="text-5xl font-bold">Jaichuang Stellmacher</h1>
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