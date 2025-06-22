import { FaInstagram, FaEnvelope, FaHeart, FaRocket } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";
import useScrollToSection from "./customHooks/scrollToSection";

const Footer = () => {
  const scrollToSection = useScrollToSection();
  // const location = useLocation();
  // const navigate = useNavigate();

  // const handleSectionNav = (sectionId: string) => {
  //   if (location.pathname !== "/") {
  //     navigate("/", { replace: false });
  //     // Wait for navigation, then scroll
  //     setTimeout(() => {
  //       const el = document.getElementById(sectionId);
  //       if (el) el.scrollIntoView({ behavior: "smooth" });
  //     }, 100); // Adjust timeout if needed
  //   } else {
  //     const el = document.getElementById(sectionId);
  //     if (el) el.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 dark:from-black dark:via-gray-900 dark:to-blue-900 text-white py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-indigo-400 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
                <CgGym className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  FitCoach AI
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <HiSparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-blue-300 font-semibold">
                    Powered by AI
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed text-lg">
              Your personal AI nutritionist and fitness companion. Calculate
              your calories, get personalized meal plans, and discover the tools
              that will transform your fitness journey.
              <span className="text-cyan-400 font-bold">
                Completely free, forever!
              </span>
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/trainwithharie/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-xl"
              >
                <FaInstagram className="h-6 w-6 group-hover:animate-bounce" />
              </a>
              <a
                href="mailto:hariharnmohan@gmail.com"
                className="group bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110 shadow-xl"
              >
                <FaEnvelope className="h-6 w-6 group-hover:animate-bounce" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-300">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaRocket className="h-4 w-4 group-hover:text-cyan-400 transition-colors duration-300" />
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("calorie-calculator")}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <HiSparkles className="h-4 w-4 group-hover:text-cyan-400 transition-colors duration-300" />
                  Calorie Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("meal-planner")}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaRocket className="h-4 w-4 group-hover:text-cyan-400 transition-colors duration-300" />
                  AI Meal Planner
                </button>
              </li>
              <li>
                <Link
                  to="/tools"
                  onClick={() => scrollToSection("tools")}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <HiSparkles className="h-4 w-4 group-hover:text-cyan-400 transition-colors duration-300" />
                  My Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & CTA */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-300">
              Get Started
            </h3>
            <div className="space-y-4">
              {/* <div className="flex items-center space-x-3">
                <FaEnvelope className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">hariharnmohan@gmail.com</span>
              </div> */}
              <div className="flex items-center space-x-3">
                <FaInstagram className="h-5 w-5 text-pink-400" />
                <span className="text-gray-300">@trainwithharie</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-bold mb-3 text-white">
                Ready to Transform?
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Join thousands who've revolutionized their nutrition with AI!
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2">
                <HiSparkles className="h-5 w-5" />
                Start Free Today
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2025 FitCoach AI. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <FaHeart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>and AI for your fitness journey</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
