// components/SoftSkills.jsx
import React from 'react';
import { FaUsers, FaRegHandshake, FaChalkboardTeacher, FaCreativeCommons, FaBullhorn, FaLightbulb, FaClock, FaBalanceScale, FaHeart, FaComments, FaSyncAlt } from 'react-icons/fa';
import { GiPublicSpeaker, GiBrain, GiMagnifyingGlass } from 'react-icons/gi';

const softSkills = [
  { name: 'Communication', icon: <FaComments className="text-3xl text-blue-500" /> },
  { name: 'Teamwork', icon: <FaUsers className="text-3xl text-green-500" /> },
  { name: 'Leadership', icon: <FaRegHandshake className="text-3xl text-purple-600" /> },
  { name: 'Problem Solving', icon: <FaChalkboardTeacher className="text-3xl text-orange-500" /> },
  { name: 'Creativity', icon: <FaCreativeCommons className="text-3xl text-red-500" /> },
  { name: 'Public Speaking', icon: <GiPublicSpeaker className="text-3xl text-yellow-500" /> },
  { name: 'Negotiation', icon: <FaBullhorn className="text-3xl text-gray-600" /> },
  { name: 'Critical Thinking', icon: <GiBrain className="text-3xl text-indigo-500" /> },
  { name: 'Adaptability', icon: <FaSyncAlt className="text-3xl text-teal-500" /> },
  { name: 'Time Management', icon: <FaClock className="text-3xl text-pink-500" /> },
  { name: 'Emotional Intelligence', icon: <FaHeart className="text-3xl text-red-400" /> },
  { name: 'Conflict Resolution', icon: <FaBalanceScale className="text-3xl text-blue-600" /> },
  { name: 'Innovation', icon: <FaLightbulb className="text-3xl text-yellow-400" /> },
  { name: 'Attention to Detail', icon: <GiMagnifyingGlass className="text-3xl text-green-600" /> },
  // Add more skills as needed
];

const SoftSkills = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-6xl mt-10">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Soft Skills</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
      {softSkills.map(skill => (
        <div
          key={skill.name}
          className="flex flex-col items-center text-center hover:animate-bob transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          {skill.icon}
          <p className="mt-2 text-sm font-medium text-gray-800">{skill.name}</p>
        </div>
      ))}
    </div>
  </div>
);

export default SoftSkills;