import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../hooks/UseTheme';

const ThemeToggle: React.FC = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-glass-light dark:bg-glass-dark backdrop-blur-sm transition-all duration-200 hover:ring-2 hover:ring-blue-400"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;