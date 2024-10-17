"use client";

import React from "react";

const FunctionalityShowcase = () => {
  const features = [
    {
      title: "Personalized Diet Plans",
      description: "Receive customized meal plans tailored to your dietary needs and preferences.",
      icon: "🍏", 
    },
    {
      title: "Calorie Tracking",
      description: "Easily track your daily calorie intake and monitor your nutritional goals.",
      icon: "📊",
    },
    {
      title: "Health Insights",
      description: "Get insights into how different foods affect your body and health.",
      icon: "🔍", 
    },
    {
      title: "Disease Prevention",
      description: "Discover foods that can help prevent diseases based on your body's needs.",
      icon: "🛡️", 
    },
    {
      title: "Ingredient Substitutes",
      description: "Find alternatives for ingredients that suit your dietary restrictions.",
      icon: "🌱", 
    },
    {
      title: "Custom Recommendations",
      description: "Receive tailored recommendations based on your body study and preferences.",
      icon: "⭐", 
    },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
          How NutriScan Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-700 transition-transform duration-300 transform hover:scale-105"
            >
              <div className="text-4xl mb-4 text-orange-500 text-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunctionalityShowcase;
