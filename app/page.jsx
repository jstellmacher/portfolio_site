"use client";

import { useState, useEffect } from "react";

import HeroSection from "../components/HeroSection";
import CTASection from "../components/CTASection";
import IconSkills from "../components/TechnicalSkills";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import ExperienceSection from "../components/Experience";
import SoftSkills from "../components/SoftSkills";
import Footer from "../components/Footer";

const Page = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Allow the client to fully hydrate before rendering anything
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Optional: you can return null instead if you don't want a black screen
    return <div className="w-full h-screen bg-black" />;
  }

  return (
    <>
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
