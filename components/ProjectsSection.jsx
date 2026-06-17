"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { SiReact } from "react-icons/si";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Could not load projects:", error);
      }
    };
    loadProjects();
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const featured = projects[0]; // First project becomes featured

  return (
    <section id="projects" className="px-0 py-0">
      {/* ⭐ GLASSMORPHIC CONTAINER ⭐ */}
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
        <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>

        {/* ⭐ FEATURED PROJECT ⭐ */}
        {featured && (
          <div
            className="
              p-6 rounded-xl shadow-xl mb-8
              bg-white/30 dark:bg-white/10
              border border-white/40 dark:border-white/10
              backdrop-blur-xl
            "
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              ⭐ Featured Project
            </h3>

            {/* Preview */}
            <div className="overflow-hidden rounded-lg mb-4 flex justify-center">
              {featured.liveLink ? (
                <iframe
                  src={featured.liveLink}
                  width="100%"
                  height="250"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-lg"
                />
              ) : (
                <Image
                  src={`https://picsum.photos/500/300?random=${Math.random()}`}
                  alt={featured.title}
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              )}
            </div>

            <h3 className="text-xl font-semibold mb-2">{featured.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {featured.description}
            </p>

            {/* Buttons */}
            <div className="flex justify-between">
              <a
                href={featured.github}
                className="
                  flex items-center gap-2 px-4 py-2 rounded-full
                  bg-black/70 text-white hover:bg-black transition
                "
              >
                <FaGithub size={18} /> Code
              </a>

              <a
                href={featured.link}
                className="
                  flex items-center gap-2 px-4 py-2 rounded-full
                  bg-blue-600 text-white hover:bg-blue-700 transition
                "
              >
                <SiReact size={18} /> Link
              </a>
            </div>
          </div>
        )}

        {/* ⭐ EXPAND / COLLAPSE BUTTON ⭐ */}
        <div className="text-center mb-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="
              px-6 py-2 rounded-full font-semibold
              bg-blue-600 text-white hover:bg-blue-700
              transition
            "
          >
            {expanded ? "Hide All Projects" : "Show All Projects"}
          </button>
        </div>

        {/* ⭐ COLLAPSIBLE PROJECT LIST ⭐ */}
        {expanded && (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold transition
                    backdrop-blur-xl border
                    ${
                      filter === category
                        ? "bg-blue-600 text-white border-blue-300"
                        : "bg-white/20 dark:bg-white/10 border-white/30 dark:border-white/10 text-gray-800 dark:text-gray-200"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.title}
                  className="
                    p-6 rounded-xl shadow-xl transition-all
                    bg-white/30 dark:bg-white/10
                    border border-white/40 dark:border-white/10
                    backdrop-blur-xl
                    hover:scale-[1.02] hover:-translate-y-1
                  "
                >
                  {/* Preview */}
                  <div className="overflow-hidden rounded-lg mb-4">
                    {project.liveLink ? (
                      <iframe
                        src={project.liveLink}
                        width="100%"
                        height="250"
                        frameBorder="0"
                        allowFullScreen
                        className="rounded-lg"
                      />
                    ) : (
                      <Image
                        src={`https://picsum.photos/500/300?random=${Math.random()}`}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="rounded-lg"
                      />
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex justify-between">
                    <a
                      href={project.github}
                      className="
                        flex items-center gap-2 px-4 py-2 rounded-full
                        bg-black/70 text-white hover:bg-black transition
                      "
                    >
                      <FaGithub size={18} /> Code
                    </a>

                    <a
                      href={project.link}
                      className="
                        flex items-center gap-2 px-4 py-2 rounded-full
                        bg-blue-600 text-white hover:bg-blue-700 transition
                      "
                    >
                      <SiReact size={18} /> Link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
