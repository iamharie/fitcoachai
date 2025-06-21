import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp, HiSparkles, HiLightningBolt } from 'react-icons/hi';
import { FaRocket, FaGift, FaBrain } from 'react-icons/fa';

const WhyChooseUs = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const pitches = [
    {
      icon: <FaRocket className="h-6 w-6" />,
      title: "For Fitness Beginners Who Feel Overwhelmed",
      content: "Starting your fitness journey shouldn't feel like solving a puzzle. You've probably tried countless diets, read conflicting advice, and felt more confused than when you started. Our AI-powered platform cuts through the noise and gives you exactly what you need: your personal calorie target and a meal plan that actually works for YOUR body and lifestyle. No more guessing, no more trial and error - just clear, science-based guidance that gets you results from day one.",
      highlight: "Stop the confusion. Start seeing results."
    },
    {
      icon: <FaBrain className="h-6 w-6" />,
      title: "For People Stuck in Analysis Paralysis",
      content: "You've researched everything - macros, meal timing, supplements, workout splits. You know the theory but can't seem to put it all together into a plan that works. Sound familiar? Our platform takes all that knowledge you've gathered and transforms it into actionable steps. Get your personalized calorie needs calculated in minutes, then let our AI create a meal plan that fits your preferences. No more endless research - just results.",
      highlight: "Turn knowledge into action. Get unstuck today."
    },
    {
      icon: <FaGift className="h-6 w-6" />,
      title: "Why Pay When You Can Get It Free?",
      content: "Other platforms charge $30-100+ per month for basic meal planning and calorie tracking. We believe everyone deserves access to proper nutrition guidance, regardless of their budget. Our advanced AI meal planner, smart calorie calculator, and expert tool recommendations are completely free. No hidden fees, no premium tiers, no credit card required. Just pure value because your health shouldn't depend on your wallet.",
      highlight: "Premium features. Zero cost. Forever free."
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HiSparkles className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Why Choose Our Platform?</h2>
            <HiSparkles className="h-6 w-6 text-blue-600 dark:text-blue-400 ml-2" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Discover why thousands choose our free AI-powered nutrition platform over expensive alternatives
          </p>
        </div>

        <div className="space-y-4">
          {pitches.map((pitch, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full text-white shadow-lg">
                    {pitch.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{pitch.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{pitch.highlight}</p>
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {openAccordion === index ? (
                    <HiChevronUp className="h-6 w-6" />
                  ) : (
                    <HiChevronDown className="h-6 w-6" />
                  )}
                </div>
              </button>
              
              {openAccordion === index && (
                <div className="px-8 pb-6 animate-fadeIn">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {pitch.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Transform Your Nutrition Journey?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Join thousands who've discovered the power of personalized, AI-driven nutrition planning - completely free!
            </p>
            <button
              onClick={() => document.getElementById('calorie-calculator')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <HiLightningBolt className="h-5 w-5" />
              Start Your Free Journey Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;