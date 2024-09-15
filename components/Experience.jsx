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
    <section id="experience" className="py-8 sm:py-12 md:py-16 bg-transparent w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] mx-auto text-center rounded-lg px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-50">Work Experience</h2>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-6 sm:mb-8 bg-white text-gray-800 rounded-md px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-auto"
      >
        <option value="all">All Experiences</option>
        <option value="technical">Technical Experience</option>
        <option value="service">Service & Retail Experience</option>
      </select>
      <div className="w-full sm:max-w-4xl mx-auto">
        <AnimatePresence>
          {filteredExperiences.map((expSection, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mb-12 sm:mb-16"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 flex items-center justify-center space-x-2 sm:space-x-4 bg-gray-200 p-3 sm:p-4 rounded-lg shadow-lg">
                {expSection.icon()} <span>{expSection.section}</span>
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
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