'use client';

import Link from 'next/link';

const ReCenterButton = () => {
    return (
        <Link href="/meditation">
            <button className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out text-lg font-semibold">
                Re-Center With Me
            </button>
        </Link>
    );
};

export default ReCenterButton;