import { FaDatabase, FaUniversity, FaPython, FaCashRegister, FaLeaf, FaHammer, FaTshirt } from 'react-icons/fa';
import { AiOutlineCloudServer } from 'react-icons/ai';
import { CiCoffeeCup } from 'react-icons/ci';
import { GiMeat, GiPlantWatering, GiTechnoHeart } from 'react-icons/gi';
import { LuCroissant } from 'react-icons/lu';
import { TbGardenCart, TbPlant, TbDeviceDesktopAnalytics, TbCube3dSphere } from 'react-icons/tb';
import { LiaLaptopCodeSolid } from 'react-icons/lia';
import { MdOutlineAnalytics } from 'react-icons/md';

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
    icon: () => <GiTechnoHeart className="text-blue-600 text-5xl" />,
    roles: sortRolesByDate([
      {
        title: 'Cloud & Data Associate Consultant',
        company: 'Insight Enterprises',
        location: 'Chandler, Arizona',
        duration: 'Jul. 17, 2023 – Mar. 5, 2024',
        icon: () => (
          <div className="flex items-center">
            <AiOutlineCloudServer className="text-blue-500 text-4xl mr-2" />
          </div>
        ),
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
        icon: () => (
          <div className="flex items-center">
            <LiaLaptopCodeSolid className="text-green-500 text-4xl mr-2" />
          </div>
        ),
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
        icon: () => (
          <div className="flex items-center">
            <TbDeviceDesktopAnalytics className="text-purple-500 text-4xl mr-2" />
          </div>
        ),
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
        icon: () => (
          <div className="flex items-center">
            <TbCube3dSphere className="text-red-500 text-4xl mr-2" />
          </div>
        ),
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
    icon: () => <FaCashRegister className="text-orange-600 text-5xl" />,
    roles: sortRolesByDate([
      {
        title: 'Deli Clerk, Barista & Cashier',
        company: 'Safeway & Starbucks',
        location: 'Arizona',
        duration: 'Apr. 2024 – Present',
        icon: () => (
          <div className="flex items-center">
            <GiMeat className="text-pink-500 text-4xl mr-2" />
            <FaCashRegister className="text-pink-500 text-4xl mr-2" />
            <CiCoffeeCup className="text-pink-500 text-4xl" />
          </div>
        ),
        category: 'service',
        description: [
          'Provided high-quality service, enhancing customer loyalty.',
          'Managed and balanced registers for accurate transactions.',
          'Trained and mentored new team members, fostering a collaborative environment.'
        ]
      },
      {
        title: 'Barista & Cashier',
        company: 'La Petit, UofA Campus',
        location: 'Tucson, Arizona',
        duration: 'Aug. 2019 – Dec. 2019',
        icon: () => (
          <div className="flex items-center">
            <CiCoffeeCup className="text-teal-500 text-4xl mr-2" />
            <FaCashRegister className="text-teal-500 text-4xl mr-2" />
            <LuCroissant className="text-teal-500 text-4xl" />
          </div>
        ),
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
        icon: () => (
          <div className="flex items-center">
            <FaTshirt className="text-indigo-500 text-4xl mr-2" />
            <FaHammer className="text-indigo-500 text-4xl mr-2" />
            <TbGardenCart className="text-indigo-500 text-4xl" />
          </div>
        ),
        category: 'service',
        description: [
          'Assisted customers with detailed product information on tools, plumbing, and electrical equipment.',
          'Managed inventory levels and ensured accurate product stocking.',
          'Handled Carhartt clothing sales and inventory management.',
          'Operated the lumberyard booth, efficiently processing transactions and reading change backwards.'
        ]
      },
      {
        title: 'Garden Center Retailer',
        company: 'Viola\'s Flower Garden',
        location: 'Flagstaff, Arizona',
        duration: 'May 2015 – Aug. 2017',
        icon: () => (
          <div className="flex items-center">
            <TbPlant className="text-green-600 text-4xl mr-2" />
            <FaLeaf className="text-green-600 text-4xl mr-2" />
            <GiPlantWatering className="text-green-600 text-4xl" />
          </div>
        ),
        category: 'service',
        description: [
          'Maintained nursery health and appearance, ensuring plant longevity.',
          'Provided expert plant care advice and product recommendations to customers.',
          'Assisted with inventory management and restocking of plants and gardening supplies.',
          'Demonstrated proper planting techniques and educated customers on plant care requirements.'
        ]
      }
    ])
  }
];