import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./CTAButton.css"; // Add your custom styles here

const CTAButton = () => {
  return (
    <motion.div
      className="cta-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/chat">
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
         
          Find Nearby Restaurants
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default CTAButton;
