'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Spline component with SSR disabled
const SplineClient = dynamic(() => import('./SplineClient'), { ssr: false });

const SplineScene = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div
      className={`fixed ${isSmallScreen ? 'right-4 top-28' : 'right-0 top-0 bottom-0 w-1/2'} pointer-events-none flex items-center justify-center`}
      style={{ zIndex: -10 }} // Send the entire component to the furthest back
    >
      <div className={`relative ${isSmallScreen ? 'w-20 h-20' : 'w-[80vmin] h-[80vmin] max-w-[800px] max-h-[800px]'}`}>
        <SplineClient className="absolute inset-0" />
      </div>
    </div>
  );
};

export default SplineScene;