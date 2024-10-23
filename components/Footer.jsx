import React from 'react';

const Footer = ({ name = 'Jai Stellmacher', links = [] }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-sm">© {currentYear} {name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
