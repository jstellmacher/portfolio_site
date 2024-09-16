'use client';

import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Loader from './Loader';

const ClientLayout = ({ children, pathname }) => {
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);
  const [loading, setLoading] = useState(true);

  const showNav = pathname !== '/meditation';

  useEffect(() => {
    const detectBrave = async () => {
      if (navigator.brave && await navigator.brave.isBrave()) {
        setIsBraveBrowser(true);
      }
    };

    detectBrave();

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {showNav && (
        <header className="bg-white/30 backdrop-blur-md text-white p-4 shadow-md fixed w-full top-0 left-0 z-50" aria-label="Site Header">
          <div className="container mx-auto">
            <Navigation pathname={pathname} />
          </div>
        </header>
      )}
      <main className={`${showNav ? 'pt-16' : ''} flex-grow`}>
        {children}
      </main>
      <footer className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 text-center" aria-label="Site Footer">
        <p>&copy; {new Date().getFullYear()} Jai Stellmacher. All rights reserved.</p>
      </footer>
    </>
  );
};

export default ClientLayout;
