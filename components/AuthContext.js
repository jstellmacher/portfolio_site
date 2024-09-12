import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // If username and password exist in localStorage, set authenticated state to true
    if (storedUsername && storedPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password) => {
    // Check if the credentials match the stored ones
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // If the username and password match the stored values
    if (storedUsername === username && storedPassword === password) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  const storeCredentials = (username, password) => {
    // Store the username and password in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  };

  const logout = () => {
    // Remove credentials and authentication token from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, storeCredentials, logout }}>
      {children}
    </AuthContext.Provider>
  );
};