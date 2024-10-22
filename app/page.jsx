'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import CTASection from '../components/CTASection';
import IconSkills from '../components/IconSkills';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import ExperienceSection from '../components/Experience';
import SoftSkills from '../components/SoftSkills';
import ConditionalFloatingSquid from '../components/ConditionalFloatingSquid';
import FeedbackForm from '@/components/FeedbackForm';

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
      <HeroSection className="mb-8" />
      <CTASection className="mb-8" />
      <IconSkills className="mb-8" />
      <SoftSkills className="mb-8" />
      <ExperienceSection className="mb-8" />
      <ProjectsSection className="mb-8" />
      <ContactSection className="mb-8" />
      <FeedbackForm className="mb-8" />
      <ConditionalFloatingSquid scrollY={scrollY} />
    </>
  );
};


export default Page;