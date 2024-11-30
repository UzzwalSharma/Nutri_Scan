import React, { useEffect, useState, useRef } from 'react';
import "/src/components/hero2.css";

function Hero2() {
  const [visibleCards, setVisibleCards] = useState([false, false, false, false]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.85
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setVisibleCards((prev) => {
            const newVisibleCards = [...prev];
            newVisibleCards[index] = true;
            return newVisibleCards;
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-400 via-green-500 to-blue-500 text-white py-16">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-8">
        Achieve Your Health Goals with NutriScan
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center max-w-7xl mx-auto px-4">
        {/* Card 1: Real-time Food Scanning */}
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          data-index={0}
          className={`card bg-white text-black rounded-lg shadow-lg overflow-hidden mx-4 my-4 transform transition-transform duration-300 ${visibleCards[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${visibleCards[0] ? 'animate-fade-in-left' : ''}`}
        >
          <img
            src="/public/pexels-readymade-3850219.jpg" // Replace with relevant image
            alt="Scan Your Food"
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Scan to Get Nutritional Insights</h2>
            <p className="text-gray-600">
              Snap a photo or upload your food and get an instant nutritional breakdown!
            </p>
          </div>
        </div>

        {/* Card 2: Health Score */}
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          data-index={1}
          className={`card bg-white text-black rounded-lg shadow-lg overflow-hidden mx-4 my-4 transform transition-transform duration-300 ${visibleCards[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${visibleCards[1] ? 'animate-fade-in-right' : ''}`}
        >
          <img
            src="/public/pexels-rdne-7947960.jpg" // Replace with relevant image
            alt="Know Your Health Score"
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Know Your Health Score</h2>
            <p className="text-gray-600">
              Track your progress with your personal health score and improve your diet.
            </p>
          </div>
        </div>

        {/* Card 3: Get Personalized Diet Plans */}
        <div
          ref={(el) => (cardRefs.current[2] = el)}
          data-index={2}
          className={`card bg-white text-black rounded-lg shadow-lg overflow-hidden mx-4 my-4 transform transition-transform duration-300 ${visibleCards[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${visibleCards[2] ? 'animate-fade-in-left' : ''}`}
        >
          <img
            src="/public/pexels-alesiakozik-8155159.jpg" // Replace with relevant image
            alt="Get Personalized Diet Plan"
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Get Personalized Diet Plans</h2>
            <p className="text-gray-600">
              Based on your preferences, receive weekly meal plans tailored just for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
