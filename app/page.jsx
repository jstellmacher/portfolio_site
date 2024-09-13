'use client';

import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CTASection from '../components/CTASection';
import IconSkills from '../components/IconSkills';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import FloatingSquid from '../components/FloatingSquid'; // Import the FloatingSquid component
import ExperienceSection from '../components/Experience'; // Import the ExperienceSection component
import SoftSkills from '../components/SoftSkills'; // Import the SoftSkills component
import ConditionalFloatingSquid from '../components/ConditionalFloatingSquid';

const Page = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <HeroSection />
      <CTASection />
      <IconSkills />
      <SoftSkills />
      <ExperienceSection /> {/* Add the ExperienceSection here */}
      <ProjectsSection />
      <ContactSection />
      
      <ConditionalFloatingSquid scrollY={scrollY} /> {/* Replacing FloatingCube with FloatingSquid */}
    </>
  );
};

export default Page;