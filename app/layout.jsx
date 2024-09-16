'use client';

import './global.css';
import { Montserrat, Playfair_Display } from 'next/font/google';
import ClientWrapper from '../components/ClientWrapper';

// Load Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const Layout = ({ children }) => {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className='bg-gradient-to-r from-green-400 to-blue-500 font-sans'>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
};

export default Layout;