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
const StickyNote = dynamic(() => import('../../components/StickyNote'), {
  ssr: false,
});
const JSCodeEditor = dynamic(() => import('../../components/JSCodeEditor'), {
  ssr: false,
});
const BirthdayCountdown = dynamic(() => import('../../components/BdayCountdown'), {
  ssr: false,
});
const CustomLoremIpsum = dynamic(() => import('../../components/LoremIpsum'), {
  ssr: false,
});
const GroceryList = dynamic(() => import('../../components/GroceryList'), {
  ssr: false,
});
const PlatformerGame = dynamic(() => import('../../components/PlatformerGame'), {
  ssr: false,
});
const ColorTools = dynamic(() => import('../../components/ColorTools'), {
  ssr: false,
});

export default function MiniApps() {
  const [showResumeGenerator, setShowResumeGenerator] = useState(false);
  const [showHourlySalary, setShowHourlySalary] = useState(false);
  const [showLinkedinMsg, setShowLinkedinMsg] = useState(false);
  const [showSQLGame, setShowSQLGame] = useState(false);
  const [showCoinFlip, setShowCoinFlip] = useState(false);
  const [showCheckers, setShowCheckers] = useState(false);
  const [showStickyNote, setShowStickyNote] = useState(false);
  const [showJSCodeEditor, setShowJSCodeEditor] = useState(false);
  const [showBirthdayCountdown, setShowBirthdayCountdown] = useState(false);
  const [showCustomLoremIpsum, setShowCustomLoremIpsum] = useState(false);
  const [showGroceryList, setShowGroceryList] = useState(false);
  const [showPlatformerGame, setShowPlatformerGame] = useState(false);
  const [showColorTools, setShowColorTools] = useState(false);

  const toggleResumeGenerator = () => setShowResumeGenerator(prev => !prev);
  const toggleHourlySalary = () => setShowHourlySalary(prev => !prev);
  const toggleLinkedinMsg = () => setShowLinkedinMsg(prev => !prev);
  const toggleSQLGame = () => setShowSQLGame(prev => !prev);
  const toggleCoinFlip = () => setShowCoinFlip(prev => !prev);
  const toggleCheckers = () => setShowCheckers(prev => !prev);
  const toggleStickyNote = () => setShowStickyNote(prev => !prev);
  const toggleJSCodeEditor = () => setShowJSCodeEditor(prev => !prev);
  const toggleBirthdayCountdown = () => setShowBirthdayCountdown(prev => !prev);
  const toggleCustomLoremIpsum = () => setShowCustomLoremIpsum(prev => !prev);
  const toggleGroceryList = () => setShowGroceryList(prev => !prev);
  const togglePlatformerGame = () => setShowPlatformerGame(prev => !prev);
  const toggleColorTools = () => setShowColorTools(prev => !prev);

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
            onClick={toggleStickyNote}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showStickyNote ? 'Hide Sticky Notes' : 'Show Sticky Notes'}
          </button>
          
          <button 
            onClick={toggleJSCodeEditor}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showJSCodeEditor ? 'Hide JS Code Editor' : 'Show JS Code Editor'}
          </button>
          
          <button 
            onClick={toggleBirthdayCountdown}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showBirthdayCountdown ? 'Hide Birthday Countdown' : 'Show Birthday Countdown'}
          </button>
          
          <button 
            onClick={toggleCustomLoremIpsum}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showCustomLoremIpsum ? 'Hide Custom Lorem Ipsum' : 'Show Custom Lorem Ipsum'}
          </button>
          
          <button 
            onClick={toggleGroceryList}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showGroceryList ? 'Hide Grocery List' : 'Show Grocery List'}
          </button>
          
          <button 
            onClick={togglePlatformerGame}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showPlatformerGame ? 'Hide Platformer Game' : 'Show Platformer Game'}
          </button>
          
          <button 
            onClick={toggleColorTools}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showColorTools ? 'Hide Color Tools' : 'Show Color Tools'}
          </button>
        </div>
        
        {showResumeGenerator && <ResumeGenerator />}
        {showHourlySalary && <HourlySalary />}
        {showLinkedinMsg && <LinkedinMsg />}
        {showSQLGame && <SQLGame />}
        {showCoinFlip && <CoinFlip />}
        {showCheckers && <Checkers />}
        {showStickyNote && <StickyNote />}
        {showJSCodeEditor && <JSCodeEditor />}
        {showBirthdayCountdown && <BirthdayCountdown />}
        {showCustomLoremIpsum && <CustomLoremIpsum />}
        {showGroceryList && <GroceryList />}
        {showPlatformerGame && (
          <div className="w-full mb-6">
            <PlatformerGame />
          </div>
        )}
        {showColorTools && <ColorTools />}
      </div>
    </div>
  );
}