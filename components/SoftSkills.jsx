// components/SoftSkills.jsx
import React from "react";
import {
  FaUsers,
  FaRegHandshake,
  FaChalkboardTeacher,
  FaCreativeCommons,
  FaBullhorn,
  FaLightbulb,
  FaClock,
  FaBalanceScale,
  FaHeart,
  FaComments,
  FaSyncAlt,
} from "react-icons/fa";
import { GiPublicSpeaker, GiBrain, GiMagnifyingGlass } from "react-icons/gi";

const softSkills = [
  {
    name: "Communication",
    icon: <FaComments className="text-3xl text-blue-500" />,
  },
  { name: "Teamwork", icon: <FaUsers className="text-3xl text-green-500" /> },
  {
    name: "Leadership",
    icon: <FaRegHandshake className="text-3xl text-purple-600" />,
  },
  {
    name: "Problem Solving",
    icon: <FaChalkboardTeacher className="text-3xl text-orange-500" />,
  },
  {
    name: "Creativity",
    icon: <FaCreativeCommons className="text-3xl text-red-500" />,
  },
  {
    name: "Public Speaking",
    icon: <GiPublicSpeaker className="text-3xl text-yellow-500" />,
  },
  {
    name: "Negotiation",
    icon: <FaBullhorn className="text-3xl text-gray-600" />,
  },
  {
    name: "Critical Thinking",
    icon: <GiBrain className="text-3xl text-indigo-500" />,
  },
  {
    name: "Adaptability",
    icon: <FaSyncAlt className="text-3xl text-teal-500" />,
  },
  {
    name: "Time Management",
    icon: <FaClock className="text-3xl text-pink-500" />,
  },
  {
    name: "Emotional Intelligence",
    icon: <FaHeart className="text-3xl text-red-400" />,
  },
  {
    name: "Conflict Resolution",
    icon: <FaBalanceScale className="text-3xl text-blue-600" />,
  },
  {
    name: "Innovation",
    icon: <FaLightbulb className="text-3xl text-yellow-400" />,
  },
  {
    name: "Attention to Detail",
    icon: <GiMagnifyingGlass className="text-3xl text-green-600" />,
  },
  {
    name: "Customer Service",
    icon: <FaRegHandshake className="text-3xl text-purple-600" />,
  },
  {
    name: "Analytical Thinking",
    icon: <GiBrain className="text-3xl text-indigo-500" />,
  },
  {
    name: "Project Management",
    icon: <FaClock className="text-3xl text-pink-500" />,
  },
  {
    name: "Client Relations",
    icon: <FaRegHandshake className="text-3xl text-purple-600" />,
  },
  {
    name: "Strategic Planning",
    icon: <FaLightbulb className="text-3xl text-yellow-400" />,
  },
  {
    name: "Crisis Management",
    icon: <FaBalanceScale className="text-3xl text-blue-600" />,
  },
  {
    name: "Mentoring",
    icon: <FaChalkboardTeacher className="text-3xl text-orange-500" />,
  },
  { name: "Networking", icon: <FaUsers className="text-3xl text-green-500" /> },
  {
    name: "Data Interpretation",
    icon: <GiMagnifyingGlass className="text-3xl text-green-600" />,
  },
  { name: "Empathy", icon: <FaHeart className="text-3xl text-red-400" /> },
  {
    name: "Collaboration",
    icon: <FaUsers className="text-3xl text-green-500" />,
  },
  {
    name: "Presentation Skills",
    icon: <GiPublicSpeaker className="text-3xl text-yellow-500" />,
  },
  {
    name: "Organizational Skills",
    icon: <FaClock className="text-3xl text-pink-500" />,
  },
  {
    name: "Motivational Skills",
    icon: <FaCreativeCommons className="text-3xl text-red-500" />,
  },
];

const SoftSkills = () => (
  <section id="soft-skills" className="px-0 py-0">
    <div
      className="
        max-w-3xl mx-auto p-8 rounded-2xl shadow-2xl
        backdrop-blur-xl border transition-all
        bg-gradient-to-br from-white/40 to-white/10
        dark:from-black/40 dark:to-black/20
        border-white/40 dark:border-white/10
        text-black dark:text-white
      "
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Soft Skills</h2>

      <div className="overflow-y-auto max-h-96">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
          {softSkills.map((skill) => (
            <div
              key={skill.name}
              className="
                flex flex-col items-center text-center
                hover:animate-bob transition-transform duration-300 ease-in-out
                transform hover:scale-105
              "
            >
              {skill.icon}
              <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SoftSkills;
