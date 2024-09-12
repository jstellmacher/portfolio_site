import React from 'react';
import { FaLinkedin, FaGithub, FaDev, FaGoogleDrive } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="flex space-x-4">
      <a href="https://www.linkedin.com/in/jaichuang-stellmacher/" className="text-white hover:text-blue-500 transition-colors duration-300" aria-label="LinkedIn" title="LinkedIn">
        <FaLinkedin className="w-10 h-10" />
      </a>
      <a href="https://github.com/jstellmacher" className="text-white hover:text-purple-500 transition-colors duration-300" aria-label="GitHub" title="GitHub">
        <FaGithub className="w-10 h-10" />
      </a>
      <a href="https://docs.google.com/document/d/1VLkC0Zy2qz4mmUR__-OPIQ1Gn7AhhFv5b41P0xn1PIc/edit?usp=sharing" className="text-white hover:text-red-500 transition-colors duration-300" aria-label="Google Docs" title="Google Docs">
        <FaGoogleDrive className="w-10 h-10" />
      </a>
      <a href="https://dev.to/jstellmacher" className="text-white hover:text-green-500 transition-colors duration-300" aria-label="Dev.to" title="Dev.to">
        <FaDev className="w-10 h-10" />
      </a>
    </div>
  );
};

export default SocialIcons;