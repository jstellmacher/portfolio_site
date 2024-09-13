'use client';

import { useState, useEffect } from 'react';
import FloatingSquid from './FloatingSquid';

const ConditionalFloatingSquid = ({ scrollY }) => {
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);

  useEffect(() => {
    const detectBrave = async () => {
      if (navigator.brave && (await navigator.brave.isBrave())) {
        setIsBraveBrowser(true);
      }
    };

    detectBrave();
  }, []);

  if (isBraveBrowser) {
    return null; // Return nothing for Brave browser
  }

  return <FloatingSquid scrollY={scrollY} />;
};

export default ConditionalFloatingSquid;
