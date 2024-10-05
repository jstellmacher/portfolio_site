import React, { useState, useEffect } from 'react';
import { FaDatabase } from 'react-icons/fa';

const questions = [
  {
    id: 1,
    question: "Select all columns from the 'users' table.",
    answer: "SELECT * FROM users",
    hint: "Use * to select all columns",
  },
  {
    id: 2,
    question: "Select the 'name' column from the 'products' table.",
    answer: "SELECT name FROM products",
    hint: "Specify the column name after SELECT",
  },
  {
    id: 3,
    question: "Select all columns from the 'orders' table where the 'total' is greater than 100.",
    answer: "SELECT * FROM orders WHERE total > 100",
    hint: "Use the WHERE clause to filter results",
  },
  // Add more questions as needed
];

const SQLGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === questions[currentQuestion].answer.toLowerCase();
    if (correct) {
      setScore(score + 1);
      setFeedback('Correct! Well done!');
    } else {
      setFeedback('Incorrect. Try again or use the hint.');
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
      setShowHint(false);
      setFeedback('');
    } else {
      setFeedback(`Game Over! Your final score is ${score}/${questions.length}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        <FaDatabase className="inline-block mr-2 text-blue-600" />
        SQL Query Game
      </h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Question {currentQuestion + 1}:</h2>
        <p className="text-gray-700">{questions[currentQuestion].question}</p>
      </div>
      <textarea
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-full p-2 border rounded text-gray-800 mb-4"
        rows="3"
        placeholder="Write your SQL query here"
      />
      <div className="flex justify-between mb-4">
        <button
          onClick={checkAnswer}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Check Answer
        </button>
        <button
          onClick={() => setShowHint(!showHint)}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
      </div>
      {showHint && (
        <div className="mb-4 p-2 bg-yellow-100 rounded">
          <p className="text-gray-700">Hint: {questions[currentQuestion].hint}</p>
        </div>
      )}
      {feedback && (
        <div className={`mb-4 p-2 rounded ${feedback.includes('Correct') ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className="text-gray-700">{feedback}</p>
        </div>
      )}
      <div className="flex justify-between items-center">
        <p className="text-gray-700">Score: {score}/{questions.length}</p>
        <button
          onClick={nextQuestion}
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default SQLGame;
