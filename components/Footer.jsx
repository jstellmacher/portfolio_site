import React from 'react';
import Link from 'next/link';

const Footer = ({ name = 'Jai Stellmacher', links = [] }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 relative">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 space-x-6"> {/* Added space-x-6 */}
        <p className="text-sm text-gray-700 dark:text-gray-100">
          © {currentYear} {name}. All rights reserved.
        </p>
        <Link
          href="/credits"
          className="inline-block px-4 py-2 bg-white/20 text-gray-700 dark:text-gray-100 border border-gray-400 dark:border-white rounded-lg shadow-md dark:shadow-lg backdrop-blur-md hover:bg-white/40 transition transform hover:scale-105 active:scale-95"
        >
          View Credits
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
