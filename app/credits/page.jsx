// CreditsPage.jsx
import React from "react";

const creditsData = [
  {
    title: "React Icons",
    description: "Used for icons in the project.",
    link: "https://react-icons.github.io/react-icons/"
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for styling.",
    link: "https://tailwindcss.com/"
  },
  {
    title: "OpenAI GPT",
    description: "Assisted in generating ideas and coding solutions. Aimed to assist not to build.",
    link: "https://openai.com"
  },
  {
    title: "Material UI",
    description: "Used for the work experience timeline.",
    link: "https://mui.com/"
  }
];

const CreditCard = ({ title, description, link }) => {
  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-600 border border-gray-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 rounded-lg p-6 m-4 w-full md:w-1/3">
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <a href={link} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600 hover:underline transition-colors">
        {link}
      </a>
    </div>
  );
};

const CreditsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-10">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-100">
        Give Credit Where It's Due
      </h1>
      <div className="flex flex-wrap justify-center">
        {creditsData.map((credit, index) => (
          <CreditCard
            key={index}
            title={credit.title}
            description={credit.description}
            link={credit.link}
          />
        ))}
      </div>
    </div>
  );
};

export default CreditsPage;
