import React from 'react';
import { Button, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion'; // For adding animations
import { FaStar } from 'react-icons/fa'; // Star icon for best value

const PricingComponent = () => {
  const pricingPlans = [
    {
      name: 'Basic Plan',
      price: '₹99', // INR
      tokens: 10,
      description: 'Get 10 tokens for basic usage. Perfect for casual users.',
      duration: 'per month',
      features: [
        'Access to 3 ingredient substitution queries',
        'Basic substitutes with general suggestions',
        'Limited customer support',
      ],
      recommended: false,
      imageUrl: '/20346342_v1058-20.jpg', // Mockup image for Basic Plan
    },
    {
      name: 'Standard Plan',
      price: '₹199', // INR
      tokens: 20,
      description: 'Get 20 tokens for more usage. Ideal for regular users.',
      duration: 'per month',
      features: [
        'Access to 20 ingredient substitution queries',
        'Detailed substitutes with dietary options',
        'Priority customer support',
      ],
      recommended: false,
      imageUrl: "/three-dimensional-lit-tree.jpg", 
    },
    {
      name: 'Premium Plan',
      price: '₹499', // INR
      tokens: 50,
      description: 'Get 50 tokens for frequent usage. Best for heavy users.',
      duration: 'per month',
      features: [
        'Unlimited ingredient substitution queries',
        'Personalized substitutes based on preferences',
        '24/7 customer support with dedicated account manager',
      ],
      recommended: true,
      imageUrl: '/6188881.jpg', // Mockup image for Premium Plan
    },
  ];

  return (
    <div style={{ padding: '30px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#388E3C', fontWeight: 'bold' }}>
        Choose Your Plan
      </Typography>
      <Typography variant="h6" paragraph style={{ color: '#616161', maxWidth: '600px', margin: '0 auto' }}>
        Select a plan that best fits your needs. Get tokens for ingredient substitute queries and more!
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {pricingPlans.map((plan) => (
          <Grid item xs={12} sm={4} key={plan.name}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                style={{
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#ffffff',
                }}
              >
                <CardContent>
                  <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                      src={plan.imageUrl}
                      alt={plan.name}
                      style={{
                        width: '80%',
                        maxWidth: '200px',
                        height: 'auto',
                        marginBottom: '15px',
                      }}
                    />
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#388E3C' }}>
                      {plan.name}
                    </Typography>
                    <Typography variant="h6" style={{ color: '#616161', margin: '10px 0' }}>
                      {plan.price} - {plan.tokens} Tokens <span style={{ color: '#757575' }}>({plan.duration})</span>
                    </Typography>
                    <Typography variant="body2" paragraph style={{ color: '#757575' }}>
                      {plan.description}
                    </Typography>

                    {/* Features List */}
                    <Box style={{ textAlign: 'left', marginTop: '20px', paddingLeft: '20px' }}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#388E3C' }}>
                        Features:
                      </Typography>
                      <ul>
                        {plan.features.map((feature, index) => (
                          <li key={index} style={{ color: '#757575' }}>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Box>

                    {/* Star Icon for recommended plan */}
                    {plan.recommended && (
                      <Typography
                        variant="subtitle1"
                        style={{
                          color: '#FFB300',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <FaStar style={{ marginRight: '8px' }} />
                        Recommended Plan
                      </Typography>
                    )}

                    <Button
                      variant="contained"
                      color={plan.recommended ? 'primary' : 'default'}
                      style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: plan.recommended ? '#388E3C' : '#757575',
                        color: 'white',
                      }}
                    >
                      Buy Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PricingComponent;
