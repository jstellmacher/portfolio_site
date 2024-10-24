// TimelineRole.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TimelineRole = ({ role }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (client) => {
    setExpanded((prev) => ({ ...prev, [client]: !prev[client] }));
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Role Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center h-[400px] w-[350px] overflow-hidden relative">
        {/* Role Header (Icon, Title, Company, Location, Duration) */}
        <div className="mb-6 flex flex-col items-center text-center">
          {role.icon()}
          <h4 className="text-2xl font-semibold text-gray-900 mt-4">{role.title}</h4>
          <p className="text-lg font-medium text-gray-700 mt-2">
            {role.company} | {role.location}
          </p>
          <p className="text-gray-600 mb-4">{role.duration}</p>
        </div>

        {/* Role Description and Additional Info */}
        <div className="flex-1 w-full overflow-y-auto bg-gray-50 shadow-inner rounded-xl p-1 h-full max-h-[350px]">
          <ul className="list-disc list-inside text-gray-800 mb-4 text-left">
            {role.description.map((desc, idx) => (
              <li key={idx} className="mb-2">{desc}</li>
            ))}
          </ul>
          {role.additionalInfo && role.additionalInfo.map((info, idx) => (
            <div key={idx} className="mt-4 p-4 bg-gray-100 rounded-lg shadow-sm">
              <h5
                className="text-lg font-semibold text-gray-800 cursor-pointer flex items-center justify-between"
                onClick={() => toggleExpand(info.client)}
              >
                {info.client} ({info.role})
                <span className="ml-2">{expanded[info.client] ? '▲' : '▼'}</span>
              </h5>
              <AnimatePresence>
                {expanded[info.client] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2"
                  >
                    <ul className="list-disc list-inside text-gray-700 text-left">
                      {info.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="mb-2">{detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Year or Date */}
      <div className="mt-4 text-base font-semibold text-indigo-600 bg-indigo-100 p-2 rounded-lg shadow-sm">
        {role.date}
      </div>
    </div>
  );
};

export default TimelineRole;
