import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight, HiStar } from "react-icons/hi";
import { FaQuoteLeft, FaRocket, FaHeart, FaBrain } from "react-icons/fa";

const TestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: <FaRocket className="h-8 w-8" />,
      title: "Lightning Fast Results",
      description:
        "Get your personalized calorie needs calculated in under 2 minutes. Our AI processes your data instantly and provides accurate recommendations based on the latest nutritional science.",
      color: "from-blue-500 to-cyan-500",
      stats: "2 min setup",
    },
    {
      icon: <FaBrain className="h-8 w-8" />,
      title: "AI-Powered Intelligence",
      description:
        "Our advanced AI doesn't just count calories - it understands your lifestyle, preferences, and goals to create meal plans that you'll actually want to follow and can realistically maintain.",
      color: "from-purple-500 to-indigo-500",
      stats: "Smart AI",
    },
    {
      icon: <FaHeart className="h-8 w-8" />,
      title: "Completely Free Forever",
      description:
        "No hidden fees, no premium tiers, no credit card required. We believe everyone deserves access to professional-grade nutrition planning, regardless of budget. Your health shouldn't cost a fortune.",
      color: "from-green-500 to-emerald-500",
      stats: "100% Free",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Our Unique Edge
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the features that make our platform the go-to choice for
            smart nutrition planning
          </p>
        </div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-100 dark:border-gray-700 mx-4">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className={`bg-gradient-to-r ${feature.color} p-6 rounded-full shadow-xl`}
                        >
                          {feature.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Stats Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
                          <HiStar className="h-4 w-4" />
                          {feature.stats}
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                          {feature.title}
                        </h3>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                          {feature.description}
                        </p>

                        {/* CTA Button */}
                        <button
                          onClick={() =>
                            document
                              .getElementById("calorie-calculator")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className={`bg-gradient-to-r ${feature.color} text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                        >
                          Try It Now - Free!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-xl border border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 z-10"
          >
            <HiChevronLeft className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-xl border border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 z-10"
          >
            <HiChevronRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-blue-600 dark:bg-blue-400 w-8"
                    : "bg-blue-200 dark:bg-gray-600 hover:bg-blue-300 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
