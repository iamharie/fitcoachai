import React, { useState } from 'react';
import { HiCalculator, HiUser, HiScale, HiLightningBolt, HiFire, HiHeart, HiTrendingUp } from 'react-icons/hi';
import { FaWeight, FaRulerVertical, FaVenus, FaMars } from 'react-icons/fa';

interface UserData {
  age: string;
  gender: 'male' | 'female';
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
}

interface CalorieResult {
  bmr: number;
  tdee: number;
  goalCalories: number;
  weightStatus: string;
  bmi: number;
  recommendation: string;
}

const CalorieCalculator = () => {
  const [userData, setUserData] = useState<UserData>({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'maintain'
  });

  const [result, setResult] = useState<CalorieResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little/no exercise)', multiplier: 1.2 },
    { value: 'light', label: 'Light (light exercise 1-3 days/week)', multiplier: 1.375 },
    { value: 'moderate', label: 'Moderate (moderate exercise 3-5 days/week)', multiplier: 1.55 },
    { value: 'active', label: 'Active (hard exercise 6-7 days/week)', multiplier: 1.725 },
    { value: 'very-active', label: 'Very Active (very hard exercise, physical job)', multiplier: 1.9 }
  ];

  const goals = [
    { value: 'lose', label: 'Lose Weight', adjustment: -500 },
    { value: 'maintain', label: 'Maintain Weight', adjustment: 0 },
    { value: 'gain', label: 'Gain Weight', adjustment: 500 }
  ];

  const calculateCalories = () => {
    if (!userData.age || !userData.weight || !userData.height) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCalculating(true);
    // Reset floating button when starting new calculation
    setShowFloatingButton(false);

    setTimeout(() => {
      const age = parseInt(userData.age);
      const weight = parseFloat(userData.weight);
      const height = parseFloat(userData.height);

      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr;
      if (userData.gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      // Calculate TDEE
      const activityMultiplier = activityLevels.find(level => level.value === userData.activityLevel)?.multiplier || 1.55;
      const tdee = bmr * activityMultiplier;

      // Calculate goal calories
      const goalAdjustment = goals.find(goal => goal.value === userData.goal)?.adjustment || 0;
      const goalCalories = tdee + goalAdjustment;

      // Calculate BMI
      const bmi = weight / ((height / 100) ** 2);

      // Determine weight status and recommendation
      let weightStatus = '';
      let recommendation = '';

      if (bmi < 18.5) {
        weightStatus = 'Underweight';
        recommendation = 'You may benefit from gaining some weight in a healthy way. Consider consulting with a healthcare professional for personalized advice. Focus on nutrient-dense foods and strength training to build healthy muscle mass.';
      } else if (bmi >= 18.5 && bmi < 25) {
        weightStatus = 'Normal Weight';
        recommendation = 'Congratulations! You have a healthy weight. Maintain your current lifestyle with balanced nutrition and regular exercise. Focus on building strength and maintaining your overall health.';
      } else if (bmi >= 25 && bmi < 30) {
        weightStatus = 'Overweight';
        recommendation = 'You may benefit from losing some weight to improve your health. A gradual approach with a balanced diet and regular exercise is recommended. Consider consulting with a healthcare professional for personalized guidance.';
      } else {
        weightStatus = 'Obese';
        recommendation = 'For your health and wellbeing, weight loss would be beneficial. Please consider consulting with a healthcare professional for a comprehensive plan. Focus on sustainable lifestyle changes including nutrition and physical activity.';
      }

      const newResult = {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        goalCalories: Math.round(goalCalories),
        weightStatus,
        bmi: parseFloat(bmi.toFixed(1)),
        recommendation
      };

      setResult(newResult);
      setIsCalculating(false);

      // Show floating button after 5 seconds ONLY if we have results
      setTimeout(() => {
        console.log('Setting floating button to true'); // Debug log
        setShowFloatingButton(true);
      }, 5000);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Underweight':
        return 'from-blue-500 to-cyan-500';
      case 'Normal Weight':
        return 'from-green-500 to-emerald-500';
      case 'Overweight':
        return 'from-yellow-500 to-orange-500';
      case 'Obese':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const scrollToMealPlan = () => {
    console.log('Scrolling to meal plan'); // Debug log
    const mealPlanSection = document.getElementById('meal-planner');
    if (mealPlanSection) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = mealPlanSection.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setShowFloatingButton(false);
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <HiCalculator className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Smart Calorie Calculator
            </h2>
            <HiCalculator className="h-8 w-8 text-blue-600 dark:text-blue-400 ml-3" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover your daily calorie needs and get personalized recommendations based on your goals and body composition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-blue-100 dark:border-gray-700">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <HiUser className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Your Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={userData.age}
                    onChange={(e) => setUserData(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Gender *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={userData.gender === 'male'}
                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                        className="w-4 h-4 text-blue-600 border-2 border-blue-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 flex items-center gap-1">
                        <FaMars className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        Male
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={userData.gender === 'female'}
                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                        className="w-4 h-4 text-blue-600 border-2 border-blue-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 flex items-center gap-1">
                        <FaVenus className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                        Female
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Physical Stats */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <FaWeight className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    value={userData.weight}
                    onChange={(e) => setUserData(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="Enter your weight"
                    min="30"
                    max="300"
                    step="0.1"
                    className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <FaRulerVertical className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                    Height (cm) *
                  </label>
                  <input
                    type="number"
                    value={userData.height}
                    onChange={(e) => setUserData(prev => ({ ...prev, height: e.target.value }))}
                    placeholder="Enter your height"
                    min="100"
                    max="250"
                    className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Activity Level and Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  <HiLightningBolt className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                  Activity Level
                </label>
                <select
                  value={userData.activityLevel}
                  onChange={(e) => setUserData(prev => ({ ...prev, activityLevel: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {activityLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  <HiFire className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                  Primary Goal
                </label>
                <select
                  value={userData.goal}
                  onChange={(e) => setUserData(prev => ({ ...prev, goal: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {goals.map(goal => (
                    <option key={goal.value} value={goal.value}>{goal.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateCalories}
              disabled={isCalculating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105"
            >
              {isCalculating ? (
                <>
                  <HiCalculator className="h-6 w-6 animate-spin" />
                  Calculating your perfect calories...
                </>
              ) : (
                <>
                  <HiCalculator className="h-6 w-6" />
                  Calculate My Calories
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-blue-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <HiFire className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              Your Results
            </h3>
            
            {result ? (
              <div className="space-y-6">
                {/* Main Calorie Goal */}
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">{result.goalCalories}</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Daily Calories for Your Goal</div>
                </div>
                
                {/* BMI and Status */}
                <div className={`bg-gradient-to-r ${getStatusColor(result.weightStatus)} rounded-2xl p-6 text-center text-white`}>
                  <div className="text-2xl font-bold mb-2">BMI: {result.bmi}</div>
                  <div className="text-lg font-semibold">{result.weightStatus}</div>
                </div>

                {/* Detailed Breakdown */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.bmr}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">BMR</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.tdee}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">TDEE</div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-2xl p-6 border border-green-200 dark:border-green-700">
                  <h4 className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                    <HiHeart className="h-5 w-5" />
                    Personalized Recommendation
                  </h4>
                  <p className="text-green-700 dark:text-green-200 text-sm leading-relaxed">
                    {result.recommendation}
                  </p>
                </div>

                {/* Next Step CTA */}
                <button
                  onClick={scrollToMealPlan}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl transform hover:scale-105"
                >
                  <HiTrendingUp className="h-5 w-5" />
                  Generate My Meal Plan
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <HiCalculator className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Fill in your information and click calculate to see your personalized calorie recommendations.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Button - Fixed positioning and improved visibility */}
        {showFloatingButton && result && (
          <div className="fixed bottom-8 right-8 z-50">
            <div className="relative">
              {/* Pulsing ring animation */}
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-50"></div>
              
              {/* Main button */}
              <button
                onClick={scrollToMealPlan}
                className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-110 animate-bounce"
                title="Go to Meal Plan Section"
              >
                <HiTrendingUp className="h-8 w-8" />
              </button>
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300">
                Generate Your Meal Plan!
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieCalculator;