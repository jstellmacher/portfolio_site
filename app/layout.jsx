'use client';

import './global.css';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { useEffect, useState } from 'react';
import { BsEmojiSunglasses } from 'react-icons/bs';
import { GiNightSleep } from 'react-icons/gi';
import Navigation from '../components/Navigation'; // Adjusted import path

// Load Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const Layout = ({ children, pathname }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  // Load theme from local storage or system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    setIsDarkMode(theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  // Save theme to local storage when it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
<body className={`transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-purple-800' : 'bg-gradient-to-r from-[#ffffff] to-[#f7f7f7] text-foreground'} font-sans`}>
{/* Include the Navigation component here */}
        <Navigation pathname={pathname} />

        {/* Theme Toggle Button */}
        <div className="flex items-center justify-center my-4">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 focus:outline-none ${
              isDarkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-800 text-white'
            }`}
          >
            {isDarkMode ? (
              <GiNightSleep className="w-8 h-8" />
            ) : (
              <BsEmojiSunglasses className="w-8 h-8" />
            )}
          </button>
        </div>

        {children}
      </body>
    </html>
  );
};

export default Layout;
