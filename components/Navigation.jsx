// components/Navigation.js
import React, { useState } from 'react';
import Link from 'next/link';
import LoginForm from './LoginForm'; // We'll create this component next
import { FaUser } from 'react-icons/fa'; // Import the user icon

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

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

  return (
    <nav aria-label="Main navigation" className="flex items-center justify-between relative">
      <Link href="/"
        className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 active:bg-gray-900 transition duration-300"
        aria-label="Jai Stellmacher - Back to top"
      >
        Jai Stellmacher
      </Link>
      <div className="flex items-center space-x-4">
        <a 
          href="#about" 
          onClick={(e) => smoothScroll(e, '#about')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 active:bg-green-700 transition duration-300"
          aria-label="About section"
        >
          About
        </a>
        <a 
          href="#projects" 
          onClick={(e) => smoothScroll(e, '#projects')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 transition duration-300"
          aria-label="Projects section"
        >
          Projects
        </a>
        <a 
          href="#contact" 
          onClick={(e) => smoothScroll(e, '#contact')}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 active:bg-purple-700 transition duration-300"
          aria-label="Contact section"
        >
          Contact
        </a>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 active:bg-red-700 transition duration-300 flex items-center justify-center w-10 h-10"
            aria-label="Logout"
          >
            <FaUser className="text-xl" />
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            className="p-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 active:bg-yellow-700 transition duration-300 flex items-center justify-center w-10 h-10"
            aria-label="Login"
          >
            <FaUser className="text-xl" />
          </button>
        )}
      </div>
      {showLoginForm && (
        <LoginForm onClose={() => setShowLoginForm(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </nav>
  );
};

export default Navigation;