'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../public/data/experienceData';
import RoleCard from './RoleCard';
import Timeline from './Timeline';

const ExperienceSection = () => {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('cards'); // New state for view mode

  const filteredExperiences = experiences.map(section => ({
    ...section,
    roles: section.roles.filter(role => 
      filter === 'all' || role.category === filter
    )
  })).filter(section => section.roles.length > 0);

  return (
    <section id="experience" className=" bg-transparent mx-auto max-w-6xl text-center rounded-lg">
      <h2 className="text-4xl font-extrabold mb-4 text-gray-800 dark:text-white">Work Experience</h2>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-8 bg-white text-gray-800 dark:bg-gray-100 dark:text-gray-800 rounded-md px-4 py-2"
      >
        <option value="all">All Experiences</option>
        <option value="technical">Technical Experience</option>
        <option value="service">Service & Retail Experience</option>
      </select>
      
      {/* View toggle buttons */}
      <div className="p-4 bg-gray-200 rounded-t-lg shadow-md">
      <button
    onClick={() => setView('cards')}
    className={`mr-4 px-4 py-2 rounded-lg ${view === 'cards' ? 'font-bold text-blue-600' : 'text-gray-700'}`}
  >
    Card View
  </button>
  <button
    onClick={() => setView('timeline')}
    className={`px-4 py-2 rounded-lg ${view === 'timeline' ? 'font-bold text-blue-600' : 'text-gray-700'}`}
  >
    Timeline View
  </button>
</div>

      
      <div className=" rounded-lg mx-auto max-w-6xl">
        <AnimatePresence>
          {view === 'cards' ? (
            filteredExperiences.map((expSection, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center space-x-4 bg-gray-200 p-4 rounded-b-lg shadow-lg">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {expSection.icon()}  
                  </motion.span>
                  <span>{expSection.section}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {expSection.roles.map((role, roleIndex) => (
                    <RoleCard key={roleIndex} role={role} />
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <Timeline filter={filter} /> // Render the Timeline component
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ExperienceSection;
