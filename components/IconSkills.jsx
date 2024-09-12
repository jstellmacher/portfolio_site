// components/IconSkills.jsx
import React from 'react';
import { FaPython, FaJava, FaReact, FaAws, FaWindows, FaApple, FaLinux, FaDatabase, FaDocker } from 'react-icons/fa';
import { DiJavascript, DiHtml5, DiCss3, DiNodejs } from 'react-icons/di';
import { SiMicrosoftazure, SiNotion, SiJira, SiTableau, SiPowerbi, SiPostgresql, SiTrello, SiKubernetes, SiTensorflow, SiScikitlearn } from 'react-icons/si';
import { RiLineChartLine } from 'react-icons/ri';

const skills = [
  { name: 'Python', icon: <FaPython className="text-3xl text-blue-600" />, url: 'https://www.python.org/doc/' },
  { name: 'JavaScript', icon: <DiJavascript className="text-3xl text-yellow-600" />, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'HTML', icon: <DiHtml5 className="text-3xl text-red-600" />, url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', icon: <DiCss3 className="text-3xl text-blue-500" />, url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'Java', icon: <FaJava className="text-3xl text-red-500" />, url: 'https://docs.oracle.com/en/java/' },
  { name: 'React.js', icon: <FaReact className="text-3xl text-blue-400" />, url: 'https://react.dev/blog/2023/03/16/introducing-react-dev' },
  { name: 'Node.js', icon: <DiNodejs className="text-3xl text-green-600" />, url: 'https://nodejs.org/en/docs/' },
  { name: 'Microsoft Azure', icon: <SiMicrosoftazure className="text-3xl text-blue-500" />, url: 'https://learn.microsoft.com/en-us/azure/' },
  { name: 'AWS', icon: <FaAws className="text-3xl text-orange-600" />, url: 'https://aws.amazon.com/documentation/' },
  { name: 'Windows', icon: <FaWindows className="text-3xl text-blue-600" />, url: 'https://docs.microsoft.com/en-us/windows/' },
  { name: 'MacOS', icon: <FaApple className="text-3xl text-gray-800" />, url: 'https://support.apple.com/macos' },
  { name: 'Linux Ubuntu', icon: <FaLinux className="text-3xl text-black" />, url: 'https://help.ubuntu.com/' },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-3xl text-blue-800" />, url: 'https://www.postgresql.org/docs/' },
  { name: 'MySQL', icon: <FaDatabase className="text-3xl text-blue-600" />, url: 'https://dev.mysql.com/doc/' },
  { name: 'Notion', icon: <SiNotion className="text-3xl text-gray-700" />, url: 'https://www.notion.so/help' },
  { name: 'Trello', icon: <SiTrello className="text-3xl text-blue-600" />, url: 'https://help.trello.com/' },
  { name: 'Jira', icon: <SiJira className="text-3xl text-blue-600" />, url: 'https://support.atlassian.com/jira-software-cloud/' },
  { name: 'Tableau', icon: <SiTableau className="text-3xl text-blue-700" />, url: 'https://www.tableau.com/learn/training' },
  { name: 'Power BI', icon: <SiPowerbi className="text-3xl text-yellow-600" />, url: 'https://learn.microsoft.com/en-us/power-bi/' },
  { name: 'Matplotlib', icon: <RiLineChartLine className="text-3xl text-red-600" />, url: 'https://matplotlib.org/stable/users/index' },
  { name: 'Seaborn', icon: <RiLineChartLine className="text-3xl text-blue-600" />, url: 'https://seaborn.pydata.org/' },
];

const learningSkills = [
  { name: 'Docker', icon: <FaDocker className="text-3xl text-blue-400" />, url: 'https://docs.docker.com/' },
  { name: 'Kubernetes', icon: <SiKubernetes className="text-3xl text-blue-600" />, url: 'https://kubernetes.io/docs/' },
  { name: 'TensorFlow', icon: <SiTensorflow className="text-3xl text-orange-600" />, url: 'https://www.tensorflow.org/learn' },
  { name: 'Scikit-learn', icon: <SiScikitlearn className="text-3xl text-blue-600" />, url: 'https://scikit-learn.org/stable/' },
];

const SkillSection = ({ title, skillsArray }) => (
  <div>
    <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
    <div className="flex flex-wrap gap-6 justify-center">
      {skillsArray.map(skill => (
        <a
          key={skill.name}
          href={skill.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-center hover:animate-bob"
        >
          {skill.icon}
          <p className="mt-2 text-sm font-medium text-gray-800">{skill.name}</p>
        </a>
      ))}
    </div>
  </div>
);

const IconSkills = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-6xl">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Technical Skills</h2>
    <SkillSection title="Proficient" skillsArray={skills} />
    <div className="mt-8">
      <SkillSection title="Learning" skillsArray={learningSkills} />
    </div>
  </div>
);

export default IconSkills;