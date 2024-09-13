import React from 'react';

const PulsatingCircle = () => {
  return (
    <div className="relative w-24 h-24 ml-4">
      <div className="w-full h-full bg-blue-500 rounded-full animate-pulse opacity-70"></div>
    </div>
  );
};

export default PulsatingCircle;
