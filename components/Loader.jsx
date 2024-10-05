import React from 'react';
import './Loader.css';

const ECGLoader = () => {
  return (
    <div className="loader-container">
      <svg
        className="ecg-loader"
        viewBox="0 0 200 125"
        height="125"
        width="200"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          className="ecg-track"
          strokeWidth="12" // Increased stroke width for visibility
          fill="none"
          pathLength="100"
          d="M3.125 85 h41 l15 -19 l29.5 60 l39 -120 l29.5 83.5 v0 h41"
        />
        <path
          className="ecg-car"
          strokeWidth="12" // Increased stroke width for visibility
          fill="none"
          pathLength="100"
          d="M3.125 85 h41 l15 -19 l29.5 60 l39 -120 l29.5 83.5 v0 h41"
        />
      </svg>
      <p className="loading-text">Loading, please wait...</p> {/* Added loading text */}
    </div>
  );
};

export default ECGLoader;