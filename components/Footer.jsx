import React from 'react';
import Link from 'next/link';

const Footer = ({ name = 'Jai Stellmacher', links = [] }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark:text-white py-6 relative">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm">© {currentYear} {name}. All rights reserved.</p>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-6">
        <Link href="/credits" className="inline-block px-4 py-2 bg-white/10 text-white rounded-lg backdrop-blur-md hover:bg-white/20 transition">
          View Credits
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
