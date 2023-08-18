'use client'

import React, { useState, useEffect } from 'react';


export const useDarkMode = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [darkMode]);

    return [darkMode, setDarkMode];
}

export const DarkModeToggle = () => {

    const [darkMode, setDarkMode] = useDarkMode();

  return (

    <button
        className="absolute top-4 right-4 px-3 py-2 bg-white text-blue-500 dark:bg-gray-800 dark:text-white rounded-md"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>);
}