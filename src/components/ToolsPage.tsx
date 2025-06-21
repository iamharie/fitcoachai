import React, { useState } from 'react';
import { FaMobile, FaAppleAlt, FaWeight, FaDumbbell, FaPills, FaHeart, FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';

const ToolsPage = () => {
  const [activeTab, setActiveTab] = useState('apps');

  const tabs = [
    { id: 'apps', label: 'Essential Apps', icon: <FaMobile className="h-5 w-5" /> },
    { id: 'gears', label: 'Training Gears', icon: <FaDumbbell className="h-5 w-5" /> },
    { id: 'supplements', label: 'Recommended Supplements', icon: <FaPills className="h-5 w-5" /> }
  ];

  const apps = [
    {
      name: 'Strong',
      category: 'Workout Tracking',
      description: 'The best strength training app for tracking workouts, sets, reps, and progressive overload.',
      icon: <FaDumbbell className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      rating: 4.9,
      features: ['Exercise Library', 'Progress Tracking', 'Rest Timer', 'Workout History']
    },
    {
      name: 'MyFitnessPal',
      category: 'Nutrition Tracking',
      description: 'Comprehensive calorie and macro tracking with the largest food database available.',
      icon: <FaAppleAlt className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      rating: 4.7,
      features: ['Calorie Tracking', 'Macro Breakdown', 'Barcode Scanner', 'Recipe Importer']
    },
    {
      name: 'HealthifyMe',
      category: 'Health & Wellness',
      description: 'AI-powered health coach for Indian cuisine with personalized meal plans and coaching.',
      icon: <FaHeart className="h-8 w-8" />,
      color: 'from-red-500 to-pink-600',
      rating: 4.6,
      features: ['AI Coach', 'Indian Foods', 'Water Tracking', 'Sleep Monitoring']
    }
  ];

  const gears = [
    {
      name: 'Lifting Belt',
      category: 'Essential Safety',
      description: 'Premium leather lifting belt for core support during heavy squats and deadlifts.',
      icon: <FaWeight className="h-8 w-8" />,
      color: 'from-gray-600 to-gray-700',
      price: '$80-150',
      features: ['Leather Construction', 'Core Support', 'Heavy Lifting', 'Injury Prevention']
    },
    {
      name: 'Paragon Waist Tapper',
      category: 'Powerlifting Gear',
      description: 'Professional-grade waist tapper belt for maximum support during competition lifts.',
      icon: <HiLightningBolt className="h-8 w-8" />,
      color: 'from-indigo-500 to-indigo-600',
      price: '$200-300',
      features: ['Competition Grade', 'Maximum Support', 'Tapered Design', 'IPF Approved']
    },
    {
      name: 'Deadlift Straps',
      category: 'Grip Enhancement',
      description: 'Heavy-duty lifting straps for improved grip strength during deadlifts and rows.',
      icon: <FaDumbbell className="h-8 w-8" />,
      color: 'from-orange-500 to-red-600',
      price: '$20-40',
      features: ['Enhanced Grip', 'Cotton/Nylon Blend', 'Wrist Protection', 'Heavy Duty']
    },
    {
      name: 'Knee Wraps',
      category: 'Joint Support',
      description: 'Elastic knee wraps for additional support and stability during heavy squats.',
      icon: <HiSparkles className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-600',
      price: '$30-60',
      features: ['Elastic Support', 'Knee Stability', 'Squat Performance', 'Injury Prevention']
    },
    {
      name: 'Converse Chuck Taylor',
      category: 'Lifting Shoes',
      description: 'Classic flat-soled shoes perfect for deadlifts and squats with stable base.',
      icon: <FaWeight className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-600',
      price: '$50-80',
      features: ['Flat Sole', 'Stable Base', 'Classic Design', 'Deadlift Friendly']
    }
  ];

  const supplements = [
    {
      name: 'Whey Protein',
      category: 'Protein',
      description: 'High-quality whey protein for muscle recovery and growth. Essential post-workout nutrition.',
      icon: <FaPills className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-600',
      dosage: '25-30g post-workout',
      benefits: ['Muscle Recovery', 'Protein Synthesis', 'Convenient', 'Fast Absorption']
    },
    {
      name: 'Creatine Monohydrate',
      category: 'Performance',
      description: 'Most researched supplement for strength, power, and muscle mass gains.',
      icon: <HiLightningBolt className="h-8 w-8" />,
      color: 'from-green-500 to-teal-600',
      dosage: '5g daily',
      benefits: ['Increased Strength', 'Better Performance', 'Muscle Volume', 'Brain Health']
    },
    {
      name: 'Multivitamin',
      category: 'Health',
      description: 'Comprehensive vitamin and mineral support for overall health and recovery.',
      icon: <FaHeart className="h-8 w-8" />,
      color: 'from-pink-500 to-rose-600',
      dosage: '1 tablet daily',
      benefits: ['Immune Support', 'Energy Production', 'Bone Health', 'Antioxidant Protection']
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'apps':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app, index) => (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div className={`bg-gradient-to-r ${app.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {app.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-gray-700 dark:text-gray-300">{app.rating}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{app.name}</h4>
                  <span className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-full text-sm font-semibold">
                    {app.category}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{app.description}</p>
                
                <div className="space-y-2 mb-6">
                  {app.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl transform hover:scale-105">
                  Download App
                  <FaExternalLinkAlt className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        );

      case 'gears':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gears.map((item, index) => (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <span className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-bold">
                    {item.price}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.name}</h4>
                  <span className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{item.description}</p>
                
                <div className="space-y-2 mb-6">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl transform hover:scale-105">
                  View Options
                  <FaExternalLinkAlt className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        );

      case 'supplements':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supplements.map((supplement, index) => (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div className={`bg-gradient-to-r ${supplement.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {supplement.icon}
                  </div>
                  <span className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-bold">
                    {supplement.dosage}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{supplement.name}</h4>
                  <span className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                    {supplement.category}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{supplement.description}</p>
                
                <div className="space-y-2 mb-6">
                  {supplement.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl transform hover:scale-105">
                  Learn More
                  <FaExternalLinkAlt className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-cyan-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <HiSparkles className="h-8 w-8 text-cyan-600 dark:text-cyan-400 mr-3 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Fitness Arsenal
            </h1>
            <HiSparkles className="h-8 w-8 text-cyan-600 dark:text-cyan-400 ml-3 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the apps, equipment, and supplements I personally use and recommend to optimize your fitness journey. 
            These tools have been game-changers in my training!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-lg'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mb-20">
          {renderContent()}
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 border border-yellow-200 dark:border-yellow-700 rounded-3xl p-8">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Important Disclaimer</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
              These recommendations are based on my personal experience and research. Always consult with healthcare professionals 
              before starting any new supplement regimen. Individual results may vary, and what works for me might not work for everyone. 
              Do your own research and make informed decisions about your health and fitness journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;