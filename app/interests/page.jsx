"use client"; // Add this line at the top

import React, { useState } from 'react';
import TravelMap from '../../components/TravelMap';

const InterestsPage = () => {
    return (
        <div className="mt-4 p-6 max-w-5xl mx-auto space-y-8">
            {/* Profile Header */}
            <ProfileHeader 
                name="Jaichuang Stellmacher"
                bio="Tech enthusiast, traveler, and foodie. Exploring the world one hobby at a time."
                profilePic="https://via.placeholder.com/150" // Replace with your profile picture URL
            />
            
            {/* Tabs */}
            <Tabs>
                <Tab title="Activities">
                    <TileLayout items={[
                        { name: 'Hiking', img: 'https://picsum.photos/200/300?random=1' },
                        { name: 'Reading', img: 'https://picsum.photos/200/300?random=2' },
                        { name: 'Photography', img: 'https://picsum.photos/200/300?random=3' }
                    ]} />
                </Tab>
                <Tab title="Hobbies">
                    <TileLayout items={[
                        { name: 'Painting', img: 'https://picsum.photos/200/300?random=4' },
                        { name: 'Gardening', img: 'https://picsum.photos/200/300?random=5' },
                        { name: 'Knitting', img: 'https://picsum.photos/200/300?random=6' }
                    ]} />
                </Tab>
                <Tab title="Volunteering">
                    <TileLayout items={[
                        { name: 'Animal Shelter', img: 'https://picsum.photos/200/300?random=7' },
                        { name: 'Food Bank', img: 'https://picsum.photos/200/300?random=8' }
                    ]} />
                </Tab>
                <Tab title="Music">
                    <TileLayout items={[
                        { name: 'Rock', img: 'https://picsum.photos/200/300?random=9' },
                        { name: 'Jazz', img: 'https://picsum.photos/200/300?random=10' },
                        { name: 'Classical', img: 'https://picsum.photos/200/300?random=11' }
                    ]} />
                </Tab>
                <Tab title="Food">
                    <TileLayout items={[
                        { name: 'Italian', img: 'https://picsum.photos/200/300?random=12' },
                        { name: 'Sushi', img: 'https://picsum.photos/200/300?random=13' },
                        { name: 'Tacos', img: 'https://picsum.photos/200/300?random=14' }
                    ]} />
                </Tab>
                <Tab title="Travel Map">
                    <TravelMap />
                </Tab>
            </Tabs>
        </div>
    );
};

const ProfileHeader = ({ name, bio, profilePic }) => (
    <div className="flex items-center space-x-4 mb-8">
        <img 
            src={profilePic} 
            alt={`${name}'s profile`} 
            className="w-24 h-24 rounded-full border-2 border-gray-300" 
        />
        <div>
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
            <p className="text-gray-600 mt-1">{bio}</p>
        </div>
    </div>
);

const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
        <div>
            <div className="flex border-b border-gray-300">
                {React.Children.map(children, (child, index) => (
                    <button 
                        className={`flex-1 py-2 text-center ${activeTab === index ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`} 
                        onClick={() => setActiveTab(index)}
                    >
                        {child.props.title}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {React.Children.toArray(children)[activeTab]}
            </div>
        </div>
    );
};

const Tab = ({ children }) => <>{children}</>;

const TileLayout = ({ items }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                <img src={item.img} alt={item.name} className="w-full h-32 object-cover rounded-md mb-2" />
                <p className="text-lg font-semibold text-gray-700">{item.name}</p>
            </div>
        ))}
    </div>
);

export default InterestsPage;