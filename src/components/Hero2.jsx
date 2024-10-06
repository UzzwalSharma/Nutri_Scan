"use client";

import React, { useEffect, useState, useRef } from 'react';
import "/src/components/hero2.css";

function Hero2() {
  const [visibleCards, setVisibleCards] = useState([false, false, false]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null, // use the viewport as the root
      rootMargin: '0px',
      threshold: 0.85 // trigger when 10% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setVisibleCards((prev) => {
            const newVisibleCards = [...prev];
            newVisibleCards[index] = true; // Show the card
            return newVisibleCards;
          });
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    // Cleanup on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-16">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-8">
        Hit Your Healthy Goals in Three Steps
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center max-w-7xl mx-auto px-4">
        {/* Card 1 */}
        <div
          ref={(el) => (cardRefs.current[0] = el)} // Reference for Intersection Observer
          data-index={0}
          className={`card bg-white text-black rounded-lg shadow-lg overflow-hidden mx-4 my-4 transform transition-transform duration-300 ${visibleCards[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${visibleCards[0] ? 'animate-fade-in-left' : ''}`}
        >
          <img
            src="https://www.myfitnesspal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flearn-what-works-small.95dadf73.png&w=640&q=75"
            alt="Track Food"
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Track Food Intake</h2>
            <p className="text-gray-600">
              Keep an accurate record of your meals and snacks to maintain your nutrition goals.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          ref={(el) => (cardRefs.current[1] = el)} // Reference for Intersection Observer
          data-index={1}
          className={`card bg-white text-black rounded-lg shadow-lg overflow-hidden mx-4 my-4 transform transition-transform duration-300 ${visibleCards[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${visibleCards[1] ? 'animate-fade-in-right' : ''}`}
        >
          <img
            src="https://www.myfitnesspal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftrack-food-small.ee639f5f.png&w=640&q=75"
            alt="Monitor Progress"
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Monitor Your Progress</h2>
            <p className="text-gray-600">
              Track your weight and other metrics to visualize your journey and celebrate your successes.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          ref={(el) => (cardRefs.current[2] = el)} // Reference for Intersection Observer
          data-index={2}
          className={`card bg-white text-black rounded-lg shadow-lg overflow-hidden mx-4 my-4 transform transition-transform duration-300 ${visibleCards[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${visibleCards[2] ? 'animate-fade-in-left' : ''}`}
        >
          <img
            src="https://www.myfitnesspal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fchange-your-habits-small.2adda768.png&w=640&q=75"
            alt="Get Support"
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Get Support and Motivation</h2>
            <p className="text-gray-600">
              Join a community of like-minded individuals and share your experiences for motivation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
