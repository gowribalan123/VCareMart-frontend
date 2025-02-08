import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react"; // Import Material Tailwind Button

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Button onClick={toggleTheme} className="bg-gray-200 dark:bg-gray-800">
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default ThemeToggle;
