import React from 'react';
import { PongSpinner } from 'react-spinners-kit';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-90 z-50">
      <PongSpinner size={180} color="#00FFFF" loading={true} />
      <p className="mt-4 text-3xl font-bold text-white">Loading</p>
    </div>
  );
};

export default Loader;