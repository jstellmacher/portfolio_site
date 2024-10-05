import React, { useState, useEffect } from 'react';
import { FaCopy, FaPlus, FaTrash } from 'react-icons/fa';
import { HexColorPicker } from "react-colorful";

const ColorTools = () => {
  const [color, setColor] = useState("#808080");
  const [savedColors, setSavedColors] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');

  const getRgbFromHex = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const { r, g, b } = getRgbFromHex(color);

  const handleRgbChange = (component, value) => {
    const newColor = { ...getRgbFromHex(color), [component]: value };
    setColor(`#${newColor.r.toString(16).padStart(2, '0')}${newColor.g.toString(16).padStart(2, '0')}${newColor.b.toString(16).padStart(2, '0')}`);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage(`Copied: ${text}`);
      setTimeout(() => setCopyMessage(''), 2000);
    });
  };

  const saveColor = () => {
    if (!savedColors.includes(color)) {
      setSavedColors([...savedColors, color]);
    }
  };

  const removeColor = (colorToRemove) => {
    setSavedColors(savedColors.filter(c => c !== colorToRemove));
  };

  const copyAllColors = () => {
    const colorList = savedColors.join(', ');
    handleCopy(colorList);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Color Tools</h2>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <h3 className="text-lg font-semibold mb-2">Color Wheel</h3>
          <HexColorPicker color={color} onChange={setColor} />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <h3 className="text-lg font-semibold mb-2">RGB Sliders</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="red">
              Red: {r}
            </label>
            <input
              id="red"
              type="range"
              min="0"
              max="255"
              value={r}
              onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="green">
              Green: {g}
            </label>
            <input
              id="green"
              type="range"
              min="0"
              max="255"
              value={g}
              onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blue">
              Blue: {b}
            </label>
            <input
              id="blue"
              type="range"
              min="0"
              max="255"
              value={b}
              onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div 
          className="w-full h-32 rounded mb-4" 
          style={{ backgroundColor: color }}
        ></div>
        <div className="flex justify-between mb-2">
          <button 
            onClick={() => handleCopy(`rgb(${r},${g},${b})`)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaCopy className="mr-2" /> RGB
          </button>
          <button 
            onClick={() => handleCopy(color)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaCopy className="mr-2" /> HEX
          </button>
          <button 
            onClick={saveColor}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Save
          </button>
        </div>
        {copyMessage && (
          <p className="text-center text-green-600 font-semibold">{copyMessage}</p>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Saved Colors</h3>
        <div className="flex flex-wrap -mx-2">
          {savedColors.map((savedColor, index) => (
            <div key={index} className="w-1/4 px-2 mb-4">
              <div 
                className="w-full h-16 rounded mb-2" 
                style={{ backgroundColor: savedColor }}
              ></div>
              <div className="flex justify-between">
                <span className="text-sm">{savedColor}</span>
                <button 
                  onClick={() => removeColor(savedColor)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        {savedColors.length > 0 && (
          <button 
            onClick={copyAllColors}
            className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded flex items-center mx-auto"
          >
            <FaCopy className="mr-2" /> Copy All Colors
          </button>
        )}
      </div>
    </div>
  );
};

export default ColorTools;