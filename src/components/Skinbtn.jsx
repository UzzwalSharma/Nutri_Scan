// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importing Framer Motion

const HomePage = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "50px" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ maxWidth: "600px", textAlign: "center" }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>Hi! I am Your dermatologist</h1>
        <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "40px" }}>
          Find the best foods for your skin based on your skin type and get personalized recommendations.
        </p>
        
        {/* Button with animation */}
        <Link to="/skin">
          <motion.button
            style={{
              padding: "15px 25px",
              fontSize: "18px",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
            whileHover={{ scale: 1.1, backgroundColor: "#45a049" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Skin Health Recommendations
          </motion.button>
        </Link>
      </motion.div>

      {/* Side Image or GIF */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 50 }}
        style={{
          marginLeft: "50px",
          width: "300px",
          height: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/nursing-technician_16272911.gif" // Replace with a relevant image or GIF
          alt="Healthy Skin"
          style={{ borderRadius: "10px", width: "100%", height: "auto" }}
        />
      </motion.div>
    </div>
  );
};

export default HomePage;
