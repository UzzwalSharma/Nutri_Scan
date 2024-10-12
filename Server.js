const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Nutritionix API credentials (replace with your credentials)
const NUTRITIONIX_APP_ID = 'your-app-id';
const NUTRITIONIX_API_KEY = 'your-api-key';

// API endpoint to get food information from Nutritionix
app.get('/api/food/:foodName', async (req, res) => {
    const foodName = req.params.foodName;

    const url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

    try {
        const response = await axios.post(
            url,
            {
                "query": foodName,
                "timezone": "US/Eastern"
            },
            {
                headers: {
                    "x-app-id": NUTRITIONIX_APP_ID,
                    "x-app-key": NUTRITIONIX_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        // Return the nutrition data
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Nutritionix:', error);
        res.status(500).json({ error: 'Error fetching food data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
