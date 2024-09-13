'use client';

import { GiMeditation } from 'react-icons/gi';
import { BsTools } from 'react-icons/bs';
import { FaLaptopCode } from 'react-icons/fa';
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
import ReCenterButton from '../components/ReCenter'; // Ensure the import path is correct

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
      <div className="flex flex-col items-center mt-6 mb-8">
            <ReCenterButton />
            <p className="mt-2 text-xl text-gray-50 text-center flex items-center justify-center">
                <span className="mr-2 text-xl">
                    <BsTools />
                </span>
                I built and use this productivity tool daily!
                <span className="ml-2 text-xl">
                    <FaLaptopCode />
                </span>
            </p>
        </div>
      <CTASection />
      <IconSkills />
      <SoftSkills />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <ConditionalFloatingSquid scrollY={scrollY} />
    </>
  );
};

export default Page;