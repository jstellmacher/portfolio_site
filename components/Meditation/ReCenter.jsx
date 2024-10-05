'use client';

import Link from 'next/link';
import { GiMeditation } from 'react-icons/gi';
import { BsTools } from 'react-icons/bs';
import { FaLaptopCode } from 'react-icons/fa';

const ReCenterButton = () => {
    return (
        <div className="flex flex-col items-center">
            <Link href="/meditation">
                <button className="flex items-center bg-red-400 text-white p-3 md:p-4 rounded-lg shadow-lg hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out text-base md:text-lg font-semibold">
                    <GiMeditation className="text-xl md:text-2xl mr-2" />
                    Re-Center With Me
                </button>
            </Link>
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