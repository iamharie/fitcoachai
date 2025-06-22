import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiSun,
  HiMoon,
  HiHome,
  HiCalculator,
  HiSparkles,
  HiCollection,
} from "react-icons/hi";
import { CgGym } from "react-icons/cg";

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", icon: <HiHome className="h-4 w-4" /> },
    {
      id: "calorie-calculator",
      label: "Calorie Calculator",
      icon: <HiCalculator className="h-4 w-4" />,
    },
    {
      id: "meal-planner",
      label: "AI Meal Planner",
      icon: <HiSparkles className="h-4 w-4" />,
    },
    {
      id: "tools",
      label: "My Tools",
      icon: <HiCollection className="h-4 w-4" />,
    },
  ];

  // Track scroll position for dynamic header styling
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (itemId: string) => {
    if (itemId === "tools") {
      navigate("/tools");
    } else if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => onNavigate(itemId), 100);
    } else {
      onNavigate(itemId);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      onNavigate("home");
    }
  };

  const isActive = (itemId: string) => {
    if (itemId === "tools" && location.pathname === "/tools") return true;
    if (location.pathname === "/" && activeSection === itemId) return true;
    return false;
  };

  // Dynamic header styling based on scroll and content
  const getHeaderStyle = () => {
    const isScrolled = scrollY > 20;

    if (isDarkMode) {
      return {
        background: isScrolled
          ? "linear-gradient(135deg, rgba(17, 24, 39, 0.85) 0%, rgba(31, 41, 55, 0.85) 50%, rgba(55, 65, 81, 0.85) 100%)"
          : "linear-gradient(135deg, rgba(17, 24, 39, 0.75) 0%, rgba(31, 41, 55, 0.75) 50%, rgba(55, 65, 81, 0.75) 100%)",
        borderColor: isScrolled
          ? "rgba(75, 85, 99, 0.3)"
          : "rgba(75, 85, 99, 0.2)",
        boxShadow: isScrolled
          ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          : "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      };
    } else {
      return {
        background: isScrolled
          ? "linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.9) 50%, rgba(226, 232, 240, 0.9) 100%)"
          : "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 50%, rgba(226, 232, 240, 0.8) 100%)",
        borderColor: isScrolled
          ? "rgba(148, 163, 184, 0.3)"
          : "rgba(148, 163, 184, 0.2)",
        boxShadow: isScrolled
          ? "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
          : "0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      };
    }
  };

  const headerStyle = getHeaderStyle();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: headerStyle.background,
        borderBottom: `1px solid ${headerStyle.borderColor}`,
        boxShadow: headerStyle.boxShadow,
      }}
    >
      {/* Subtle gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-400/10 dark:via-indigo-400/10 dark:to-purple-400/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
              <CgGym className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-200">
              FitCoach AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden group ${
                  isActive(item.id)
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30 shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-800/60"
                }`}
              >
                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative z-10 flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200 group"
            >
              <div className="relative">
                {isDarkMode ? (
                  <HiSun className="h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
                ) : (
                  <HiMoon className="h-5 w-5 group-hover:-rotate-12 transition-transform duration-200" />
                )}
              </div>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <HiX className="h-5 w-5" />
              ) : (
                <HiMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden absolute top-12 left-0 right-0 rounded-b-xl overflow-hidden"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: isDarkMode
                ? "linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)",
              borderBottom: `1px solid ${headerStyle.borderColor}`,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Mobile menu gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-indigo-500/5 dark:from-blue-400/10 dark:to-indigo-400/10"></div>

            <div className="px-4 py-3 space-y-1 relative">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavigation(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.id)
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-800/60"
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
