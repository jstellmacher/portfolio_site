'use client';


import Link from 'next/link';
import { GiMeditation } from 'react-icons/gi';

const ReCenterButton = () => {
    return (
        <Link href="/meditation">
            <button className="flex items-center bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out text-lg font-semibold">
                <GiMeditation className="text-2xl mr-2" />
                Re-Center With Me
            </button>
        </Link>
    );
};

export default ReCenterButton;