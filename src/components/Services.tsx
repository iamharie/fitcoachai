import React from 'react';
import { CgGym } from 'react-icons/cg';
import { HiUsers, HiCalendar, HiLightningBolt, HiHeart } from 'react-icons/hi';
import { FiAward } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      icon: <CgGym className="h-8 w-8" />,
      title: "Personal Training Programs",
      description: "Customized strength training programs tailored to your fitness level and goals. Each program is scientifically designed to maximize results.",
      features: ["Custom workout plans", "Progressive overload", "Form correction", "Goal tracking"]
    },
    {
      icon: <HiUsers className="h-8 w-8" />,
      title: "Group Training Sessions",
      description: "High-energy group workouts that combine strength training with community support. Perfect for motivation and accountability.",
      features: ["Small group sizes", "Team motivation", "Competitive elements", "Social support"]
    },
    {
      icon: <HiCalendar className="h-8 w-8" />,
      title: "Flexible Scheduling",
      description: "Train on your schedule with flexible session times and program adjustments that fit your busy lifestyle.",
      features: ["Online booking", "Flexible timing", "Makeup sessions", "Schedule changes"]
    }
  ];

  const specialties = [
    {
      icon: <HiLightningBolt className="h-6 w-6" />,
      title: "Strength Building",
      description: "Proven methods to increase your functional strength and muscle mass"
    },
    {
      icon: <FiAward className="h-6 w-6" />,
      title: "Competition Prep",
      description: "Specialized training for powerlifting and strength competitions"
    },
    {
      icon: <HiHeart className="h-6 w-6" />,
      title: "Injury Prevention",
      description: "Focus on proper form and mobility to prevent injuries"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">FitCoach Pro</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              With over 5 years of experience in strength training and fitness coaching, I've helped hundreds of clients 
              achieve their fitness goals through personalized training programs and comprehensive lifestyle guidance.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">My Philosophy</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Strength training is more than just lifting weights—it's about building confidence, discipline, and resilience. 
                I believe in creating sustainable habits that transform not just your body, but your entire approach to health and wellness. 
                Every program I design is backed by science and tailored to your unique needs and goals.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 w-16 h-16 rounded-full flex items-center justify-center text-white mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Specialties */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Areas of Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {specialty.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{specialty.title}</h4>
                <p className="text-gray-600">{specialty.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Transformation?</h3>
            <p className="text-xl mb-8 text-blue-100">
              Join hundreds of satisfied clients who have achieved their strength goals with professional guidance.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Contact Me Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;