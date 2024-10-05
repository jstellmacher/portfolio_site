import React from 'react';
import Loader from '../../components/Loader'; // Ensure this path is correct

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Loader /> 
      <h2 className="mt-5 text-2xl text-gray-800 animate-pulse">Loading, please wait...</h2>
    </div>
  );
};

export default LoadingPage;