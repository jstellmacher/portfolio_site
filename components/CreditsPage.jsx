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
    description: "Assisted in generating ideas and coding solutions.",
    link: "https://openai.com"
  }
];

const CreditCard = ({ title, description, link }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full md:w-1/3">
      <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <a href={link} className="text-blue-500 hover:underline">
        {link}
      </a>
    </div>
  );
};

const CreditsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-400 p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
        Give Credit Where Credit is Due
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
