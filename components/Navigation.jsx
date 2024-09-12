// components/Navigation.js
import React from 'react';
import Link from 'next/link';

const Navigation = () => {
  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Main navigation" className="flex items-center justify-between">
      <Link href="/"
        className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 active:bg-gray-900 transition duration-300"
        aria-label="Jai Stellmacher - Back to top"
      >
        Jai Stellmacher
      </Link>
      <div className="flex space-x-4">
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
      </div>
    </nav>
  );
};

export default Navigation;