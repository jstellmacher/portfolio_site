// components/HeroSection.js
'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/legacy/image";
import SocialIcons from './SocialIcons';
import BraveHeroSection from './BraveHeroSection';
import ReCenterButton from './Meditation/ReCenter';
import { FaStar, FaChartLine, FaCog, FaUser } from 'react-icons/fa';

const HeroSection = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    setIsFlipped(!isFlipped);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isBraveBrowser) {
    return <BraveHeroSection />;
  }

  return (
    <div className="relative bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-10`}>
        <button 
          className="absolute top-4 right-4 text-white"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? 'Close' : 'Open'}
        </button>
        <nav className="mt-16 space-y-4">
          <a href="#overview" className="block px-6 py-3 hover:bg-blue-700">
            <FaChartLine className="inline-block mr-2" /> Overview
          </a>
          <a href="#profile" className="block px-6 py-3 hover:bg-blue-700">
            <FaUser className="inline-block mr-2" /> Profile
          </a>
          <a href="#settings" className="block px-6 py-3 hover:bg-blue-700">
            <FaCog className="inline-block mr-2" /> Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Hero Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-6">
            <div 
              className={`w-32 h-32 rounded-full overflow-hidden cursor-pointer transition-all duration-300 ${isFlipped ? 'rotate-y-180' : ''} hover:shadow-md`}
              onClick={handleImageClick}
            >
              <div className="relative w-full h-full transition-transform duration-500 transform-style-3d">
                <div className="absolute w-full h-full backface-hidden">
                  <Image
                    src="/assets/thumbsup-removebg-preview.png"
                    alt="Jaichuang Stellmacher giving a thumbs up"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-green-400 flex items-center justify-center text-black font-bold text-2xl p-4 text-center">
                  Full-Stack Developer<br/>IT Consultant<br/>Project Manager
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold">Jaichuang Stellmacher</h1>
              <h2 className="text-lg text-gray-700">Full-Stack Developer | IT Cloud & Data Consultant | Project Manager</h2>
              <div className="mt-4">
                <button 
                  onClick={handleOpenPDF} 
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-blue-700"
                >
                  View Resume
                </button>
                <SocialIcons />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white">Widget 1</h3>
            <p className="text-white">Some content here</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white">Widget 2</h3>
            <p className="text-white">Another widget</p>
          </div>
          <div className="bg-gradient-to-r from-orange-400 to-red-500 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white">Widget 3</h3>
            <p className="text-white">More content here</p>
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
                src="/assets/JaichuangStellmacher_Template.pdf"
                className="w-full flex-grow border-2 border-gray-300 rounded"
                title="Resume PDF"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
