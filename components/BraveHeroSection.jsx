import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SocialIcons from './SocialIcons';

const BraveHeroSection = () => {
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  // Detect Brave Browser
  useEffect(() => {
    const detectBrave = async () => {
      if (navigator.brave && await navigator.brave.isBrave()) {
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

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-transparent text-white">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="relative w-64 h-64 rounded-full overflow-hidden mb-2">
          <Image
            src="/assets/thumbsup-removebg-preview.png"
            alt="Jaichuang Stellmacher giving a thumbs up, showcasing enthusiasm and positivity"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="z-10"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-serif">Jaichuang Stellmacher</h1>
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-light font-sans tracking-wide">
          <span className="inline-block">Full-Stack Developer</span>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="inline-block">IT Cloud & Data Consultant</span>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="inline-block">Project Manager</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Button to open PDF viewer */}
          <button 
            onClick={handleOpenPDF} 
            className="bg-white text-green-400 py-2 px-4 md:py-3 md:px-5 rounded-lg font-sans font-semibold tracking-wide transition-all duration-300 hover:bg-green-400 hover:text-white text-sm md:text-base"
          >
            View Resume
          </button>
          <SocialIcons />
        </div>

        <div className="mt-8 max-w-md mx-auto">
          <div className="rounded-full bg-white bg-opacity-10 backdrop-blur-sm p-3 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-opacity-20">
            <p className="text-xs text-center text-gray-200 font-light transition-all duration-300 ease-in-out hover:text-sm hover:text-black hover:bg-opacity-100">
              {isBraveBrowser 
                ? "You're viewing a special Brave Browser rendering! For the original Three.js experience, please check out my site on another browser."
                : ""}
            </p>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
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

export default BraveHeroSection;