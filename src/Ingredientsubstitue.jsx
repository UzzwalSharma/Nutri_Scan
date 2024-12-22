import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Correct import (only once)
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Tooltip,
  Box,
} from '@mui/material';

import { chatSession } from '/src/components/gemini.js';
import { motion } from 'framer-motion'; // Import Framer Motion
import { FaExclamationTriangle, FaEye } from 'react-icons/fa'; 
const IngredientSubstituteComponent = () => {
  const [formData, setFormData] = useState({
    ingredient: '',
    dish: '',
  });
  const [loading, setLoading] = useState(false);
  const [substituteOptions, setSubstituteOptions] = useState('');
  const [tokens, setTokens] = useState(3); // Initialize tokens to 3

  // Load tokens from localStorage
  useEffect(() => {
    const savedTokens = localStorage.getItem('tokens');
    setTokens(savedTokens ? parseInt(savedTokens) : 3);
  }, []);

  // Save tokens to localStorage whenever tokens change
  useEffect(() => {
    localStorage.setItem('tokens', tokens);
  }, [tokens]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFindSubstitute = async () => {
    if (tokens <= 0) {
      toast.error('You have used all your tokens! Please try again later.');
      return;
    }

    setLoading(true);
    setSubstituteOptions('');

    try {
      const { ingredient, dish } = formData;

      const prompt = `
        Suggest some suitable substitutes for the ingredient "${ingredient}" in the dish "${dish}".
        Include both common and unique substitutes, and provide alternative ingredients for different dietary preferences (e.g., vegan, gluten-free).
        For each substitute, explain how it can be used in the context of the dish.
        Avoid repetition and provide a variety of substitutes.
      `;

      const result = await chatSession.sendMessage(prompt);
      setSubstituteOptions(result.response?.text || 'No substitutes found.');
      setTokens((prevTokens) => prevTokens - 1); // Decrease token count

      toast.success('Substitutes found successfully!');
    } catch (error) {
      console.error('Error finding substitutes:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle "View Plans" button click
//   const handleViewPlans = () => {
//     // For now, we are redirecting to a placeholder /pricing page
//     window.location.href = '/pricing'; // Or replace with the appropriate route to view pricing plans
//   };

  return (
    <div style={{ padding: '30px', textAlign: 'center', backgroundColor: '#ffffff' }} id="ingredient-substitute-section">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side: Form */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          {loading && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src="/cereal_15240274.gif" // Replace with your actual loading image
                alt="Loading..."
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '10%',
                }}
              />
            </div>
          )}

          <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', color: '#388E3C' }}>
            Ingredient Substitute Finder
          </Typography>

          {/* Token Display with View Plans Button */}
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              style={{
                color: '#388E3C',
                fontWeight: 'bold',
                display: 'inline-block',
                marginRight: '10px',
              }}
            >
              Tokens Remaining:
            </Typography>
            <Tooltip title="You can use the service up to 3 times. Tokens reset periodically." arrow>
              <span
                style={{
                  backgroundColor: tokens <= 0 ? '#FFEBEE' : '#C8E6C9',
                  color: tokens <= 0 ? '#D32F2F' : '#388E3C',
                  padding: '10px 20px',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                }}
              >
                {tokens}
              </span>
            </Tooltip>
            {tokens === 1 && (
              <div
                style={{
                  marginTop: '10px',
                  color: '#D32F2F',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                <FaExclamationTriangle style={{ marginRight: '8px' }} />
                <span>You have only 1 token left!</span>
              </div>
            )}
            {tokens <= 0 && (
              <div
                style={{
                  marginTop: '10px',
                  color: '#D32F2F',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                <FaExclamationTriangle style={{ marginRight: '8px' }} />
                <span>You've used all your tokens. Please try again later.</span>
              </div>
            )}

            {/* Small "View Plans" button next to token count */}
            <Button
  variant="outlined"
  component={Link} // Makes the button behave as a link
  to="/pricing" // The route to navigate to
  style={{
    marginLeft: '20px',
    padding: '10px 15px',
    borderRadius: '25px',
    borderColor: '#388E3C',
    color: '#388E3C',
    fontWeight: 'bold',
  }}
  startIcon={<FaEye />}
>
  View Plan
</Button>
          </div>

          <Card style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <CardContent>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Missing Ingredient"
                      name="ingredient"
                      type="text"
                      value={formData.ingredient}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Dish You're Cooking"
                      name="dish"
                      type="text"
                      value={formData.dish}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  onClick={handleFindSubstitute}
                  disabled={loading || tokens <= 0}
                  style={{
                    backgroundColor: tokens > 0 ? '#388E3C' : '#9E9E9E',
                    color: 'white',
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                  }}
                  fullWidth
                >
                  {tokens > 0 ? 'Find Substitute' : 'No Tokens Left'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right side: Image */}
        <div style={{ flex: 1 }}>
          <img
            src="/finder.jpg" // Replace with your actual image
            alt="Substitute Finder"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '500px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        </div>
      </div>

      {substituteOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '30px' }}
        >
          <Typography variant="h5" gutterBottom style={{ color: '#388E3C', fontWeight: 'bold' }}>
            Here are some substitutes for "{formData.ingredient}" in your "{formData.dish}":
          </Typography>

          {/* Display the AI-generated substitutes */}
          <Box style={{ textAlign: 'left', marginTop: '20px' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', color: '#388E3C' }}>
              Common Substitutes:
            </Typography>
            <ul>
              {substituteOptions
                .split('\n')
                .map((line, index) => (
                  <li key={index}>
                    <span style={{ color: '#388E3C' }}>{line.trim()}</span>
                  </li>
                ))}
            </ul>
          </Box>
        </motion.div>
      )}
    </div>
  );
};

export default IngredientSubstituteComponent;
