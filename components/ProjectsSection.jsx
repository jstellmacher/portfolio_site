import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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

  // Get unique categories from projects data
  const categories = ['All', ...new Set(projects.map(project => project.category))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Updated function to match your JSON categories
  const getCategoryGradient = (category) => {
    switch (category) {
      case 'Software Development':
        return 'from-blue-100 to-blue-300';
      case 'Project Management':
        return 'from-green-100 to-green-300';
      case 'Other Projects':
        return 'from-purple-100 to-purple-300';
      case 'MIS Projects':
        return 'from-yellow-100 to-yellow-300';
      case 'Marketing':
        return 'from-red-100 to-red-300';
      default:
        return 'from-gray-100 to-gray-300';
    }
  };

  // New function to get button colors
  const getButtonColors = (category) => {
    switch (category) {
      case 'Software Development':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'Project Management':
        return 'bg-green-500 hover:bg-green-600';
      case 'Other Projects':
        return 'bg-purple-500 hover:bg-purple-600';
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
    <section id="projects" className="py-12 sm:py-16 md:py-20 text-center bg-gray-900">
      <div className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] mx-auto px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 sm:mb-12">Projects</h2>
        
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

        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {filteredProjects.map((project) => (
              <div
                key={project.title}
                className={`relative p-4 sm:p-6 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col h-full bg-gradient-to-br ${getCategoryGradient(project.category)}`}
              >
                {/* Card Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity duration-300"></div>

                {/* Category badge */}
                <div className="absolute top-2 right-2 z-20 bg-gray-900 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                  {project.category}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="overflow-hidden rounded-lg mb-4">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={500}
                        height={300}
                        layout="responsive"
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">{project.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">{project.description}</p>
                  </div>

                  {/* Container for icons */}
                  <div className="mt-auto mb-4">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                      {project.tools.split(',').map((tool, index) => {
                        const iconName = tool.toLowerCase().replace('.', '').replace(' ', '');
                        return (
                          <div key={index} className="relative group">
                            <img
                              src={`https://skillicons.dev/icons?i=${iconName}`}
                              alt={tool}
                              className="w-8 h-8 cursor-pointer"
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
                      <div className="mt-2 text-sm font-semibold text-gray-700 text-center">
                        Selected: {selectedTool}
                      </div>
                    )}
                  </div>

                  {/* View Project Button */}
                  <a
                    href={`/projects/${project.title.replace(/\s+/g, '-').toLowerCase()}`}
                    className="block text-center text-white bg-gradient-to-r from-indigo-500 to-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transform transition-transform hover:scale-105 text-sm sm:text-base"
                  >
                    View Project
                  </a>
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