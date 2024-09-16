import React, { useState, useEffect } from 'react';
import { FaCoins } from 'react-icons/fa';

const CoinFlip = () => {
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [score, setScore] = useState({ wins: 0, losses: 0 });
  const [stats, setStats] = useState({ heads: 0, tails: 0, total: 0 });

  const flipCoin = () => {
    if (!choice) {
      alert("Please choose Heads or Tails first!");
      return;
    }

    setFlipping(true);
    setTimeout(() => {
      const flipResult = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(flipResult);
      setFlipping(false);
      updateScore(flipResult);
      updateStats(flipResult);
    }, 1000);
  };

  const updateScore = (flipResult) => {
    if (choice === flipResult) {
      setScore(prevScore => ({ ...prevScore, wins: prevScore.wins + 1 }));
    } else {
      setScore(prevScore => ({ ...prevScore, losses: prevScore.losses + 1 }));
    }
  };

  const updateStats = (flipResult) => {
    setStats(prevStats => ({
      ...prevStats,
      [flipResult]: prevStats[flipResult] + 1,
      total: prevStats.total + 1
    }));
  };

  const resetGame = () => {
    setChoice(null);
    setResult(null);
    setScore({ wins: 0, losses: 0 });
    setStats({ heads: 0, tails: 0, total: 0 });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        <FaCoins className="inline-block mr-2 text-yellow-500" />
        Coin Flip Game
      </h1>
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => setChoice('heads')}
          className={`mr-2 px-4 py-2 rounded ${choice === 'heads' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Heads
        </button>
        <button
          onClick={() => setChoice('tails')}
          className={`px-4 py-2 rounded ${choice === 'tails' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Tails
        </button>
      </div>
      <div className="mb-4 text-center">
        <button
          onClick={flipCoin}
          disabled={flipping}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {flipping ? 'Flipping...' : 'Flip Coin'}
        </button>
      </div>
      {result && (
        <div className="mb-4 text-center">
          <p className="text-xl font-bold text-gray-800">
            Result: {result.charAt(0).toUpperCase() + result.slice(1)}
          </p>
          <p className="text-lg text-gray-700">
            {choice === result ? 'You won!' : 'You lost!'}
          </p>
        </div>
      )}
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Your Score</h2>
        <p className="text-gray-700">Wins: {score.wins}</p>
        <p className="text-gray-700">Losses: {score.losses}</p>
      </div>
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Coin Flip Statistics</h2>
        <p className="text-gray-700">Total Flips: {stats.total}</p>
        <p className="text-gray-700">Heads: {stats.heads} ({stats.total > 0 ? ((stats.heads / stats.total) * 100).toFixed(1) : 0}%)</p>
        <p className="text-gray-700">Tails: {stats.tails} ({stats.total > 0 ? ((stats.tails / stats.total) * 100).toFixed(1) : 0}%)</p>
      </div>
      <div className="text-center">
        <button
          onClick={resetGame}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default CoinFlip;
