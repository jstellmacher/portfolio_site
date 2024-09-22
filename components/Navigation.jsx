'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUser, FaBars, FaTimes, FaHome, FaRocket } from 'react-icons/fa';
import LoginForm from './LoginForm'; // Adjust the path as necessary

const Navigation = ({ pathname }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const smoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (e, href) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      if (pathname === '/') {
        smoothScroll(e, href);
      } else {
        window.location.href = `/${href}`;
      }
    } else {
      window.location.href = href;
    }
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav aria-label="Main navigation" className="flex items-center justify-between relative px-4 py-3 sm:py-2 sm:px-6">
      <div className="flex items-center overflow-x-auto mr-4 sm:rounded-lg"> 
        <Link href="/"
          className="flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-gray-800 text-white text-sm sm:text-base rounded-lg shadow-lg hover:bg-gray-700 hover:scale-105 active:bg-gray-900 transition-all duration-300 ease-in-out whitespace-nowrap"
          aria-label="Jai Stellmacher - Home"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
            scrollToTop();
          }}
        >
          <FaHome className="mr-2 text-lg sm:text-xl" />
          Jai Stellmacher
        </Link>
      </div>
  
      <div className="flex-grow" /> 
  
      {isMobile ? (
        <>
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
  
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-gray-900 py-2 z-50 overflow-x-auto">
              <div className="flex space-x-2 sm:space-x-4 flex-nowrap">
                <NavLink href="#about" label="About" color="green" mobile onClick={handleNavigation} smoothScroll={smoothScroll} />
                <NavLink href="#projects" label="Projects" color="blue" mobile onClick={handleNavigation} smoothScroll={smoothScroll} />
                <NavLink href="#experience" label="Work" color="yellow" mobile onClick={handleNavigation} smoothScroll={smoothScroll} />
                <NavLink href="#contact" label="Contact" color="purple" mobile onClick={handleNavigation} smoothScroll={smoothScroll} />
                <NavLink href="/miniApps" label="Mini Apps" color="red" mobile onClick={handleNavigation} />
                <LoginButton isLoggedIn={isLoggedIn} onClick={isLoggedIn ? handleLogout : handleLoginClick} mobile />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center space-x-2 sm:space-x-4 flex-nowrap overflow-x-auto whitespace-nowrap">
          <NavLink href="#about" label="About" color="green" onClick={handleNavigation} smoothScroll={smoothScroll} />
          <NavLink href="#projects" label="Projects" color="blue" onClick={handleNavigation} smoothScroll={smoothScroll} />
          <NavLink href="#experience" label="Work" color="yellow" onClick={handleNavigation} smoothScroll={smoothScroll} />
          <NavLink href="#contact" label="Contact" color="purple" onClick={handleNavigation} smoothScroll={smoothScroll} />
          <NavLink href="/miniApps" label="Mini Apps" color="red" icon={<FaRocket className="mr-2" />} onClick={handleNavigation} />
          <LoginButton isLoggedIn={isLoggedIn} onClick={isLoggedIn ? handleLogout : handleLoginClick} />
        </div>
      )}
  
      {showLoginForm && (
        <LoginForm onClose={() => setShowLoginForm(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </nav>
  );
  
};

const NavLink = ({ href, label, color, mobile, onClick, smoothScroll, icon }) => (
  <a 
    href={href} 
    onClick={(e) => {
      if (href.startsWith('#') && smoothScroll) {
        smoothScroll(e, href);
      }
      if (onClick) onClick(e, href);
    }}
    className={`
      ${mobile ? 'block py-2 text-white' : `px-3 py-1 sm:px-4 sm:py-2 bg-${color}-500 text-white text-sm sm:text-base rounded-lg shadow-md hover:bg-${color}-600 active:bg-${color}-700 flex items-center whitespace-nowrap`}
      transition duration-300
    `}
    aria-label={`${label} ${href.startsWith('#') ? 'section' : 'page'}`}
  >
    {icon}
    {label}
  </a>
);

const LoginButton = ({ isLoggedIn, onClick, mobile }) => (
  <button
    onClick={onClick}
    className={`
      ${mobile ? 'w-full text-left py-2 text-white' : 'p-1 sm:p-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 active:bg-orange-700 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10'}
      transition duration-300
    `}
    aria-label={isLoggedIn ? "Logout" : "Login"}
  >
    {mobile ? (isLoggedIn ? "Logout" : "Login") : <FaUser className="text-lg sm:text-xl" />}
  </button>
);

export default Navigation;
