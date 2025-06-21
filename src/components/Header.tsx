import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiMenu, HiX, HiSun, HiMoon, HiHome, HiCalculator, HiSparkles, HiCollection } from 'react-icons/hi';
import { CgGym } from 'react-icons/cg';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, isDarkMode, onToggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: <HiHome className="h-4 w-4" /> },
    { id: 'calorie-calculator', label: 'Calorie Calculator', icon: <HiCalculator className="h-4 w-4" /> },
    { id: 'meal-planner', label: 'AI Meal Planner', icon: <HiSparkles className="h-4 w-4" /> },
    { id: 'tools', label: 'My Tools', icon: <HiCollection className="h-4 w-4" /> },
  ];

  const handleNavigation = (itemId: string) => {
    if (itemId === 'tools') {
      navigate('/tools');
    } else if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => onNavigate(itemId), 100);
    } else {
      onNavigate(itemId);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      onNavigate('home');
    }
  };

  const isActive = (itemId: string) => {
    if (itemId === 'tools' && location.pathname === '/tools') return true;
    if (location.pathname === '/' && activeSection === itemId) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg">
              <CgGym className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FitCoach AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  isActive(item.id)
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {isDarkMode ? (
                <HiSun className="h-6 w-6" />
              ) : (
                <HiMoon className="h-6 w-6" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl border-t border-blue-100 dark:border-gray-700 rounded-b-2xl">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavigation(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isActive(item.id)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;