import React, { useState } from 'react';

const CustomLoremIpsum = () => {
  const [paragraphs, setParagraphs] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
    'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
    'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'voluptate', 'velit',
    'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
    'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui',
    'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3; // 3 to 7 sentences
    let paragraph = '';

    for (let i = 0; i < sentenceCount; i++) {
      const wordCount = Math.floor(Math.random() * 10) + 5; // 5 to 14 words
      let sentence = '';

      for (let j = 0; j < wordCount; j++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        sentence += words[randomIndex] + ' ';
      }

      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1).trim() + '. ';
      paragraph += sentence;
    }

    return paragraph.trim();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const parsedParagraphs = parseInt(paragraphs);

    if (isNaN(parsedParagraphs) || parsedParagraphs < 1) {
      alert('Please enter a valid number of paragraphs (minimum 1)');
      return;
    }

    const generatedParagraphs = [];
    for (let i = 0; i < parsedParagraphs; i++) {
      generatedParagraphs.push(generateParagraph());
    }

    setGeneratedText(generatedParagraphs.join('\n\n'));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Custom Lorem Ipsum Generator</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="number"
            value={paragraphs}
            onChange={(e) => setParagraphs(e.target.value)}
            placeholder="Number of paragraphs"
            className="flex-grow p-2 border rounded text-gray-700"
            min="1"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Generate
          </button>
        </div>
      </form>

      {generatedText && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Generated Text:</h2>
          <div className="text-gray-700 whitespace-pre-wrap">
            {generatedText}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomLoremIpsum;
