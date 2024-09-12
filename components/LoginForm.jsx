import React, { useState } from 'react';

const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    // For now, we'll just simulate a successful login
    onLoginSuccess();
  };

  return (
    <div className="absolute top-full right-0 mt-2 bg-white p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 active:bg-green-700 transition duration-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 active:bg-gray-500 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
