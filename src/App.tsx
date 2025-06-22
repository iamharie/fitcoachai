import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import MealPlanner from "./components/MealPlanner";
import CalorieCalculator from "./components/CalorieCalculator";
import ToolsPage from "./components/ToolsPage";
import TestimonialCarousel from "./components/TestimonialCarousel";
import Footer from "./components/Footer";

// test
import TestForm from "./components/test/TestForm";

function AppContent() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "tools") {
      // Navigate to tools page instead of scrolling
      window.location.href = "/tools";
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Router>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
        }`}
      >
        <Header
          activeSection={activeSection}
          onNavigate={scrollToSection}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        <Routes>
          <Route
            path="/"
            element={
              <main>
                <section id="home">
                  <Hero
                    onGetStarted={() => scrollToSection("calorie-calculator")}
                  />
                </section>

                <section className="pt-16">
                  <WhyChooseUs />
                </section>

                <section id="calorie-calculator" className="pt-16">
                  <CalorieCalculator />
                </section>

                <section id="meal-planner" className="pt-16">
                  <MealPlanner />
                </section>

                <section className="pt-16">
                  <TestimonialCarousel />
                </section>
              </main>
            }
          />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
