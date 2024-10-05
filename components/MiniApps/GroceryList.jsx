import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    // Load items from localStorage when the component mounts
    const savedItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
    setItems(savedItems);
  }, []);

  useEffect(() => {
    // Save items to localStorage whenever the items state changes
    localStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    if (editIndex === -1) {
      // Create new item
      const newItem = {
        id: new Date().getTime(),
        name: inputValue,
        date: new Date().toLocaleDateString(),
      };
      setItems([...items, newItem]);
    } else {
      // Update existing item
      const updatedItems = items.map((item, index) =>
        index === editIndex ? { ...item, name: inputValue } : item
      );
      setItems(updatedItems);
      setEditIndex(-1);
    }
    setInputValue('');
  };

  const startEdit = (index) => {
    setInputValue(items[index].name);
    setEditIndex(index);
  };

  const deleteItem = (id) => {
    const filteredItems = items.filter(item => item.id !== id);
    setItems(filteredItems);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Grocery List</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add an item"
            className="flex-grow p-2 border rounded text-gray-700"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 flex items-center"
          >
            <FaPlus className="mr-2" /> {editIndex === -1 ? 'Add' : 'Update'}
          </button>
        </div>
      </form>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <span className="text-gray-800 font-semibold">{item.name}</span>
              <span className="text-gray-500 text-sm ml-2">({item.date})</span>
            </div>
            <div>
              <button
                onClick={() => startEdit(index)}
                className="text-blue-500 hover:text-blue-700 mr-2 transition duration-300"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
