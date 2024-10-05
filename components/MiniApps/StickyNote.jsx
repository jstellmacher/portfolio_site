import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaPalette } from 'react-icons/fa';

const StickyNote = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (inputValue.trim() !== '') {
      const newNote = {
        id: Date.now(),
        content: inputValue,
        color: getRandomColor(),
        createdAt: new Date().toLocaleString(),
      };
      setNotes([...notes, newNote]);
      setInputValue('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNoteColor = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, color: getRandomColor() } : note
    ));
  };

  const getRandomColor = () => {
    const colors = ['#fef68a', '#ff7eb9', '#7afcff', '#feff9c', '#fff740'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Sticky Notes</h1>
      <div className="mb-6 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your note here..."
          className="flex-grow p-3 border-2 border-yellow-300 rounded-l-lg text-gray-700 focus:outline-none focus:border-yellow-500"
        />
        <button
          onClick={addNote}
          className="bg-yellow-400 text-white p-3 rounded-r-lg hover:bg-yellow-500 transition duration-300"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map(note => (
          <div
            key={note.id}
            className="p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 relative overflow-hidden"
            style={{ 
              backgroundColor: note.color,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-white opacity-30"></div>
            <p className="text-gray-800 mb-3 font-medium">{note.content}</p>
            <small className="text-gray-600 block mb-2">{note.createdAt}</small>
            <div className="flex justify-between items-center">
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                <FaTrash />
              </button>
              <button
                onClick={() => updateNoteColor(note.id)}
                className="text-gray-600 hover:text-gray-800 transition duration-300"
              >
                <FaPalette />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNote;