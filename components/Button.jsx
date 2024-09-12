// src/components/Button.jsx
'use client';

import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button 
      className="bg-white text-green-500 font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;