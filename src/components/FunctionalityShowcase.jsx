"use client";

import React from "react";
import { motion } from "framer-motion";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "John Doe",
      title: "Health Transformation",
      review: "NutriScan helped me identify the foods that were contributing to my health issues. After following their personalized meal plan, I feel more energetic and healthier!",
      image: "https://www.w3schools.com/w3images/avatar6.png",
      rating: 5,
    },
    {
      name: "Sarah Lee",
      title: "Amazing Diet Plans",
      review: "I’ve tried many apps, but NutriScan's personalized recommendations are a game-changer. It’s easy to track my calories and follow a tailored plan.",
      image: "https://www.w3schools.com/w3images/avatar2.png",
      rating: 4,
    },
    {
      name: "Mike Smith",
      title: "Great Insights!",
      review: "I love how NutriScan provides insights into how food affects my body. It’s like having a personal nutritionist guiding me through my diet journey.",
      image: "https://www.w3schools.com/w3images/avatar5.png",
      rating: 5,
    },
    {
      name: "Anna Williams",
      title: "Helpful and Informative",
      review: "The ingredient substitute feature helped me a lot when I was looking for gluten-free alternatives. NutriScan is a must-have for anyone conscious about their health.",
      image: "https://www.w3schools.com/w3images/avatar1.png", 
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center text-orange-500 mb-8">
          What Our Users Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
              className="relative p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {/* Review Content */}
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{review.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{review.title}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "{review.review}"
              </p>
              <div className="flex">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
