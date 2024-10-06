// src/context/DarkModeContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the context
const DarkModeContext = createContext();

// Custom hook to use the dark mode context
export const useDarkMode = () => useContext(DarkModeContext);

// Create a provider component
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
