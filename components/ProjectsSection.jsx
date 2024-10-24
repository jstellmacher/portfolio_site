import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon
import { SiReact } from 'react-icons/si'; // Import React icon

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Could not load projects:", error);
      }
    };

    loadProjects();
  }, []);

  const categories = ['All', ...new Set(projects.map(project => project.category))];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  const getCategoryGradient = (category) => {
    switch (category) {
      case 'Software Development':
        return 'from-blue-200 to-blue-400';
      case 'Project Management':
        return 'from-green-200 to-green-400';
      case 'Other':
        return 'from-purple-200 to-purple-400';
      case 'MIS Projects':
        return 'from-yellow-200 to-yellow-400';
      case 'Marketing':
        return 'from-red-200 to-red-400';
      default:
        return 'from-gray-200 to-gray-400';
    }
  };

  const getButtonColors = (category) => {
    switch (category) {
      case 'Software Development':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'Project Management':
        return 'bg-green-500 hover:bg-green-600';
      case 'Other':
        return 'bg-purple-400 hover:bg-purple-600';
      case 'MIS Projects':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Marketing':
        return 'bg-red-500 hover:bg-red-600';
      case 'All':
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <section id="projects" className="text-center">
<div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-6xl">
<h2 className="pt-2 text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-800 mb-8 sm:mb-12">Projects</h2>

        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 sm:px-4 py-2 rounded-full text-white text-sm sm:text-base transition-colors duration-300 ${
                filter === category
                  ? getButtonColors(category)
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="w-full mx-auto max-h-[80vh] overflow-y-auto p-2"> 
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 p-2">
            {filteredProjects.map((project) => (
              <div
                key={project.title}
                className={`relative p-4 shadow-2xl sm:p-6 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-md flex flex-col h-full bg-gradient-to-br ${getCategoryGradient(project.category)}`}
              >
                {/* Card Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300"></div>

                {/* Category badge */}
                <div className="absolute top-2 right-2 z-20 bg-gray-900 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                  {project.category}
                </div>

                <div className="relative z-10 flex flex-col h-full overflow-y-auto overflow-x-auto">
                  <div className="flex-grow">
                    <div className="overflow-hidden rounded-lg mb-4">
                      {project.liveLink ? (
                        <iframe
                          src={project.liveLink}
                          width="100%"
                          height="300"
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
                          layout="responsive"
                          className="rounded-lg"
                        />
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-500">{project.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">{project.description}</p>
                  </div>

                  {/* Container for icons */}
                  <div className="mt-auto mb-4">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                      {project.tools.split(',').map((tool, index) => {
                        const iconName = tool.toLowerCase().replace('.', '').replace(' ', '');
                        return (
                          <div key={index} className="relative group">
                            <Image
                              src={`https://skillicons.dev/icons?i=${iconName}`}
                              alt={tool}
                              width={32}
                              height={32}
                              className="cursor-pointer"
                              onClick={() => setSelectedTool(selectedTool === tool ? null : tool)}
                            />
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {tool}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Display selected tool name */}
                    {selectedTool && (
                      <div className="mt-2 text-sm font-semibold text-gray-300 text-center">
                        Selected: {selectedTool}
                      </div>
                    )}
                  </div>

                  {/* Container for icons and buttons */}
                  <div className="flex-grow"></div> {/* This will push the buttons to the bottom */}
                  
                  {/* Buttons for GitHub and Link */}
                  <div className="mt-2 flex justify-between mb-2">
                    <a
                      href={project.github} // Assuming project.github contains the GitHub link
                      className="flex items-center text-white bg-gray-800 px-4 py-2 rounded-full transition-transform hover:scale-105"
                    >
                      <FaGithub className="mr-2" size={20} /> {/* GitHub icon */}
                      Code
                    </a>
                    <a
                      href={project.link} // Assuming project.link contains the link to the project
                      className="flex items-center text-white bg-gray-800 px-4 py-2 rounded-full transition-transform hover:scale-105"
                    >
                      <SiReact className="mr-2" size={20} /> {/* React icon */}
                      Link
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
