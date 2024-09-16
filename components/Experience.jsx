'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../public/data/experienceData';
import RoleCard from './RoleCard';

const ExperienceSection = () => {
  const [filter, setFilter] = useState('all');

  const filteredExperiences = experiences.map(section => ({
    ...section,
    roles: section.roles.filter(role => 
      filter === 'all' || role.category === filter
    )
  })).filter(section => section.roles.length > 0);

  return (
    <section id="experience" className="py-16 bg-transparent w-[52vw] mx-auto text-center rounded-lg">
      <h2 className="text-4xl font-extrabold mb-4 text-gray-50">Work Experience</h2>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-8 bg-white text-gray-800 rounded-md px-4 py-2"
      >
        <option value="all">All Experiences</option>
        <option value="technical">Technical Experience</option>
        <option value="service">Service & Retail Experience</option>
      </select>
      <div className="max-w-4xl mx-auto px-6">
        <AnimatePresence>
          {filteredExperiences.map((expSection, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center justify-center space-x-4 bg-gray-200 p-4 rounded-lg shadow-lg">
                <span className="text-4xl">{expSection.icon({ className: "text-blue-500" })}</span> <span>{expSection.section}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {expSection.roles.map((role, roleIndex) => (
                  <RoleCard key={roleIndex} role={role} />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ExperienceSection;