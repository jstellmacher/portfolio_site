// components/Layout.js
'use client';

import './global.css'; // Import global styles
import Navigation from '../components/Navigation'; // Import the Navigation component

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className='bg-gradient-to-r from-green-400 to-blue-500'>
        <header className="bg-white/30 backdrop-blur-md text-white p-4 shadow-md fixed w-full top-0 left-0 z-50" aria-label="Site Header">
          <div className="container mx-auto">
            <Navigation />
          </div>
        </header>
        <main className="pt-16 flex-grow">{children}</main>
        <footer className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 text-center" aria-label="Site Footer">
          <p>&copy; {new Date().getFullYear()} Jai Stellmacher. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;