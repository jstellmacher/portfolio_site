"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaTools,
  FaRegSmile,
  FaBriefcase,
  FaFolderOpen,
  FaEnvelope,
  FaCubes,
  FaNewspaper,
  FaChevronDown,
} from "react-icons/fa";

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [skillsOpen, setSkillsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll shrink
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isMobile === null) {
    return <nav className="sticky top-0 z-50 px-6 py-3 bg-transparent" />;
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`
        sticky top-0 z-50 px-6 flex items-center justify-between transition-all duration-300 border-b shadow-lg
        ${isScrolled ? "py-2" : "py-4"}
        bg-white/40 backdrop-blur-xl border-white/30
        dark:bg-black/80 dark:border-black/60
      `}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight transition text-black dark:text-white hover:opacity-80"
      >
        Jai Stellmacher
      </Link>

      {/* Desktop Nav */}
      {!isMobile && (
        <div className="flex items-center space-x-8 relative">
          {/* Home */}
          <Link
            href="/#hero"
            className="group flex items-center gap-2 text-sm font-medium transition relative text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"
          >
            <FaHome className="text-blue-500 dark:text-blue-400" />
            Home
            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
          </Link>

          {/* About */}
          <Link
            href="/#about"
            className="group flex items-center gap-2 text-sm font-medium transition relative text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"
          >
            <FaUser className="text-blue-500 dark:text-blue-400" />
            About
            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
          </Link>

          {/* Skills Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSkillsOpen(!skillsOpen)}
              className="group flex items-center gap-2 text-sm font-medium transition text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"
            >
              <FaTools className="text-blue-500 dark:text-blue-400" />
              Skills
              <FaChevronDown
                className={`text-xs transition-transform ${skillsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {skillsOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-[9999]">
                <Link
                  href="/#technical-skills"
                  className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setSkillsOpen(false)}
                >
                  Technical Skills
                </Link>
                <Link
                  href="/#soft-skills"
                  className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setSkillsOpen(false)}
                >
                  Soft Skills
                </Link>
              </div>
            )}
          </div>

          {/* Work Experience */}
          <Link
            href="/#experience"
            className="group flex items-center gap-2 text-sm font-medium transition relative text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"
          >
            <FaBriefcase className="text-blue-500 dark:text-blue-400" />
            Work Experience
            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
          </Link>

          {/* Projects */}
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-sm font-medium transition relative text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"
          >
            <FaFolderOpen className="text-blue-500 dark:text-blue-400" />
            Projects
            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
          </Link>

          {/* Contact */}
          <Link
            href="/#contact"
            className="group flex items-center gap-2 text-sm font-medium transition relative text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"
          >
            <FaEnvelope className="text-blue-500 dark:text-blue-400" />
            Contact Me
            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
          </Link>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="group flex items-center gap-2 text-sm font-medium transition text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"
            >
              More
              <FaChevronDown
                className={`text-xs transition-transform ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>

            {moreOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-[9999]">
                <Link
                  href="/miniApps"
                  className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMoreOpen(false)}
                >
                  Mini Apps
                </Link>
                <Link
                  href="/articles"
                  className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMoreOpen(false)}
                >
                  My Articles
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMenu}
          className="text-2xl text-gray-800 dark:text-gray-200 transition"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* Mobile Dropdown */}
      {isMobile && isMenuOpen && (
        <div
          className="
            absolute top-full left-0 w-full px-6 py-4 flex flex-col space-y-4
            transition-all shadow-xl border-t
            bg-white/70 backdrop-blur-xl border-white/30
            dark:bg-black/90 dark:border-black/60
          "
        >
          <Link href="/#hero" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/#about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link href="/#technical-skills" onClick={() => setIsMenuOpen(false)}>
            Technical Skills
          </Link>
          <Link href="/#soft-skills" onClick={() => setIsMenuOpen(false)}>
            Soft Skills
          </Link>
          <Link href="/#experience" onClick={() => setIsMenuOpen(false)}>
            Work Experience
          </Link>
          <Link href="/#projects" onClick={() => setIsMenuOpen(false)}>
            Projects
          </Link>
          <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
            Contact Me
          </Link>
          <Link href="/miniApps" onClick={() => setIsMenuOpen(false)}>
            Mini Apps
          </Link>
          <Link href="/articles" onClick={() => setIsMenuOpen(false)}>
            My Articles
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
