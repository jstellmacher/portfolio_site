import { FaCloud, FaDatabase, FaUniversity, FaCode, FaPython, FaCashRegister, FaLeaf, FaHammer } from 'react-icons/fa';

// Helper function to parse and sort roles by date
const sortRolesByDate = (roles) => {
  return roles.slice().sort((a, b) => {
    const dateA = new Date(a.duration.split(' – ')[1]);
    const dateB = new Date(b.duration.split(' – ')[1]);
    return dateB - dateA; // Newest first
  });
};

export const experiences = [
  {
    section: 'Technical Experience',
    icon: () => <FaCloud className="text-blue-600 text-6xl" />,
    roles: sortRolesByDate([
      {
        title: 'Cloud & Data Associate Consultant',
        company: 'Insight Enterprises',
        location: 'Chandler, Arizona',
        duration: 'Jul. 17, 2023 – Mar. 5, 2024',
        icon: () => <FaDatabase className="text-purple-600 text-5xl" />,
        category: 'technical',
        description: [
          'Led data governance initiatives to support data-driven decision-making using Azure tools.',
          'Applied Agile Scrum methodologies to streamline cloud migration projects.',
          'Conducted regular meetings to ensure project alignment and maintain client relationships with four clients.'
        ],
        additionalInfo: [
          {
            client: 'County Courthouse',
            role: 'Technical Project Manager',
            details: [
              'Directed a Cisco collaboration upgrade and migration project using Agile methodologies.',
              'Coordinated with stakeholders via Microsoft Teams to align project goals and resolve issues efficiently.'
            ]
          },
          {
            client: 'Leading Firearms Manufacturer',
            role: 'Cybersecurity Cloud Office365 Migration Consultant',
            details: [
              'Participated in the integration of Office 365, Teams, and Outlook with Azure security features.',
              'Provided technical support and conducted user training sessions to improve user proficiency and reduce issues.'
            ]
          },
          {
            client: 'Global Chemical Company',
            role: 'Cybersecurity Azure IAM Consultant',
            details: [
              'Secured Azure Active Directory for 8,000+ employees during a cyber-attack.',
              'Improved client communication in Spanish; transitioned support to ServiceNow.'
            ]
          }
        ]
      },
      {
        title: 'Full Stack Engineer, Designer, Agile Project Manager',
        company: 'Freelance Client',
        location: 'Denver, Colorado',
        duration: 'Mar. 2, 2023 – May 1, 2023',
        icon: () => <FaCode className="text-green-600 text-5xl" />,
        category: 'technical',
        description: [
          'Managed full lifecycle web development projects from planning to execution.',
          'Delivered solutions that meet client needs and business objectives.'
        ]
      },
      {
        title: 'Web Analyst',
        company: 'University of Arizona Information Technology',
        location: 'Tucson, Arizona',
        duration: 'Jan. 2022 – Dec. 2022',
        icon: () => <FaUniversity className="text-red-600 text-5xl" />,
        category: 'technical',
        description: [
          'Conducted website testing to enhance user experience and accessibility.',
          'Improved team collaboration, facilitating faster project completion.',
          'Enhanced documentation processes for smoother project hand-offs.'
        ]
      },
      {
        title: '3D Data Developer Intern',
        company: 'Biosphere 2 Tech Core',
        location: 'Tucson, Arizona',
        duration: 'Jun. 2021 – Aug. 2021',
        icon: () => <FaPython className="text-yellow-600 text-5xl" />,
        category: 'technical',
        description: [
          'Collaborated with cross-functional teams to streamline data processing workflows.',
          'Utilized Python and specialized libraries to improve data accuracy.',
          'Developed comprehensive documentation practices for future 3D developers.'
        ]
      }
    ])
  },
  {
    section: 'Service & Retail Experience',
    icon: () => <FaCashRegister className="text-orange-600 text-6xl" />,
    roles: sortRolesByDate([
      {
        title: 'Deli Clerk & Cashier',
        company: 'Safeway & Starbucks',
        location: 'Arizona',
        duration: 'Apr. 2024 – Present',
        icon: () => <FaCashRegister className="text-pink-600 text-5xl" />,
        category: 'service',
        description: [
          'Provided high-quality service, enhancing customer loyalty.',
          'Managed and balanced registers for accurate transactions.',
          'Trained and mentored new team members, fostering a collaborative environment.'
        ]
      },
      {
        title: 'Barista / Cashier',
        company: 'La Petit, UofA Campus',
        location: 'Tucson, Arizona',
        duration: 'Aug. 2019 – Dec. 2019',
        icon: () => <FaCashRegister className="text-teal-600 text-5xl" />,
        category: 'service',
        description: [
          'Adhered to food safety protocols and delivered quick service.',
          'Provided personalized service and menu expertise.',
          'Worked closely with team members to maintain high service standards.'
        ]
      },
      {
        title: 'Retail Specialist',
        company: 'Homco Lumber and Hardware',
        location: 'Flagstaff, Arizona',
        duration: 'Aug. 2018 – Aug. 2019',
        icon: () => <FaHammer className="text-indigo-600 text-5xl" />,
        category: 'service',
        description: [
          'Assisted customers with detailed product information on tools, plumbing, and electrical equipment.',
          'Managed inventory levels and ensured accurate product stocking.'
        ]
      },
      {
        title: 'Garden Center Specialist',
        company: 'Viola\'s Flower Garden',
        location: 'Flagstaff, Arizona',
        duration: 'May 2015 – Aug. 2017',
        icon: () => <FaLeaf className="text-green-800 text-5xl" />,
        category: 'service',
        description: [
          'Maintained nursery health and appearance, ensuring plant longevity.',
          'Provided expert plant and supply recommendations to customers.'
        ]
      }
    ])
  }
];