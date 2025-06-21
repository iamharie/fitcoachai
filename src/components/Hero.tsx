import React from 'react';
import { HiArrowRight, HiSparkles, HiLightningBolt, HiCalculator } from 'react-icons/hi';
import { FaRobot, FaAppleAlt, FaChartLine } from 'react-icons/fa';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-indigo-400 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <HiSparkles className="h-8 w-8 text-cyan-400 mr-2 animate-spin" />
              <span className="text-cyan-400 font-semibold text-lg">AI-Powered Nutrition</span>
              <HiSparkles className="h-8 w-8 text-cyan-400 ml-2 animate-spin" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
              Your Personal
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                AI Nutritionist
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-4xl mx-auto">
            Calculate your daily calorie needs, generate personalized meal plans with AI, 
            and discover the tools that will transform your fitness journey. 
            <span className="text-cyan-400 font-semibold">Completely free!</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-10 py-5 rounded-full font-bold text-xl hover:from-cyan-300 hover:to-blue-400 transform hover:scale-110 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <HiCalculator className="h-6 w-6 animate-bounce" />
              Calculate Your Calories
              <HiArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-3 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-xl backdrop-blur-sm"
            >
              Explore My Tools
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-4 hover:shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <HiCalculator className="h-10 w-10 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Smart Calculator</h3>
              <p className="text-blue-100">Calculate your daily calorie needs based on your goals, activity level, and body composition</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-4 hover:shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaRobot className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Meal Plans</h3>
              <p className="text-blue-100">Personalized nutrition plans generated by advanced AI based on your calorie needs and preferences</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-4 hover:shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-indigo-400 to-purple-500 p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <HiLightningBolt className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Pro Tools</h3>
              <p className="text-blue-100">Discover the apps, gear, and supplements I use to optimize my training and nutrition</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;