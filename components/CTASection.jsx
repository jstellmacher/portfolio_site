import { FiDownload } from 'react-icons/fi';
import { FaTrello, FaReact, FaAws } from 'react-icons/fa';

const skills = [
  {
    title: 'Project Management Agile',
    description: 'Experienced in managing projects using Agile methodologies, ensuring timely and budget-compliant delivery with a focus on client satisfaction and technical excellence.',
    color: 'bg-blue-500',
    icon: <FaTrello size={40} />
  },
  {
    title: 'Full Stack Software Development',
    description: 'Proficient in building and maintaining end-to-end solutions with expertise in Python, JavaScript, React, and frameworks such as Django and Flask.',
    color: 'bg-green-500',
    icon: <FaReact size={40} />
  },
  {
    title: 'Cloud Administration',
    description: 'Skilled in managing and optimizing cloud infrastructure using Azure and AWS to ensure scalability, reliability, and enhanced data security.',
    color: 'bg-yellow-500',
    icon: <FaAws size={40} />
  }
];

const CTASection = () => {
  return (
    <section id="about" className="py-20 bg-transparent text-center text-white">
      <div className="container mx-auto px-4">
        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg mx-auto max-w-4xl mb-12">
          <h2 className="text-3xl font-extrabold mb-6">About Me</h2>
          <p className="text-lg mb-6">
            I'm Jaichuang Stellmacher, a <strong>motivated IT Consultant</strong> with hands-on experience in <strong>cloud computing, full-stack development, and project management</strong>. I hold a BS in Business Administration with dual majors in <em>Management Information Systems and Marketing</em> from the <a href="https://eller.arizona.edu/why/rankings" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">University of Arizona's Eller College of Management</a>, consistently ranked as a top MIS program (#2 public, #3 overall). I am certified in <strong>Microsoft Azure Fundamentals</strong> and <strong>Full Stack Software Engineering</strong>. Known for my <em>proactive approach, strong problem-solving skills, and ability to translate complex requirements into impactful solutions</em>.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {skills.map((skill) => (
            <div 
              key={skill.title} 
              className={`p-6 rounded-lg shadow-lg ${skill.color} text-white hover:scale-105 hover:shadow-xl transition-transform duration-300`}
            >
              <div className="flex justify-center items-center mb-4">
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