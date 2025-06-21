import React, { useState, useEffect } from 'react';
import { HiPlus, HiMinus, HiOutlineChartBar, HiTrendingUp, HiCalendar, HiFire } from 'react-icons/hi';
import { FaCalculator, FaChartPie, FaAppleAlt } from 'react-icons/fa';

interface CalorieEntry {
  id: string;
  date: string;
  calories: number;
  goal: number;
}

interface FoodItem {
  name: string;
  calories: number;
  quantity: number;
}

const CalorieTracker = () => {
  const [todayCalories, setTodayCalories] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [entries, setEntries] = useState<CalorieEntry[]>([]);
  const [foodName, setFoodName] = useState('');
  const [foodCalories, setFoodCalories] = useState('');
  const [quickAddAmount, setQuickAddAmount] = useState(100);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const savedEntries = localStorage.getItem('calorieEntries');
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      setEntries(parsedEntries);
      
      const todayEntry = parsedEntries.find((entry: CalorieEntry) => entry.date === today);
      if (todayEntry) {
        setTodayCalories(todayEntry.calories);
        setDailyGoal(todayEntry.goal);
      }
    }
  }, [today]);

  const saveToStorage = (newEntries: CalorieEntry[]) => {
    localStorage.setItem('calorieEntries', JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const updateTodayCalories = (newCalories: number) => {
    setTodayCalories(newCalories);
    
    const existingEntryIndex = entries.findIndex(entry => entry.date === today);
    let newEntries;
    
    if (existingEntryIndex >= 0) {
      newEntries = [...entries];
      newEntries[existingEntryIndex] = {
        ...newEntries[existingEntryIndex],
        calories: newCalories,
        goal: dailyGoal
      };
    } else {
      newEntries = [...entries, {
        id: Date.now().toString(),
        date: today,
        calories: newCalories,
        goal: dailyGoal
      }];
    }
    
    saveToStorage(newEntries);
  };

  const addFood = () => {
    if (!foodName || !foodCalories) {
      alert('Please enter both food name and calories');
      return;
    }
    
    const calories = parseInt(foodCalories);
    const newTotal = todayCalories + calories;
    updateTodayCalories(newTotal);
    
    setFoodName('');
    setFoodCalories('');
  };

  const quickAdd = () => {
    const newTotal = todayCalories + quickAddAmount;
    updateTodayCalories(newTotal);
  };

  const quickSubtract = () => {
    const newTotal = Math.max(0, todayCalories - quickAddAmount);
    updateTodayCalories(newTotal);
  };

  const updateGoal = (newGoal: number) => {
    setDailyGoal(newGoal);
    updateTodayCalories(todayCalories);
  };

  const progressPercentage = Math.min((todayCalories / dailyGoal) * 100, 100);
  const remaining = Math.max(dailyGoal - todayCalories, 0);

  const getLastWeekData = () => {
    const lastWeek = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const entry = entries.find(e => e.date === dateString);
      lastWeek.push({
        date: dateString,
        calories: entry ? entry.calories : 0,
        goal: entry ? entry.goal : dailyGoal
      });
    }
    return lastWeek;
  };

  const weekData = getLastWeekData();
  const weeklyAverage = weekData.reduce((sum, day) => sum + day.calories, 0) / 7;

  return (
    <div className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <FaCalculator className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart Calorie Tracker
            </h2>
            <FaCalculator className="h-8 w-8 text-green-600 ml-3" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your daily calorie intake with our modern, intelligent calculator. Stay on target with your fitness goals!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracker */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-2xl border border-green-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <HiFire className="h-8 w-8 text-orange-600" />
                Today's Progress
              </h3>
              <div className="flex items-center text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                <HiCalendar className="h-5 w-5 mr-2" />
                {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Progress Circle */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progressPercentage * 2.51} 251.2`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-gray-900">{todayCalories}</span>
                <span className="text-gray-500 font-semibold">calories</span>
                <span className="text-sm text-gray-400">of {dailyGoal}</span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-green-600 mb-2">{Math.round(progressPercentage)}%</div>
                <div className="text-sm font-semibold text-green-800">Progress</div>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-blue-600 mb-2">{remaining}</div>
                <div className="text-sm font-semibold text-blue-800">Remaining</div>
              </div>
            </div>

            {/* Food Entry */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaAppleAlt className="h-5 w-5 text-red-500" />
                Add Food
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="Food name"
                  className="px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300"
                />
                <input
                  type="number"
                  value={foodCalories}
                  onChange={(e) => setFoodCalories(e.target.value)}
                  placeholder="Calories"
                  min="1"
                  className="px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300"
                />
                <button
                  onClick={addFood}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Add Food
                </button>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Quick Add/Remove:</label>
                <input
                  type="number"
                  value={quickAddAmount}
                  onChange={(e) => setQuickAddAmount(Number(e.target.value))}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
                  min="1"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={quickAdd}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl transform hover:scale-105"
                >
                  <HiPlus className="h-6 w-6" />
                  Add
                </button>
                <button
                  onClick={quickSubtract}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl transform hover:scale-105"
                >
                  <HiMinus className="h-6 w-6" />
                  Remove
                </button>
              </div>

              <div className="flex items-center gap-4">
                <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Daily Goal:</label>
                <input
                  type="number"
                  value={dailyGoal}
                  onChange={(e) => updateGoal(Number(e.target.value))}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
                  min="1000"
                  max="5000"
                />
              </div>
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HiTrendingUp className="h-6 w-6 text-blue-600" />
              Weekly Overview
            </h3>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <FaChartPie className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-gray-900">Weekly Average</span>
              </div>
              <div className="text-3xl font-black text-blue-600">{Math.round(weeklyAverage)}</div>
              <div className="text-sm text-gray-600">calories per day</div>
            </div>

            <div className="space-y-3">
              {weekData.map((day, index) => {
                const dayProgress = day.goal > 0 ? (day.calories / day.goal) * 100 : 0;
                const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
                const isToday = day.date === today;
                
                return (
                  <div key={day.date} className={`p-4 rounded-xl transition-all duration-300 ${
                    isToday 
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-bold ${isToday ? 'text-blue-900' : 'text-gray-700'}`}>
                        {dayName} {isToday && '(Today)'}
                      </span>
                      <span className={`text-sm font-semibold ${isToday ? 'text-blue-700' : 'text-gray-500'}`}>
                        {day.calories} / {day.goal}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          isToday 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                            : 'bg-gradient-to-r from-green-400 to-blue-500'
                        }`}
                        style={{ width: `${Math.min(dayProgress, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieTracker;