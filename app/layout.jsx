'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import './global.css';
import Navigation from '../components/Navigation';
import { Montserrat, Playfair_Display } from 'next/font/google';
import Loader from '../components/Loader'; // Import the Loader component

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
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Get the current pathname

  // Determine if navigation should be shown
  const showNav = pathname !== '/meditation';

  useEffect(() => {
    const detectBrave = async () => {
      if (navigator.brave && await navigator.brave.isBrave()) {
        setIsBraveBrowser(true);
      }
    };

    detectBrave();

    // Simulate a loading delay
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className='bg-gradient-to-r from-green-400 to-blue-500 font-sans'>
        {loading && <Loader />}
        {showNav && (
          <header className="bg-white/30 backdrop-blur-md text-white p-4 shadow-md fixed w-full top-0 left-0 z-50" aria-label="Site Header">
            <div className="container mx-auto">
              <Navigation />
            </div>
          </header>
        )}
        <main className={`${showNav ? 'pt-16' : ''} flex-grow`}>
          {children}
        </main>
        <footer className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 text-center" aria-label="Site Footer">
          <p>&copy; {new Date().getFullYear()} Jai Stellmacher. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;