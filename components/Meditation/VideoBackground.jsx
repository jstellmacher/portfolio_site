// components/VideoBackground.jsx
import React from 'react';

const VideoBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
            >
                <source src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoBackground;