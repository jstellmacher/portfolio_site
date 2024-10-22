import React from 'react';
import { FaLinkedin, FaGithub, FaDev, FaGoogleDrive } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="flex space-x-4">
      <a 
        href="https://www.linkedin.com/in/jaichuang-stellmacher/" 
        className="text-gray-800 hover:text-blue-500 transition-colors duration-300 dark:text-white" // Change text color
        aria-label="LinkedIn" 
        title="LinkedIn" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaLinkedin className="w-10 h-10" />
      </a>
      <a 
        href="https://github.com/jstellmacher" 
        className="text-gray-800 hover:text-purple-500 transition-colors duration-300 dark:text-white" // Change text color
        aria-label="GitHub" 
        title="GitHub" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaGithub className="w-10 h-10" />
      </a>
      <a 
        href="https://docs.google.com/document/d/1VLkC0Zy2qz4mmUR__-OPIQ1Gn7AhhFv5b41P0xn1PIc/edit?usp=sharing" 
        className="text-gray-800 hover:text-red-500 transition-colors duration-300 dark:text-white" // Change text color
        aria-label="Google Docs" 
        title="Google Docs" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaGoogleDrive className="w-10 h-10" />
      </a>
      <a 
        href="https://dev.to/jstellmacher" 
        className="text-gray-800 hover:text-gray-600 transition-colors duration-300 dark:text-white" // Change text color
        aria-label="Dev.to" 
        title="Dev.to" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaDev className="w-10 h-10" />
      </a>
    </div>
  );
};

export default SocialIcons;
