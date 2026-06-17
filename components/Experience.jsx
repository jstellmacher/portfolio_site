"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "../public/data/experienceData";

const ExperienceSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [retailOpen, setRetailOpen] = useState(false);

  // Flatten roles
  const allRoles = experiences.flatMap((section) =>
    section.roles.map((role) => ({
      ...role,
      section: section.section,
      sectionIcon: section.icon,
    })),
  );

  const technicalRoles = allRoles.filter((r) => r.category === "technical");
  const retailRoles = allRoles.filter((r) => r.category === "service");

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="experience" className="px-0 py-0">
      <div
        className="
          max-w-3xl mx-auto px-8 py-12 rounded-2xl shadow-2xl
          backdrop-blur-xl border
          bg-gradient-to-br from-white/70 to-gray-200/40
          dark:from-black/70 dark:to-black/40
          border-white/40 dark:border-white/10
        "
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-gray-100">
          Work Experience
        </h2>

        {/* Accordion Container */}
        <div className="flex flex-col gap-6">
          {/* TECHNICAL ROLES */}
          {technicalRoles.map((role, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="
                  rounded-xl p-4 backdrop-blur-xl
                  bg-white/60 dark:bg-black/40
                  border border-white/40 dark:border-white/10
                  shadow-lg transition hover:shadow-xl
                "
              >
                {/* Header */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <div className="flex items-center gap-3">
                    {role.icon()}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {role.title}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {role.company} — {role.location}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {role.duration}
                      </p>
                    </div>
                  </div>

                  <span className="text-2xl text-gray-700 dark:text-gray-300">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4"
                    >
                      <ul className="list-disc ml-6 text-gray-900 dark:text-gray-200 text-[0.95rem] leading-loose">
                        {role.description.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>

                      {/* Client Details with ICON */}
                      {role.additionalInfo && (
                        <details className="mt-4">
                          <summary className="cursor-pointer text-blue-600 dark:text-blue-300 text-sm font-semibold flex items-center gap-2">
                            <span className="text-lg">🗄️</span>
                            Client Details
                            <span className="text-lg">🗄️</span>
                          </summary>

                          <div className="mt-3 flex flex-col gap-4">
                            {role.additionalInfo.map((client, idx) => (
                              <div key={idx}>
                                <p className="font-bold text-gray-900 dark:text-gray-100">
                                  {client.client}
                                </p>
                                <p className="text-sm text-gray-900 dark:text-gray-200 mb-1">
                                  {client.role}
                                </p>
                                <ul className="list-disc ml-6 text-sm text-gray-900 dark:text-gray-200 leading-loose">
                                  {client.details.map((d, i) => (
                                    <li key={i}>{d}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* RETAIL GROUP */}
          <div
            className="
              rounded-xl p-4 backdrop-blur-xl
              bg-white/60 dark:bg-black/40
              border border-white/40 dark:border-white/10
              shadow-lg transition hover:shadow-xl
            "
          >
            <button
              onClick={() => setRetailOpen(!retailOpen)}
              className="w-full flex justify-between items-center text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛒</span>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Retail & Service Experience ({retailRoles.length})
                </h4>
              </div>

              <span className="text-2xl text-gray-700 dark:text-gray-300">
                {retailOpen ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {retailOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 flex flex-col gap-6"
                >
                  {retailRoles.map((role, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        {role.icon()}
                        <div>
                          <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                            {role.title}
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {role.company} — {role.location}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {role.duration}
                          </p>
                        </div>
                      </div>

                      {/* ⭐ RESTORED RETAIL BULLETS */}
                      <ul className="list-disc ml-6 text-gray-900 dark:text-gray-200 text-sm leading-loose">
                        {role.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
