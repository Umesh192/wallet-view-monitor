
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <header className="border-b border-gray-800 dark:border-gray-800 py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">
            Crypto Wallet Dashboard
          </h1>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
