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
const SQLGame = dynamic(() => import('../../components/SQLGame'), {
  ssr: false,
});
const CoinFlip = dynamic(() => import('../../components/CoinFlip'), {
  ssr: false,
});
const Checkers = dynamic(() => import('../../components/Checkers'), {
  ssr: false,
});
const StickyNotes = dynamic(() => import('../../components/StickyNote'), {
  ssr: false,
});

export default function MiniApps() {
  const [showResumeGenerator, setShowResumeGenerator] = useState(false);
  const [showHourlySalary, setShowHourlySalary] = useState(false);
  const [showLinkedinMsg, setShowLinkedinMsg] = useState(false);
  const [showSQLGame, setShowSQLGame] = useState(false);
  const [showCoinFlip, setShowCoinFlip] = useState(false);
  const [showCheckers, setShowCheckers] = useState(false);
  const [showStickyNotes, setShowStickyNotes] = useState(false);

  const toggleResumeGenerator = () => setShowResumeGenerator(prev => !prev);
  const toggleHourlySalary = () => setShowHourlySalary(prev => !prev);
  const toggleLinkedinMsg = () => setShowLinkedinMsg(prev => !prev);
  const toggleSQLGame = () => setShowSQLGame(prev => !prev);
  const toggleCoinFlip = () => setShowCoinFlip(prev => !prev);
  const toggleCheckers = () => setShowCheckers(prev => !prev);
  const toggleStickyNotes = () => setShowStickyNotes(prev => !prev);

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
          
          <button 
            onClick={toggleSQLGame}
            className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showSQLGame ? 'Hide SQL Game' : 'Show SQL Game'}
          </button>
          
          <button 
            onClick={toggleCoinFlip}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showCoinFlip ? 'Hide Coin Flip Game' : 'Show Coin Flip Game'}
          </button>
          
          <button 
            onClick={toggleCheckers}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showCheckers ? 'Hide Checkers' : 'Show Checkers'}
          </button>
          
          <button 
            onClick={toggleStickyNotes}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showStickyNotes ? 'Hide Sticky Notes' : 'Show Sticky Notes'}
          </button>
        </div>
        
        {showResumeGenerator && <ResumeGenerator />}
        {showHourlySalary && <HourlySalary />}
        {showLinkedinMsg && <LinkedinMsg />}
        {showSQLGame && <SQLGame />}
        {showCoinFlip && <CoinFlip />}
        {showCheckers && <Checkers />}
        {showStickyNotes && <StickyNotes />}
      </div>
    </div>
  );
}