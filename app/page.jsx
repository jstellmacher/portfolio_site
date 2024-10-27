'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CTASection from '../components/CTASection';
import IconSkills from '../components/TechnicalSkills';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import ExperienceSection from '../components/Experience';
import SoftSkills from '../components/SoftSkills';
import Footer from '../components/Footer';

// Dynamically import GltfCanvas with no SSR
const GltfCanvas = dynamic(() => import('../components/GltfBackgroundModel'), { ssr: false });

const Page = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const detectBrave = async () => {
      if (navigator.brave && (await navigator.brave.isBrave())) {
        setIsBraveBrowser(true);
      }
    };
    
    detectBrave();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {!isBraveBrowser && <GltfCanvas scrollY={scrollY} />}
      <HeroSection />
      <CTASection />
      <IconSkills />
      <SoftSkills />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Page;
