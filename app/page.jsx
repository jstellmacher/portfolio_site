'use client';

import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CTASection from '../components/CTASection';
import IconSkills from '../components/TechnicalSkills';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import ExperienceSection from '../components/Experience';
import SoftSkills from '../components/SoftSkills';
import ConditionalFloatingSquid from '../components/ConditionalFloatingSquid';
import Footer from '../components/Footer';

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
      <HeroSection  />
      <CTASection  />
      <IconSkills  />
      <SoftSkills  />
      <ExperienceSection />
      <ProjectsSection  />
      <ContactSection  />
      <ConditionalFloatingSquid scrollY={scrollY} />
      
      <Footer />
    </>
  );
};

export default Page;
