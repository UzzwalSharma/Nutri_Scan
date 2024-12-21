import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { FaUsers, FaLeaf, FaPhoneAlt } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <Container maxWidth="lg" style={{ padding: '50px 20px' }}>
      {/* Header Section */}
      <Box textAlign="center" marginBottom={5}>
        <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold', color: '#4CAF50' }}>
          About NutriScan
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Your Personalized Diet Plan Generator for a Healthier You
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box textAlign="center" marginBottom={5}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#4CAF50' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          At NutriScan, our mission is to help you achieve your health and wellness goals through
          personalized, easy-to-follow diet plans. Whether you're looking to lose weight, gain muscle,
          or improve overall health, we provide a simple solution tailored to your unique preferences
          and lifestyle.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          With our smart algorithm and daily meal recommendations, NutriScan takes the guesswork out
          of meal planning. All you need to do is input your details, and we'll generate a diet plan
          that aligns with your goals.
        </Typography>
      </Box>

      {/* Team Section */}
      <Grid container spacing={4} justifyContent="center" marginBottom={5}>
        <Grid item xs={12} md={4} textAlign="center">
          <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f0f4c3' }}>
            <FaUsers size={50} color="#388E3C" />
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              The Team
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Our team consists of passionate nutritionists, dieticians, and engineers who are
              dedicated to making personalized nutrition accessible to everyone. Together, we strive
              to improve your eating habits and make healthier choices easier to adopt.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} textAlign="center">
          <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f0f4c3' }}>
            <FaLeaf size={50} color="#388E3C" />
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Healthy Living
            </Typography>
            <Typography variant="body2" color="textSecondary">
              We believe that healthy eating should be simple, enjoyable, and sustainable. With
              NutriScan, you'll discover a variety of delicious, nutritious meals that cater to your
              tastes and dietary needs.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Mockup Section */}
      <Box textAlign="center" marginBottom={5}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#4CAF50' }}>
          How It Works
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          NutriScan generates your personalized diet plan based on your age, weight, height, skin
          type, and dietary preferences. Here's a glimpse of how it works:
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <img
              src="/{00F33A05-E692-45D0-9675-C42FCB638B65}.png" // Replace with actual mockup image
              alt="Mockup 1"
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="/Screenshot 2024-11-21 235807.png" // Replace with actual mockup image
              alt="Mockup 2"
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box textAlign="center" marginTop={5} marginBottom={5}>
        <Typography variant="h5" style={{ fontWeight: 'bold', color: '#4CAF50' }}>
          Start Your Healthy Journey Today!
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Ready to get started? Sign up today and generate your first personalized diet plan.
        </Typography>
        <Button variant="contained" color="primary" href="/signup">
          Get Started
        </Button>
      </Box>

      {/* Footer Section */}
      <Box textAlign="center" padding={3} style={{ backgroundColor: '#f4f6f8' }}>
        <Typography variant="body2" color="textSecondary">
          <FaPhoneAlt style={{ marginRight: '5px' }} /> Contact us: support@nutriscan.com
        </Typography>
        <Typography variant="body2" color="textSecondary">
          © 2024 NutriScan. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
