// app/page.jsx
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
import GltfCanvas from '../components/GltfBackgroundModel'; // Correct import for the GLTF model component

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
      <GltfCanvas scrollY={scrollY} /> {/* Add the GLTF model in the background */}
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