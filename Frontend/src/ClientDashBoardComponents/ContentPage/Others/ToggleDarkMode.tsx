import { useEffect } from 'react';
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react'; // Importing icons

export function ToggleDarkMode() {
  const a=localStorage.getItem('theme');
  const [theme, setTheme] = useState(a===null||undefined?'light':a);
 // تطبيق الثيم تلقائيًا عند تغييره
 useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}, [theme]);

const toggleTheme = () => {
  setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
};
  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-between w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer transition-all duration-300 ease-in-out"
    >
      {/* Circle that moves */}
      <div
        className={`absolute top-0 left-0 border border-gray-400 dark:border-gray-900 w-8 h-8 bg-white dark:bg-gray-900 rounded-full transition-transform duration-300 transform ${
          theme === 'dark' ? 'translate-x-0' : 'translate-x-8' // Adjusted translate-x value for smooth movement
        }`}
      ></div>

      {/* Icons for light and dark mode */}
      <div className="absolute left-2  text-gray-600 dark:text-yellow-300">
        <Moon size={20} />
      </div>
      <div className="absolute right-2 text-yellow-500 dark:text-gray-200">
        <Sun size={20} />
      </div>
    </button>
  );
}
