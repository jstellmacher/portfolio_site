'use client';

import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CTASection from '../components/CTASection';
import IconSkills from '../components/TechnicalSkills';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import ExperienceSection from '../components/Experience';
import SoftSkills from '../components/SoftSkills';
import Footer from '../components/Footer';
import GltfCanvas from '../components/GltfBackgroundModel'; // Your GLTF model component

const Page = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const detectBrave = async () => {
      // Check if the browser is Brave
      if (navigator.brave && (await navigator.brave.isBrave())) {
        setIsBraveBrowser(true);
      }
    };
    
    detectBrave(); // Call the Brave detection
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Render the GLTF model only if not using Brave */}
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