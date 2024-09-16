"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ResumeGenerator = dynamic(() => import('../../components/ResumeGenerator'), {
  ssr: false,
});
const HourlySalary = dynamic(() => import('../../components/HourlySalary'), {
  ssr: false,
});
const LinkedinMsg = dynamic(() => import('../../components/LinkedinMsg'), {
  ssr: false,
});

export default function MiniApps() {
  const [showResumeGenerator, setShowResumeGenerator] = useState(false);
  const [showHourlySalary, setShowHourlySalary] = useState(false);
  const [showLinkedinMsg, setShowLinkedinMsg] = useState(false);

  const toggleResumeGenerator = () => setShowResumeGenerator(prev => !prev);
  const toggleHourlySalary = () => setShowHourlySalary(prev => !prev);
  const toggleLinkedinMsg = () => setShowLinkedinMsg(prev => !prev);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mini Apps</h1>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-wrap gap-4 mb-6">
          <button 
            onClick={toggleResumeGenerator}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showResumeGenerator ? 'Hide Resume Generator' : 'Show Resume Generator'}
          </button>
          
          <button 
            onClick={toggleHourlySalary}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showHourlySalary ? 'Hide Salary Converter' : 'Show Salary Converter'}
          </button>
          
          <button 
            onClick={toggleLinkedinMsg}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showLinkedinMsg ? 'Hide LinkedIn Message Maker' : 'Show LinkedIn Message Maker'}
          </button>
        </div>
        
        {showResumeGenerator && <ResumeGenerator />}
        {showHourlySalary && <HourlySalary />}
        {showLinkedinMsg && <LinkedinMsg />}
      </div>
    </div>
  );
}