import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "./DarkModeContext"; // Import useDarkMode from context
import { Link } from "react-router-dom";

function Hero() {
  const { isDarkMode } = useDarkMode(); // Access isDarkMode from the context

  // Set the body background color based on isDarkMode
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode
      ? "#2D3748"
      : "white"; // Change to your desired light background color
  }, [isDarkMode]);

  return (
    <motion.section
      className={`relative min-h-screen flex flex-col justify-center items-center text-center p-6 ${
        isDarkMode ? "bg-gray-800 text-white" : "text-black"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="public/10235156-hd_1616_1080_15fps.mp4" // Replace with your video link
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay for better readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>

      {/* Content Section */}
      <div className="relative z-20 text-white max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Welcome to <span className="text-white">NutriScan</span>
        </motion.h1>
        <motion.p
          className="text-lg lg:text-xl text-white mb-8 leading-relaxed"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          Unlock the power of nutrition with <strong>NutriScan</strong>. 
          Scan your meals, discover their nutritional value, and explore
          personalized diet plans tailored to your health goals. Your journey
          to a healthier lifestyle begins here!
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/nutriscan">
            <motion.button
              className="bg-yellow-400 text-indigo-800 px-12 py-4 font-bold text-lg rounded-full shadow-lg hover:shadow-2xl hover:bg-yellow-500 hover:text-indigo-900 transform transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
    
  );
}

export default Hero;
