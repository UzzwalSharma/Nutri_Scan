// src/components/DbBtn.jsx
import React from 'react';

const DbBtn = ({ isDarkMode, setIsDarkMode }) => {
  const handleClick = () => {
    setIsDarkMode(prevMode => !prevMode); // Toggle the dark mode state
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 transition duration-300"
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DbBtn;
