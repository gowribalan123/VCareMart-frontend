import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const DarkMode = () => {
  const [currentTheme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    applyTheme();
  }, [currentTheme]);

  function getInitialTheme() {
    let userTheme = null;
    let systemTheme = true;
    if (typeof window !== 'undefined' && window.localStorage) {
      userTheme = localStorage.getItem('theme');
      systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    console.log('User Theme:', userTheme);
    console.log('System Theme:', systemTheme);

    return userTheme || (systemTheme ? 'dark' : 'light');
  }

  function applyTheme() {
    console.log('Applying Theme:', currentTheme);
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#ffffff';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
      localStorage.setItem('theme', 'light');
    }
  }

  function toggleTheme() {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="cursor-pointer transition-colors duration-300">
      {currentTheme === 'dark' ? (
        <Sun width='30px' height='30px' onClick={toggleTheme} aria-label="Switch to light mode" className="text-yellow-500" />
      ) : (
        <Moon width='30px' height='30px' onClick={toggleTheme} aria-label="Switch to dark mode" className="text-yellow-500" />
      )}
    </div>
  );
}
