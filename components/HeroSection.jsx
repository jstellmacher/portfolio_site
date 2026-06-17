"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SocialIcons from "./SocialIcons";
import BraveHeroSection from "./BraveHeroSection";

const HeroSection = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }

    const detectBrave = async () => {
      if (navigator.brave && (await navigator.brave.isBrave())) {
        setIsBraveBrowser(true);
      }
    };
    detectBrave();
  }, []);

  const handleOpenPDF = () => setShowPDF(true);
  const handleClosePDF = () => setShowPDF(false);
  const handleImageClick = () => setIsFlipped((prev) => !prev);

  const handleAudioEnded = () => {
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  if (isBraveBrowser) return <BraveHeroSection />;

  return (
    <div className="relative bg-transparent text-[var(--foreground)] min-h-screen py-10">
      {/* ⭐ MOBILE LAYOUT */}
      {isMobile ? (
        <div className="flex flex-col items-center text-center px-6 space-y-6 mt-10">
          {/* Mobile Image */}
          <div
            className={`w-48 h-48 rounded-full overflow-hidden cursor-pointer transition-all duration-300 ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={handleImageClick}
          >
            <div className="relative w-full h-full transition-transform duration-500 transform-style-3d">
              <div className="absolute w-full h-full backface-hidden">
                <Image
                  src="/assets/jaihead_highqual.png"
                  alt="Jaichuang Stellmacher"
                  width={800}
                  height={800}
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-green-400 flex items-center justify-center text-black font-bold text-lg p-4 text-center">
                Full-Stack Developer
                <br />
                IT Consultant
                <br />
                Project Manager
              </div>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold font-serif text-black dark:text-white">
            Jaichuang Stellmacher
          </h1>

          {/* Subtitle */}
          <h2 className="text-sm font-light font-sans tracking-wide dark:text-gray-300 text-gray-700 leading-relaxed">
            Full-Stack Developer
            <br />
            IT Cloud & Data Consultant
            <br />
            Project Manager
          </h2>

          {/* Buttons */}
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleOpenPDF}
              className="bg-black text-white py-2 px-6 rounded-lg font-semibold tracking-wide transition-all duration-300 hover:bg-green-400 hover:text-black dark:bg-white dark:text-black dark:hover:bg-green-400"
            >
              View Resume
            </button>
            <SocialIcons />
          </div>

          {/* Audio */}
          <audio
            controls
            ref={audioRef}
            onEnded={handleAudioEnded}
            className="w-full max-w-xs"
          >
            <source src="/assets/Jai_pronounce.m4a" type="audio/mp4" />
          </audio>
        </div>
      ) : (
        /* ⭐ MODERN DESKTOP LAYOUT */
        <div className="flex items-center justify-center min-h-screen px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">
            {/* LEFT SIDE — TEXT + BUTTONS */}
            <div className="flex flex-col space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold font-serif text-black dark:text-white leading-tight">
                Jaichuang Stellmacher
              </h1>

              <h2 className="text-lg lg:text-xl font-light text-gray-700 dark:text-gray-300 leading-relaxed">
                Full‑Stack Developer
                <span className="mx-2">•</span>
                IT Cloud & Data Consultant
                <span className="mx-2">•</span>
                Project Manager
              </h2>

              {/* BUTTONS */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleOpenPDF}
                  className="bg-black text-white py-3 px-6 rounded-lg font-semibold tracking-wide transition-all duration-300 hover:bg-green-400 hover:text-black dark:bg-white dark:text-black dark:hover:bg-green-400"
                >
                  View Resume
                </button>

                <SocialIcons />
              </div>

              {/* AUDIO */}
              <audio
                controls
                ref={audioRef}
                onEnded={handleAudioEnded}
                className="w-full max-w-sm"
              >
                <source src="/assets/Jai_pronounce.m4a" type="audio/mp4" />
              </audio>
            </div>

            {/* RIGHT SIDE — IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <div
                className={`relative w-80 h-80 rounded-full overflow-hidden cursor-pointer transition-all duration-500 ${
                  isFlipped ? "rotate-y-180" : ""
                } hover:shadow-2xl`}
                onClick={handleImageClick}
              >
                <div className="absolute inset-0 transition-transform duration-500 transform-style-3d">
                  {/* FRONT */}
                  <div className="absolute inset-0 backface-hidden">
                    <Image
                      src="/assets/jaihead_highqual.png"
                      alt="Jaichuang Stellmacher"
                      width={1200}
                      height={1200}
                      className="rounded-full object-cover"
                    />
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-green-400 flex items-center justify-center text-black font-bold text-2xl p-4 text-center">
                    Full‑Stack Developer
                    <br />
                    IT Consultant
                    <br />
                    Project Manager
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Modal */}
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
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
