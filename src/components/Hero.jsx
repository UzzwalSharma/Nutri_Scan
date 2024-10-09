import React, { useEffect } from 'react';
import { useDarkMode } from './DarkModeContext'; // Import useDarkMode from context
import { Link } from 'react-router-dom';

function Hero() {
  const { isDarkMode } = useDarkMode(); // Access isDarkMode from the context

  // Set the body background color based on isDarkMode
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#2D3748' : 'white'; // Change to your desired light background color
  }, [isDarkMode]);

  return (
    <section
      className={`min-h-screen flex flex-col lg:flex-row justify-center items-center text-center lg:text-left p-6 home ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-black'
      }`}
    >
      {/* Text Section */}
      <div className="lg:w-1/2">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
          Welcome to <span className="text-yellow-300">NutriScan</span>
        </h1>
        <p className="text-lg lg:text-xl text-white mb-8 max-w-2xl mx-auto lg:mx-0">
          Scan your food to get detailed information about its nutritional value, calories, and health benefits. Stay healthy with personalized diet plans!
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center lg:justify-start">
          {/* "Get Started" Button */}
          <Link to="/nutriscan">
            <button className="bg-yellow-300 text-indigo-600 px-8 py-4 font-semibold rounded-full shadow-md hover:bg-yellow-400 transition duration-300 transform hover:scale-105">
              Get Started
            </button>
          </Link>

          {/* "Find Healthy Alternatives" Button */}
          <Link to="/scanner">
            <button className="bg-yellow-300 text-indigo-600 px-8 py-4 font-semibold rounded-full shadow-md hover:bg-yellow-400 transition duration-300 transform hover:scale-105">
              Find Healthy Alternatives
            </button>
          </Link>
        </div>

        {/* Paragraph for "Find Healthy Alternatives" */}
        <div className="mt-6">
          <p className="text-lg lg:text-xl text-white max-w-2xl mx-auto lg:mx-0">
            Looking for a healthier choice? Use our "Find Healthy Alternatives" feature to discover better options based on your scanned meals. Stay on track with your health goals!
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
        <img
          src="https://i.ibb.co/QmH9VxB/pexels-plann-2999237-4565778.jpg" // Adjust the path if needed
          alt="Healthy Food"
          className="w-80 lg:w-96 h-auto rounded-lg shadow-2xl transform transition duration-300 hover:scale-105"
        />
      </div>
    </section>
  );
}

export default Hero;
