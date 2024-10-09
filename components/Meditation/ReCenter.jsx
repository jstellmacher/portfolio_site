'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GiMeditation } from 'react-icons/gi';
import { BsTools } from 'react-icons/bs';
import { FaLaptopCode } from 'react-icons/fa';

const ReCenterButton = () => {
    const [tools, setTools] = useState([]);

    useEffect(() => {
        const fetchTools = async () => {
            const response = await fetch('/data/featuredTools.json'); // Correct path to the JSON file
            const data = await response.json();
            setTools(data); // Set the tools state
        };

        fetchTools();
    }, []);

    return (
        <div className="flex flex-col items-center">
            {tools.map((tool, index) => ( // Map over the tools to create buttons
                <Link key={index} href={tool.route}>
                    <button className="flex items-center bg-red-400 text-white p-3 md:p-4 rounded-lg shadow-lg hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out text-base md:text-lg font-semibold">
                        <GiMeditation className="text-xl md:text-2xl mr-2" />
                        {tool.name} {/* Dynamic button name */}
                    </button>
                </Link>
            ))}
            <p className="mt-2 text-base md:text-xl text-gray-50 text-center flex items-center justify-center">
                <span className="mr-2 text-lg md:text-xl">
                    <BsTools />
                </span>
                I built and use this productivity tool daily!
                <span className="ml-2 text-lg md:text-xl">
                    <FaLaptopCode />
                </span>
            </p>
        </div>
    );
};

export default ReCenterButton;