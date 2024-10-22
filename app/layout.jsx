'use client';

import './global.css';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { useEffect, useState } from 'react';

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

const Layout = ({ children }) => {
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
      <body className={`transition-colors duration-300 bg-gradient-to-r ${isDarkMode ? 'from-blue-900 to-purple-800' : 'from-white to-gray-200'} font-sans`}>
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="p-2 m-4 text-white bg-blue-700 rounded">
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        {children}
      </body>
    </html>
  );
};

export default Layout;
