'use client';
import { useRouter } from 'next/navigation'; // Adjust this import based on Next.js version
import { FaHome, FaClock, FaCircleNotch } from 'react-icons/fa';

const MeditationNav = ({ showGrowingCircle, setShowGrowingCircle }) => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-200 bg-opacity-20 shadow-md z-40">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold">Meditation</h1>
        <div className="flex items-center">
          <button
            onClick={() => router.push('/')}
            className="mr-4 px-4 py-2 rounded text-sm font-medium bg-gray-200 text-gray-800 flex items-center"
          >
            <FaHome className="mr-2" /> Home
          </button>
          <button
            onClick={() => setShowGrowingCircle(false)}
            className={`mr-2 px-4 py-2 rounded text-sm font-medium flex items-center ${
              !showGrowingCircle ? 'bg-blue-500 text-white' : 'bg-opacity-50 bg-gray-200 text-gray-800'
            }`}
          >
            <FaClock className="mr-2" /> Pomodoro Timer
          </button>
          <button
            onClick={() => setShowGrowingCircle(true)}
            className={`px-4 py-2 rounded text-sm font-medium flex items-center ${
              showGrowingCircle ? 'bg-blue-500 text-white' : 'bg-opacity-50 bg-gray-200 text-gray-800'
            }`}
          >
            <FaCircleNotch className="mr-2" /> Growing Circle
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MeditationNav;