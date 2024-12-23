import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography, Grid, Tooltip } from '@mui/material';
import { FaCamera, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { chatSession } from '/src/components/gemini.js'; // Simulate API call

const FoodExpirationTrackerComponent = () => {
  const [file, setFile] = useState(null); // For uploaded image
  const [foodName, setFoodName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(3);

  // Load and save tokens
  useEffect(() => {
    const savedTokens = localStorage.getItem('tokens');
    setTokens(savedTokens ? parseInt(savedTokens, 10) : 3);
  }, []);

  useEffect(() => {
    localStorage.setItem('tokens', tokens);
  }, [tokens]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePredictExpiration = async () => {
    if (tokens <= 0) {
      alert('You have used all your tokens! Try again later.');
      return;
    }

    if (!file) {
      alert('Please upload an image of the food.');
      return;
    }

    setLoading(true);
    setPrediction('');

    try {
      // Simulated API call
      const result = await chatSession.sendMessage(`
        Analyze this food image and provide:
        - Freshness level
        - Predicted expiration date
        - Additional insights for ${foodName || 'Unknown Food'}.

        Purchase Date: ${purchaseDate || 'Not provided'}.
      `);

      setPrediction(result.response?.text || 'No prediction available.');
      setTokens((prevTokens) => prevTokens - 1);
    } catch (error) {
      console.error('Error predicting food expiration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }} id="expiration-tracker-section">
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
            src="/loading.gif"
            alt="Loading..."
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '10%',
            }}
          />
        </div>
      )}

      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', color: '#4CAF50' }}>
        AI-Powered Food Expiration Tracker
      </Typography>

      {/* Token Display */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" style={{ color: '#ff5722', fontWeight: 'bold' }}>
          Tokens Remaining:
        </Typography>
        <Tooltip title="Tokens reset periodically." arrow>
          <span
            style={{
              marginLeft: '10px',
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
      </div>

      <Card style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <CardContent>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Food Name"
                  placeholder="e.g., Milk, Bread"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Purchase Date"
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    margin: '10px 0',
                    padding: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    width: '100%',
                  }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={handlePredictExpiration}
              disabled={loading || tokens <= 0}
              fullWidth
              style={{
                marginTop: '20px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              {tokens > 0 ? 'Predict Expiration' : 'No Tokens Left'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Display Prediction */}
      {prediction && (
        <div style={{ marginTop: '30px' }}>
          <Typography variant="h5" style={{ color: '#4CAF50', fontWeight: 'bold' }}>
            Prediction for {foodName || 'Your Food'}:
          </Typography>
          <Typography variant="body1" style={{ marginTop: '10px', fontSize: '16px' }}>
            {prediction}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default FoodExpirationTrackerComponent;
