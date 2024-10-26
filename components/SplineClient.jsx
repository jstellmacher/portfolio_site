import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline/next';

const SplineClient = () => {
  const splineRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (splineRef.current) {
        const scrollY = window.scrollY;
        // Rotate scene based on scroll position; adjust multiplier for speed
        splineRef.current.emitEvent('rotation', {
          x: scrollY * 0.001, // Rotate around x-axis
          y: scrollY * 0.002, // Rotate around y-axis
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Spline
      scene="https://prod.spline.design/OByGerTWe3vZcD7r/scene.splinecode"
      ref={splineRef}
    />
  );
};

export default SplineClient;