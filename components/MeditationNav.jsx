'use client';
import { useRouter } from 'next/navigation'; // Adjust this import based on Next.js version

const MeditationNav = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md z-40">
      <button
        onClick={() => router.push('/')} // Navigate to home
        className="px-6 py-3 rounded text-lg font-medium bg-blue-500 text-white"
      >
        Home
      </button>
    </div>
  );
};

export default MeditationNav;