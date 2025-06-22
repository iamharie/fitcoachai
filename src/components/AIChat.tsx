import React, { useState, useRef } from "react";
import { FaRobot, FaPaperPlane, FaUser, FaGripVertical } from "react-icons/fa";
import { HiSparkles, HiLightningBolt, HiChat } from "react-icons/hi";
import type { UserProfile } from "../store/slices/userSlice";

interface AIChatProps {
  userProfile: UserProfile;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const AIChat: React.FC<AIChatProps> = ({ userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [draggedPrompt, setDraggedPrompt] = useState<string | null>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  // Mobile-friendly prompts (only 3 for mobile)
  const preBuiltPrompts = [
    {
      id: "meal-suggestions",
      title: "Meal Ideas",
      prompt:
        "Based on my profile, can you suggest 3 healthy meal options for dinner that fit my calorie goals and dietary preferences?",
      icon: <HiSparkles className="h-5 w-5" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "workout-advice",
      title: "Workout Tips",
      prompt:
        "What type of workout routine would complement my nutrition plan and help me achieve my fitness goals?",
      icon: <HiLightningBolt className="h-5 w-5" />,
      color: "from-green-500 to-green-600",
    },
    {
      id: "macro-breakdown",
      title: "Macro Guide",
      prompt:
        "Can you explain the ideal macro breakdown (protein, carbs, fats) for my specific goals and activity level?",
      icon: <FaRobot className="h-5 w-5" />,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const handleDragStart = (e: React.DragEvent, prompt: string) => {
    e.dataTransfer.setData("text/plain", prompt);
    setDraggedPrompt(prompt);
  };

  const handleDragEnd = () => {
    setDraggedPrompt(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedPrompt = e.dataTransfer.getData("text/plain");
    setInputMessage(droppedPrompt);
    setDraggedPrompt(null);

    // Focus the textarea after dropping
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

  // Mobile click handler for prompts
  const handlePromptClick = (prompt: string) => {
    setInputMessage(prompt);
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual OpenAI API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const aiResponse = generateMockResponse(inputMessage, userProfile);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (
    prompt: string,
    profile: UserProfile
  ): string => {
    // Mock AI responses based on user profile and prompt
    if (
      prompt.toLowerCase().includes("meal") ||
      prompt.toLowerCase().includes("dinner")
    ) {
      return `Based on your profile (${profile.goal} goal, ${profile.activityLevel} activity level), here are 3 dinner suggestions:

1. **Grilled Salmon with Quinoa** - High in protein and omega-3s, perfect for your goals
2. **Chicken Stir-fry with Brown Rice** - Balanced macros with plenty of vegetables
3. **Lentil Curry with Whole Grain Naan** - Plant-based protein option that's filling and nutritious

Each meal is designed to fit within your calorie targets while providing optimal nutrition for your ${profile.goal} goal.`;
    }

    if (
      prompt.toLowerCase().includes("workout") ||
      prompt.toLowerCase().includes("exercise")
    ) {
      return `For your ${profile.goal} goal and ${profile.activityLevel} activity level, I recommend:

**Strength Training**: 3-4 times per week focusing on compound movements
**Cardio**: 2-3 sessions of moderate intensity cardio
**Recovery**: 1-2 rest days with light activity like walking

This combination will complement your nutrition plan and help you achieve your fitness goals effectively.`;
    }

    if (
      prompt.toLowerCase().includes("macro") ||
      prompt.toLowerCase().includes("protein")
    ) {
      return `Based on your profile, here's your ideal macro breakdown:

**Protein**: 25-30% of calories (supports ${profile.goal} goal)
**Carbohydrates**: 40-45% of calories (fuels your ${profile.activityLevel} lifestyle)
**Fats**: 25-30% of calories (essential for hormone production)

This ratio is optimized for your specific goals and activity level.`;
    }

    return `Thank you for your question! Based on your profile (${profile.name}, ${profile.goal} goal, ${profile.activityLevel} activity), I'd be happy to provide personalized advice. Your current settings show you're focused on ${profile.goal} with a ${profile.activityLevel} lifestyle, which helps me tailor my recommendations specifically for you.`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-blue-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
          <FaRobot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Nutrition Assistant
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="hidden md:inline">Drag prompts below or </span>
            <span className="md:hidden">Tap prompts below or </span>
            type your own questions
          </p>
        </div>
      </div>

      {/* Pre-built Prompts */}
      <div className="mb-8">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <HiSparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="hidden md:inline">Quick Prompts (Drag & Drop)</span>
          <span className="md:hidden">Quick Prompts (Tap to Use)</span>
        </h4>

        {/* Desktop: Drag & Drop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {preBuiltPrompts.map((prompt) => (
            <div
              key={prompt.id}
              draggable
              onDragStart={(e) => handleDragStart(e, prompt.prompt)}
              onDragEnd={handleDragEnd}
              className={`bg-gradient-to-r ${
                prompt.color
              } p-4 rounded-xl text-white cursor-grab active:cursor-grabbing transform hover:scale-105 transition-all duration-300 shadow-lg ${
                draggedPrompt === prompt.prompt ? "opacity-50 scale-95" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <FaGripVertical className="h-4 w-4 opacity-70" />
                {prompt.icon}
                <span className="font-bold text-sm">{prompt.title}</span>
              </div>
              <p className="text-xs opacity-90 line-clamp-2">{prompt.prompt}</p>
            </div>
          ))}
        </div>

        {/* Mobile: Simple Tap Cards */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {preBuiltPrompts.map((prompt) => (
            <div
              key={prompt.id}
              onClick={() => handlePromptClick(prompt.prompt)}
              className={`bg-gradient-to-r ${prompt.color} p-6 rounded-xl text-white cursor-pointer transform transition-all duration-300 shadow-lg hover:scale-105 active:scale-95`}
            >
              <div className="flex items-center gap-3 mb-3">
                {prompt.icon}
                <span className="font-bold text-lg">{prompt.title}</span>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                {prompt.prompt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 mb-6 max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <FaRobot className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              <span className="hidden md:inline">
                Start a conversation by dragging a prompt above or typing your
                own question!
              </span>
              <span className="md:hidden">
                Start a conversation by tapping a prompt above or typing your
                own question!
              </span>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "ai" && (
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-full flex-shrink-0">
                    <FaRobot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-500"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === "user"
                        ? "text-blue-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.type === "user" && (
                  <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-full flex-shrink-0">
                    <FaUser className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-full">
                  <FaRobot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-600 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-500">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="relative" onDragOver={handleDragOver} onDrop={handleDrop}>
        <div
          className={`border-2 border-dashed rounded-2xl transition-all duration-300 ${
            draggedPrompt
              ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
              : "border-transparent"
          }`}
        >
          <div className="flex gap-3">
            <textarea
              ref={chatInputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question or drag a prompt here..."
              className="flex-1 px-4 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows={3}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 shadow-xl transform hover:scale-105 self-end"
            >
              <FaPaperPlane className="h-4 w-4" />
              Send
            </button>
          </div>
        </div>
        {draggedPrompt && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
              Drop here to use this prompt!
            </div>
          </div>
        )}
      </div>

      {/* User Profile Context */}
      {userProfile.name && (
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
            Your Profile Context:
          </h5>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            The AI has access to your profile: {userProfile.name},{" "}
            {userProfile.age} years old,
            {userProfile.goal} goal, {userProfile.activityLevel} activity level
            {userProfile.dietaryRestrictions.length > 0 &&
              `, with ${userProfile.dietaryRestrictions.join(
                ", "
              )} preferences`}
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default AIChat;
