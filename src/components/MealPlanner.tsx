import React, { useState } from 'react';
import { FaRobot, FaUser, FaWeight, FaRulerVertical, FaEnvelope, FaCalendarAlt, FaSpinner, FaSave, FaUtensils, FaFire } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt, HiTrendingUp } from 'react-icons/hi';
import AIChat from './AIChat';

interface UserProfile {
  name: string;
  age: string;
  email: string;
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
  dietaryRestrictions: string[];
}

interface MealPlan {
  breakfast: Array<{ name: string; calories: number; protein: number; carbs: number; fat: number; }>;
  lunch: Array<{ name: string; calories: number; protein: number; carbs: number; fat: number; }>;
  dinner: Array<{ name: string; calories: number; protein: number; carbs: number; fat: number; }>;
  snacks: Array<{ name: string; calories: number; protein: number; carbs: number; fat: number; }>;
}

const MealPlanner = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    age: '',
    email: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'maintain',
    dietaryRestrictions: []
  });

  const [mealPlan, setMealPlan] = useState<MealPlan>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
    { value: 'light', label: 'Light (light exercise 1-3 days/week)' },
    { value: 'moderate', label: 'Moderate (moderate exercise 3-5 days/week)' },
    { value: 'active', label: 'Active (hard exercise 6-7 days/week)' },
    { value: 'very-active', label: 'Very Active (very hard exercise, physical job)' }
  ];

  const goals = [
    { value: 'lose', label: 'Lose Weight' },
    { value: 'maintain', label: 'Maintain Weight' },
    { value: 'gain', label: 'Gain Weight' },
    { value: 'muscle', label: 'Build Muscle' }
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Mediterranean'
  ];

  const handleDietaryRestrictionChange = (restriction: string) => {
    setUserProfile(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }));
  };

  const generateMealPlan = async () => {
    if (!userProfile.name || !userProfile.age || !userProfile.email || !userProfile.weight || !userProfile.height) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setShowFloatingButton(false); // Reset floating button
    
    try {
      // Simulate AI API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock meal plan based on user profile
      const mockMealPlan: MealPlan = {
        breakfast: [
          { name: 'Greek Yogurt with Berries', calories: 250, protein: 20, carbs: 30, fat: 8 },
          { name: 'Whole Grain Toast', calories: 120, protein: 4, carbs: 22, fat: 2 },
          { name: 'Almond Butter', calories: 190, protein: 7, carbs: 7, fat: 17 }
        ],
        lunch: [
          { name: 'Grilled Chicken Salad', calories: 350, protein: 35, carbs: 15, fat: 18 },
          { name: 'Quinoa', calories: 160, protein: 6, carbs: 29, fat: 3 },
          { name: 'Avocado', calories: 120, protein: 2, carbs: 6, fat: 11 }
        ],
        dinner: [
          { name: 'Baked Salmon', calories: 280, protein: 40, carbs: 0, fat: 12 },
          { name: 'Sweet Potato', calories: 180, protein: 4, carbs: 41, fat: 0 },
          { name: 'Steamed Broccoli', calories: 55, protein: 6, carbs: 11, fat: 1 }
        ],
        snacks: [
          { name: 'Apple with Peanut Butter', calories: 190, protein: 8, carbs: 25, fat: 8 },
          { name: 'Protein Smoothie', calories: 200, protein: 25, carbs: 15, fat: 5 }
        ]
      };
      
      setMealPlan(mockMealPlan);
      
      // Show floating button after 5 seconds when meal plan is generated
      setTimeout(() => {
        console.log('Setting floating button to true after meal plan generation');
        setShowFloatingButton(true);
      }, 5000);
      
    } catch (error) {
      console.error('Error generating meal plan:', error);
      alert('Error generating meal plan. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveToFirebase = async () => {
    setIsSaving(true);
    
    try {
      // Simulate Firebase save
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        ...userProfile,
        mealPlan,
        createdAt: new Date().toISOString(),
        totalCalories: getTotalNutrition().calories
      };
      
      // TODO: Replace with actual Firebase integration
      console.log('Saving to Firebase:', userData);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getTotalNutrition = () => {
    const allFoods = [...mealPlan.breakfast, ...mealPlan.lunch, ...mealPlan.dinner, ...mealPlan.snacks];
    return allFoods.reduce(
      (total, food) => ({
        calories: total.calories + food.calories,
        protein: total.protein + food.protein,
        carbs: total.carbs + food.carbs,
        fat: total.fat + food.fat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const scrollToMealPlan = () => {
    console.log('Scrolling to meal plan section');
    const mealPlanSection = document.querySelector('[data-meal-plan-section]');
    if (mealPlanSection) {
      mealPlanSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setShowFloatingButton(false);
    }
  };

  const totalNutrition = getTotalNutrition();

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <HiSparkles className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3 animate-spin" />
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              AI Meal Planner
            </h2>
            <HiSparkles className="h-8 w-8 text-blue-600 dark:text-blue-400 ml-3 animate-spin" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get personalized meal plans powered by advanced AI. Just fill in your details and let our AI nutritionist create the perfect plan for your goals!
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-bounce">
            <div className="flex items-center gap-2">
              <FaSave className="h-5 w-5" />
              <span className="font-semibold">Profile saved successfully!</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-blue-100 dark:border-gray-700">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <FaUser className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Your Profile
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <FaUser className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <FaCalendarAlt className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                    Age *
                  </label>
                  <input
                    type="number"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <FaEnvelope className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
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
                    value={userProfile.weight}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="Enter your weight"
                    min="30"
                    max="300"
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
                    value={userProfile.height}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, height: e.target.value }))}
                    placeholder="Enter your height"
                    min="100"
                    max="250"
                    className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <HiLightningBolt className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                    Activity Level
                  </label>
                  <select
                    value={userProfile.activityLevel}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, activityLevel: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {activityLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Goals and Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  <FaFire className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                  Primary Goal
                </label>
                <select
                  value={userProfile.goal}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, goal: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {goals.map(goal => (
                    <option key={goal.value} value={goal.value}>{goal.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  <FaUtensils className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                  Dietary Preferences
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {dietaryOptions.map(option => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userProfile.dietaryRestrictions.includes(option)}
                        onChange={() => handleDietaryRestrictionChange(option)}
                        className="w-4 h-4 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateMealPlan}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <FaSpinner className="h-6 w-6 animate-spin" />
                  AI is creating your perfect meal plan...
                </>
              ) : (
                <>
                  <FaRobot className="h-6 w-6" />
                  Generate AI Meal Plan
                  <HiSparkles className="h-6 w-6" />
                </>
              )}
            </button>
          </div>

          {/* Nutrition Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-blue-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaFire className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              Daily Nutrition
            </h3>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black text-orange-600 dark:text-orange-400 mb-2">{totalNutrition.calories}</div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Calories</div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalNutrition.protein}g</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">Protein</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalNutrition.carbs}g</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">Carbs</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{totalNutrition.fat}g</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">Fat</div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={saveToFirebase}
                disabled={isSaving || totalNutrition.calories === 0}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl transform hover:scale-105"
              >
                {isSaving ? (
                  <>
                    <FaSpinner className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="h-5 w-5" />
                    Save Profile & Plan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="mt-16">
          <AIChat userProfile={userProfile} />
        </div>

        {/* Generated Meal Plan */}
        {(mealPlan.breakfast.length > 0 || mealPlan.lunch.length > 0 || mealPlan.dinner.length > 0 || mealPlan.snacks.length > 0) && (
          <div data-meal-plan-section className="mt-16 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-blue-100 dark:border-gray-700">
            <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Personalized Meal Plan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map((mealType) => (
                <div key={mealType} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-6 border border-blue-100 dark:border-gray-700">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 capitalize flex items-center gap-2">
                    <FaUtensils className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    {mealType}
                  </h4>
                  <div className="space-y-3">
                    {mealPlan[mealType].map((food, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-gray-600">
                        <div className="font-semibold text-gray-900 dark:text-white mb-2">{food.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 grid grid-cols-2 gap-2">
                          <span className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded-full text-orange-700 dark:text-orange-300 font-medium">
                            {food.calories} cal
                          </span>
                          <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full text-blue-700 dark:text-blue-300 font-medium">
                            P: {food.protein}g
                          </span>
                          <span className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-green-700 dark:text-green-300 font-medium">
                            C: {food.carbs}g
                          </span>
                          <span className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-full text-yellow-700 dark:text-yellow-300 font-medium">
                            F: {food.fat}g
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Floating Button - Shows after meal plan generation */}
        {showFloatingButton && totalNutrition.calories > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <div className="relative">
              {/* Pulsing ring animations */}
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-50"></div>
              
              {/* Main button */}
              <button
                onClick={scrollToMealPlan}
                className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-110 animate-bounce"
                title="View Your Meal Plan"
              >
                <HiTrendingUp className="h-8 w-8" />
              </button>
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300">
                View Your Meal Plan!
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;