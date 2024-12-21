// src/components/ComingSoon.js
import React from 'react';
import { motion } from 'framer-motion'; // Importing Framer Motion
import { FaRocket, FaClock } from 'react-icons/fa'; // Importing icons from react-icons for a cool touch

const ComingSoon = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          textAlign: 'center',
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
        }}
      >
        {/* Title with animation */}
        <motion.h1
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          style={{ fontSize: '2.5rem', color: '#333', marginBottom: '20px' }}
        >
          🚀 More Features Coming Soon!
        </motion.h1>

        {/* Fun Description with animation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '30px',
            lineHeight: '1.5',
          }}
        >
          We're working hard to bring you new, exciting features to enhance your experience. Stay tuned for
          updates. In the meantime, explore what we already have to offer!
        </motion.p>

        {/* Icon and Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Rocket Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          >
            <FaRocket size={40} color="#4CAF50" />
          </motion.div>

          {/* Clock Icon */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          >
            <FaClock size={40} color="#FF5722" />
          </motion.div>
        </motion.div>

        {/* Button to navigate back or to another section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{ marginTop: '30px' }}
        >
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: 'white',
              backgroundColor: '#4CAF50',
              padding: '12px 30px',
              borderRadius: '5px',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            Stay Tuned 🔔
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
