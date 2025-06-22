import React, { useState } from 'react';
import { FaRobot, FaUtensils, FaSpinner, FaSave, FaFire } from 'react-icons/fa';
import { HiSparkles, HiTrendingUp } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateDietaryPreferences } from '../store/slices/userSlice';
import { saveUserProfile } from '../services/firebaseService';
import AIChat from './AIChat';

interface MealPlan {
  breakfast: Array<{ name: string; calories: number; protein: number; carbs: number; fat: number; }>;
  lunch: Array<{ name: string; calories: number; protein: number; carbs: number; fat: number; }>;
  dinner: Array<{ name: string; calories: number; protein: number; carbs: number; fat: number; }>;
  snacks: Array<{ name: string; calories: number; protein: number; carbs: number; fat: number; }>;
}

const MealPlanner = () => {
  const dispatch = useAppDispatch();
  const { profile, isProfileComplete, isDietaryPreferencesComplete } = useAppSelector((state) => state.user);
  
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

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Mediterranean'
  ];

  const handleDietaryRestrictionChange = (restriction: string) => {
    const newRestrictions = profile.dietaryRestrictions.includes(restriction)
      ? profile.dietaryRestrictions.filter(r => r !== restriction)
      : [...profile.dietaryRestrictions, restriction];
    
    dispatch(updateDietaryPreferences({ dietaryRestrictions: newRestrictions }));
  };

  const generateMealPlan = async () => {
    if (!isProfileComplete) {
      alert('Please complete your basic information first in the "Your Information" section above.');
      return;
    }

    setIsGenerating(true);
    setShowFloatingButton(false);
    
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
      
      // Save updated profile to Firebase
      try {
        await saveUserProfile(profile);
        console.log('Updated profile saved to Firebase');
      } catch (error) {
        console.error('Error saving to Firebase:', error);
      }
      
      // Show floating button after 5 seconds when meal plan is generated
      setTimeout(() => {
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
      await saveUserProfile(profile);
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
            Get personalized meal plans powered by advanced AI. Select your dietary preferences and let our AI nutritionist create the perfect plan for your goals!
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
          {/* Dietary Preferences Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-blue-100 dark:border-gray-700">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <FaUtensils className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Dietary Preferences
            </h3>
            
            {!isProfileComplete && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-6 mb-8">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">Complete Your Basic Information First</h4>
                <p className="text-yellow-700 dark:text-yellow-200">
                  Please fill out your basic information in the "Your Information" section above before generating your meal plan.
                </p>
              </div>
            )}

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
                <FaUtensils className="h-4 w-4 inline mr-2 text-blue-600 dark:text-blue-400" />
                Select Your Dietary Preferences (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dietaryOptions.map(option => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer bg-gray-50 dark:bg-gray-700 p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={profile.dietaryRestrictions.includes(option)}
                      onChange={() => handleDietaryRestrictionChange(option)}
                      className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateMealPlan}
              disabled={isGenerating || !isProfileComplete}
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
                disabled={isSaving || !isProfileComplete}
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
          <AIChat userProfile={profile} />
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
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-50"></div>
              
              <button
                onClick={scrollToMealPlan}
                className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-110 animate-bounce"
                title="View Your Meal Plan"
              >
                <HiTrendingUp className="h-8 w-8" />
              </button>
              
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