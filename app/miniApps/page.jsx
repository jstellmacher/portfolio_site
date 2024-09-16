"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FaFileAlt, FaMoneyBillWave, FaLinkedin, FaDatabase, FaCoins, FaChessBoard, FaStickyNote, FaCode, FaBirthdayCake, FaAlignLeft, FaShoppingCart, FaGamepad, FaPalette, FaCalculator, FaCalendarAlt } from 'react-icons/fa';

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
const AgeCalculator = dynamic(() => import('../../components/Age'), {
  ssr: false,
});
const Calculator = dynamic(() => import('../../components/Calculator'), {
  ssr: false,
});
const Birthday = dynamic(() => import('../../components/Birthday'), {
  ssr: false,
});

export default function MiniApps() {
  const [activeApp, setActiveApp] = useState(null);

  const toggleApp = (app) => {
    setActiveApp(activeApp === app ? null : app);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mini Apps</h1>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-wrap gap-4 mb-6">
          <button 
            onClick={() => toggleApp('resumeGenerator')}
            className={`${activeApp === 'resumeGenerator' ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaFileAlt className="mr-2" />
            {activeApp === 'resumeGenerator' ? 'Hide Resume Generator' : 'Show Resume Generator'}
          </button>
          
          <button 
            onClick={() => toggleApp('hourlySalary')}
            className={`${activeApp === 'hourlySalary' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaMoneyBillWave className="mr-2" />
            {activeApp === 'hourlySalary' ? 'Hide Salary Converter' : 'Show Salary Converter'}
          </button>
          
          <button 
            onClick={() => toggleApp('linkedinMsg')}
            className={`${activeApp === 'linkedinMsg' ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-800'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaLinkedin className="mr-2" />
            {activeApp === 'linkedinMsg' ? 'Hide LinkedIn Message Maker' : 'Show LinkedIn Message Maker'}
          </button>
          
          <button 
            onClick={() => toggleApp('sqlGame')}
            className={`${activeApp === 'sqlGame' ? 'bg-purple-800' : 'bg-purple-600 hover:bg-purple-800'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaDatabase className="mr-2" />
            {activeApp === 'sqlGame' ? 'Hide SQL Game' : 'Show SQL Game'}
          </button>
          
          <button 
            onClick={() => toggleApp('coinFlip')}
            className={`${activeApp === 'coinFlip' ? 'bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaCoins className="mr-2" />
            {activeApp === 'coinFlip' ? 'Hide Coin Flip Game' : 'Show Coin Flip Game'}
          </button>
          
          <button 
            onClick={() => toggleApp('checkers')}
            className={`${activeApp === 'checkers' ? 'bg-red-700' : 'bg-red-500 hover:bg-red-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaChessBoard className="mr-2" />
            {activeApp === 'checkers' ? 'Hide Checkers' : 'Show Checkers'}
          </button>
          
          <button 
            onClick={() => toggleApp('stickyNote')}
            className={`${activeApp === 'stickyNote' ? 'bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaStickyNote className="mr-2" />
            {activeApp === 'stickyNote' ? 'Hide Sticky Notes' : 'Show Sticky Notes'}
          </button>
          
          <button 
            onClick={() => toggleApp('jsCodeEditor')}
            className={`${activeApp === 'jsCodeEditor' ? 'bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaCode className="mr-2" />
            {activeApp === 'jsCodeEditor' ? 'Hide JS Code Editor' : 'Show JS Code Editor'}
          </button>
          
          <button 
            onClick={() => toggleApp('birthdayCountdown')}
            className={`${activeApp === 'birthdayCountdown' ? 'bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaBirthdayCake className="mr-2" />
            {activeApp === 'birthdayCountdown' ? 'Hide Birthday Countdown' : 'Show Birthday Countdown'}
          </button>
          
          <button 
            onClick={() => toggleApp('customLoremIpsum')}
            className={`${activeApp === 'customLoremIpsum' ? 'bg-indigo-600' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaAlignLeft className="mr-2" />
            {activeApp === 'customLoremIpsum' ? 'Hide Custom Lorem Ipsum' : 'Show Custom Lorem Ipsum'}
          </button>
          
          <button 
            onClick={() => toggleApp('groceryList')}
            className={`${activeApp === 'groceryList' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaShoppingCart className="mr-2" />
            {activeApp === 'groceryList' ? 'Hide Grocery List' : 'Show Grocery List'}
          </button>
          
          <button 
            onClick={() => toggleApp('platformerGame')}
            className={`${activeApp === 'platformerGame' ? 'bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaGamepad className="mr-2" />
            {activeApp === 'platformerGame' ? 'Hide Platformer Game' : 'Show Platformer Game'}
          </button>
          
          <button 
            onClick={() => toggleApp('colorTools')}
            className={`${activeApp === 'colorTools' ? 'bg-indigo-600' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaPalette className="mr-2" />
            {activeApp === 'colorTools' ? 'Hide Color Tools' : 'Show Color Tools'}
          </button>
          
          <button 
            onClick={() => toggleApp('ageCalculator')}
            className={`${activeApp === 'ageCalculator' ? 'bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaCalculator className="mr-2" />
            {activeApp === 'ageCalculator' ? 'Hide Age Calculator' : 'Show Age Calculator'}
          </button>
          
          <button 
            onClick={() => toggleApp('calculator')}
            className={`${activeApp === 'calculator' ? 'bg-gray-900' : 'bg-gray-800 hover:bg-gray-900'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaCalculator className="mr-2" />
            {activeApp === 'calculator' ? 'Hide Calculator' : 'Show Calculator'}
          </button>
          
          <button 
            onClick={() => toggleApp('birthday')}
            className={`${activeApp === 'birthday' ? 'bg-pink-700' : 'bg-pink-500 hover:bg-pink-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FaCalendarAlt className="mr-2" />
            {activeApp === 'birthday' ? 'Hide Birthday Calendar' : 'Show Birthday Calendar'}
          </button>
        </div>
        
        {activeApp === 'resumeGenerator' && <ResumeGenerator />}
        {activeApp === 'hourlySalary' && <HourlySalary />}
        {activeApp === 'linkedinMsg' && <LinkedinMsg />}
        {activeApp === 'sqlGame' && <SQLGame />}
        {activeApp === 'coinFlip' && <CoinFlip />}
        {activeApp === 'checkers' && <Checkers />}
        {activeApp === 'stickyNote' && <StickyNote />}
        {activeApp === 'jsCodeEditor' && <JSCodeEditor />}
        {activeApp === 'birthdayCountdown' && <BirthdayCountdown />}
        {activeApp === 'customLoremIpsum' && <CustomLoremIpsum />}
        {activeApp === 'groceryList' && <GroceryList />}
        {activeApp === 'platformerGame' && (
          <div className="w-full mb-6">
            <PlatformerGame />
          </div>
        )}
        {activeApp === 'colorTools' && <ColorTools />}
        {activeApp === 'ageCalculator' && <AgeCalculator />}
        {activeApp === 'calculator' && <Calculator />}
        {activeApp === 'birthday' && <Birthday />}
      </div>
    </div>
  );
}