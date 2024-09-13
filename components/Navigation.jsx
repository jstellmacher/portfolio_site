// components/Navigation.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LoginForm from './LoginForm'; // We'll create this component next
import { FaUser, FaBars, FaTimes, FaHome, FaBriefcase } from 'react-icons/fa'; // Added FaBriefcase icon

const Navigation = () => {
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

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <nav aria-label="Main navigation" className="flex items-center justify-between relative px-4 py-3 sm:py-2 sm:px-6">
      <div className="flex items-center">
        {!isMobile && (
          <button
            onClick={scrollToTop}
            className="mr-2 p-1 sm:p-2 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-green-900 active:bg-gray-800 transition duration-300"
            aria-label="Scroll to top"
          >
            <FaHome className="text-lg sm:text-xl" />
          </button>
        )}
        <Link href="/"
          className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-800 text-white text-sm sm:text-base rounded-lg shadow-lg hover:bg-gray-700 active:bg-gray-900 transition duration-300"
          aria-label="Jai Stellmacher - Back to top"
        >
          Jai Stellmacher
        </Link>
      </div>
      
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
            <div className="absolute top-full left-0 right-0 bg-gray-900 py-2 px-4 z-50">
              <NavLink href="#about" label="About" color="green" mobile onClick={toggleMenu} smoothScroll={smoothScroll} />
              <NavLink href="#projects" label="Projects" color="blue" mobile onClick={toggleMenu} smoothScroll={smoothScroll} />
              <NavLink href="#experience" label="Work" color="yellow" mobile onClick={toggleMenu} smoothScroll={smoothScroll} />
              <NavLink href="#contact" label="Contact" color="purple" mobile onClick={toggleMenu} smoothScroll={smoothScroll} />
              <LoginButton isLoggedIn={isLoggedIn} onClick={isLoggedIn ? handleLogout : handleLoginClick} mobile />
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center space-x-2 sm:space-x-4">
          <NavLink href="#about" label="About" color="green" smoothScroll={smoothScroll} />
          <NavLink href="#projects" label="Projects" color="blue" smoothScroll={smoothScroll} />
          <NavLink href="#experience" label="Work" color="yellow" smoothScroll={smoothScroll} />
          <NavLink href="#contact" label="Contact" color="purple" smoothScroll={smoothScroll} />
          <LoginButton isLoggedIn={isLoggedIn} onClick={isLoggedIn ? handleLogout : handleLoginClick} />
        </div>
      )}

      {showLoginForm && (
        <LoginForm onClose={() => setShowLoginForm(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </nav>
  );
};

const NavLink = ({ href, label, color, mobile, onClick, smoothScroll }) => (
  <a 
    href={href} 
    onClick={(e) => {
      smoothScroll(e, href);
      if (onClick) onClick();
    }}
    className={`
      ${mobile ? 'block py-2 text-white' : `px-3 py-1 sm:px-4 sm:py-2 bg-${color}-500 text-white text-sm sm:text-base rounded-lg shadow-md hover:bg-${color}-600 active:bg-${color}-700`}
      transition duration-300
    `}
    aria-label={`${label} section`}
  >
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