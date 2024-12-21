import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { chatSession } from '/src/components/gemini.js';
import { FaLeaf } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa'; // For warning icon

const DietPlanComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    skinType: '',
    dietaryPreferences: '',
  });
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState('');
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

  const handleGenerateDietPlan = async () => {
    if (tokens <= 0) {
      alert('You have used all your tokens! Try again later.');
      return;
    }

    setLoading(true);
    setDietPlan('');

    try {
      const { name, age, weight, height, skinType, dietaryPreferences } = formData;

      const prompt = `
        Create a unique 7-day diet plan for ${name || 'User'} based on the following:
        Age: ${age || 'Not provided'}
        Weight: ${weight || 'Not provided'} kg
        Height: ${height || 'Not provided'} ft
        Skin Type: ${skinType || 'Not specified'}
        Dietary Preferences: ${dietaryPreferences || 'None'}

        Ensure:
        - Each day's meals are different.
        - Include breakfast, lunch, dinner, and snacks.
        - Use specific food items and portion sizes.
        - Align meals with healthy and balanced nutritional goals.
        - Tailor meals to the user's preferences and avoid repetition.

        Start the plan with a greeting to ${name || 'User'}, and avoid using stars or bullet points in the output.
      `;

      const result = await chatSession.sendMessage(prompt);
      setDietPlan(result.response?.text || 'No diet plan generated.');
      setTokens((prevTokens) => prevTokens - 1); // Decrease token count
    } catch (error) {
      console.error('Error generating diet plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }} id="diet-plan-section">
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
                src="/nutrition_15578684.gif"
                alt="Loading..."
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '10%',
                }}
              />
            </div>
          )}

          <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', color: '#4CAF50' }}>
            Personalized Diet Plan Generator
          </Typography>

          {/* Token Display */}
          <div style={{ marginBottom: '20px' }}>
            <Typography
              variant="subtitle1"
              style={{
                color: '#ff5722',
                fontWeight: 'bold',
                display: 'inline-block',
                marginRight: '10px',
              }}
            >
              Tokens Remaining: 
            </Typography>
            <Tooltip title="You can generate up to 3 diet plans. Tokens will reset periodically." arrow>
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
                <span>You've used all your tokens. Please come back later.</span>
              </div>
            )}
          </div>

          <Card style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <CardContent>
              <form>
                <Grid container spacing={3}>
                  {[{ label: 'Name', name: 'name', type: 'text' },
                    { label: 'Age', name: 'age', type: 'number' },
                    { label: 'Weight (kg)', name: 'weight', type: 'number' },
                    { label: 'Height (ft)', name: 'height', type: 'number' },
                    { label: 'Skin Type', name: 'skinType', type: 'text', placeholder: 'e.g., Oily, Dry, Sensitive, Aging' },
                    { label: 'Dietary Preferences', name: 'dietaryPreferences', type: 'text', placeholder: 'e.g., Vegan, Gluten-Free' },
                  ].map((field, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <TextField
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder || ''}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                </Grid>
                <Button
                  variant="contained"
                  onClick={handleGenerateDietPlan}
                  disabled={loading || tokens <= 0}
                  style={{
                    backgroundColor: tokens > 0 ? '#4CAF50' : '#9E9E9E',
                    color: 'white',
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                  }}
                  fullWidth
                >
                  {tokens > 0 ? 'Generate Diet Plan' : 'No Tokens Left'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right side: Mockup Image */}
        <div style={{ flex: 1 }}>
          <img
            src="/cookbook_12817474.gif" // Replace with the actual path to your mockup image
            alt="Diet Plan Mockup"
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

      {dietPlan && (
        <div style={{ marginTop: '30px' }}>
          <Typography variant="h5" gutterBottom style={{ color: '#4CAF50', fontWeight: 'bold' }}>
            Here is your 7-Day Diet Plan, {formData.name || 'User'}!
          </Typography>
          <VerticalTimeline>
            {dietPlan.split(/Day \d+:/).slice(1).map((day, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#e8f5e9', color: '#333' }}
                contentArrowStyle={{ borderRight: '7px solid  #4CAF50' }}
                iconStyle={{ background: '#4CAF50', color: '#fff' }}
                icon={<FaLeaf />}
              >
                <h3 className="vertical-timeline-element-title" style={{ margin: 0 }}>
                  Day {index + 1}
                </h3>
                <p>{day.trim()}</p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      )}
    </div>
  );
};

export default DietPlanComponent;
