"use client"; // Add this line at the top

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { FaRegHandPointLeft, FaRegHandPointRight } from 'react-icons/fa'; // Import the icons

const InterestsPage = () => {
    const [tabsData, setTabsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/interests.json'); // Updated path
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setTabsData(data.tabs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="mt-4 p-6 max-w-5xl mx-auto space-y-8 bg-gray-50 rounded-lg shadow-lg">
            {/* Profile Header */}
            <ProfileHeader 
                name="Jaichuang Stellmacher"
                bio="Tech enthusiast, traveler, and foodie. Exploring the world one hobby at a time."
                profilePic="https://picsum.photos/200/330" // Replace with your profile picture URL
            />
            
            {/* Tabs with Animated Transitions */}
            <Tabs>
                {tabsData.map((tab, index) => (
                    <Tab key={index} title={tab.title}>
                        {tab.title === "Activities" && <CustomCarousel items={tab.items} />}
                        {tab.title === "Hobbies" && <AnimatedGrid items={tab.items} />}
                        {tab.title === "Volunteering" && <InteractiveList items={tab.items} />}
                        {tab.title === "Music" && <DynamicGrid items={tab.items} />}
                        {tab.title === "Food" && <HoverEffectGrid items={tab.items} />}
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
};

const ProfileHeader = ({ name, bio, profilePic }) => (
    <div className="relative flex items-center space-x-4 mb-8 p-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
        <img 
            src={profilePic} 
            alt={`${name}'s profile`} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg" 
        />
        <div>
            <h1 className="text-4xl font-bold">{name}</h1>
            <p className="text-lg mt-2">{bio}</p>
        </div>
    </div>
);

const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
        <div>
            <div className="flex border-b border-gray-300 mb-4">
                {React.Children.map(children, (child, index) => (
                    <button 
                        className={`flex-1 py-2 text-center text-lg font-semibold ${activeTab === index ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`} 
                        onClick={() => setActiveTab(index)}
                    >
                        {child.props.title}
                    </button>
                ))}
            </div>
            <div className="transition-transform duration-500 ease-in-out">
                {React.Children.toArray(children)[activeTab]}
            </div>
        </div>
    );
};

const Tab = ({ children }) => <>{children}</>;

const CustomCarousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
        <div className="relative w-full h-80">
            {/* Slide Container */}
            <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${items[currentIndex].img})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl font-bold p-4">
                    {items[currentIndex].name}
                </div>
            </div>

            {/* Previous Button */}
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <FaRegHandPointLeft size={24} />
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <FaRegHandPointRight size={24} />
            </button>
        </div>
    );
};

const AnimatedGrid = ({ items }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
            <div 
                key={index} 
                className="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-110 hover:shadow-2xl"
            >
                <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-40 object-cover rounded-md mb-4" 
                />
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
            </div>
        ))}
    </div>
);

const InteractiveList = ({ items }) => (
    <div className="space-y-4">
        {items.map((item, index) => (
            <div key={index} className="flex items-center p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-full mr-4" 
                />
                <span className="text-lg font-semibold">{item.name}</span>
            </div>
        ))}
    </div>
);

const DynamicGrid = ({ items }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
            <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
                <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-32 object-cover rounded-md mb-4" 
                />
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
            </div>
        ))}
    </div>
);

const HoverEffectGrid = ({ items }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
            <div 
                key={index} 
                className="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group"
            >
                <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-40 object-cover rounded-md mb-4 group-hover:opacity-60 transition-opacity duration-300" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold">{item.name}</p>
                </div>
            </div>
        ))}
    </div>
);

export default InterestsPage;
