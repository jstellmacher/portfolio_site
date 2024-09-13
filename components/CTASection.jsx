import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaTrello, FaReact, FaAws, FaLaptopCode } from 'react-icons/fa';
import { SiMicrosoftazure } from "react-icons/si";
import { MdComputer } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";

import './CTASection.css'; // Add this import

const skills = [
  {
    title: 'Project Management',
    description: 'Experienced in managing projects using Agile methodologies, ensuring timely and budget-compliant delivery with a focus on client satisfaction and technical excellence.',
    color: 'skill-card-blue',
    icon: <FaTrello size={40} />,
    key: 'project-management'
  },
  {
    title: 'Full Stack Development',
    description: 'Proficient in building and maintaining end-to-end solutions with expertise in Python, JavaScript, React, and frameworks such as Django and Flask.',
    color: 'skill-card-green',
    icon: <FaReact size={40} />,
    key: 'full-stack'
  },
  {
    title: 'Cloud Administration',
    description: 'Skilled in managing and optimizing cloud infrastructure using Azure and AWS to ensure scalability, reliability, and enhanced data security.',
    color: 'skill-card-yellow',
    icon: (
      <div className="flex justify-center items-center space-x-4">
        <div className="w-10 h-10 flex items-center justify-center">
          <FaAws className="w-full h-full" />
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <SiMicrosoftazure className="w-8 h-8" />
        </div>
      </div>
    ),
    key: 'cloud'
  },
  {
    title: 'Microsoft Azure Fundamentals',
    description: 'Certified in Microsoft Azure Fundamentals, with a strong understanding of cloud concepts, core Azure services, and Azure management tools.',
    color: 'skill-card-purple',
    icon: <SiMicrosoftazure size={40} />,
    key: 'azure',
    hidden: true
  },
  {
    title: 'Full Stack Software Engineering',
    description: 'Proficient in both front-end and back-end development, with expertise in various programming languages and frameworks.',
    color: 'skill-card-orange',
    icon: <FaLaptopCode size={40} />,
    key: 'full-stack-cert',
    hidden: true
  }
];

const CTASection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="about" className="py-20 bg-transparent text-center text-white relative">
      <div className="container mx-auto px-4">
        <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg mx-auto max-w-4xl mb-16">
          <div className="flex items-center justify-center mb-8">
            <FaHandsHelping className="text-black text-3xl mr-4" />
            <h2 className="text-4xl font-extrabold px-4">About Me</h2>
            <MdComputer className="text-black text-3xl ml-4" />
          </div>
          <p className="text-lg mb-8 leading-relaxed">
            I'm Jaichuang Stellmacher, a <strong >motivated (Cloud, Data, Digital) Information Technology Consultant</strong> with hands-on experience in <strong className="text-yellow-500 hover:text-yellow-700 cursor-pointer" onMouseEnter={() => setHoveredSkill('cloud')} onMouseLeave={() => setHoveredSkill(null)}>cloud computing</strong>, <strong className="text-green-500 hover:text-green-700 cursor-pointer" onMouseEnter={() => setHoveredSkill('full-stack')} onMouseLeave={() => setHoveredSkill(null)}>full-stack development</strong>, and <strong className="text-blue-500 hover:text-blue-700 cursor-pointer" onMouseEnter={() => setHoveredSkill('project-management')} onMouseLeave={() => setHoveredSkill(null)}>project management</strong>.
          </p>
          <p className="text-lg mb-8 leading-relaxed">
            I hold a BS in Business Administration with dual majors in <em>Management Information Systems and Marketing</em> from the <a href="https://eller.arizona.edu/why/rankings" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">University of Arizona's Eller College of Management</a>, consistently ranked as a top MIS program (#2 public, #3 overall).
          </p>
          <p className="text-lg leading-relaxed">
            I am certified in <strong className="text-purple-500 hover:text-purple-700 cursor-pointer" onMouseEnter={() => setHoveredSkill('azure')} onMouseLeave={() => setHoveredSkill(null)}>Microsoft Azure Fundamentals</strong> and <strong className="text-orange-500 hover:text-orange-700 cursor-pointer" onMouseEnter={() => setHoveredSkill('full-stack-cert')} onMouseLeave={() => setHoveredSkill(null)}>Full Stack Software Engineering</strong>. Known for my <em>proactive approach, strong problem-solving skills, and ability to translate complex requirements into impactful solutions</em>.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="skill-cards-container mx-auto">
          {skills.map((skill) => (
            <div 
              key={skill.title} 
              className={`skill-card ${skill.color} ${hoveredSkill === skill.key ? 'hovered glow' : ''}`}
              style={{ 
                display: hoveredSkill ? 
                  (skill.key === hoveredSkill ? 'block' : 'none') : 
                  (skill.hidden ? 'none' : 'block') 
              }}
            >
              <div className="skill-icon">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{skill.title}</h3>
              <p className="text-center">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;