// Use import instead of require
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

// Initialize express app
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Create server with http for Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',  // Allow all origins for simplicity; restrict this in production
    methods: ['GET', 'POST']
  }
});

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
        query: foodName,
        timezone: 'US/Eastern'
      },
      {
        headers: {
          'x-app-id': NUTRITIONIX_APP_ID,
          'x-app-key': NUTRITIONIX_API_KEY,
          'Content-Type': 'application/json'
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

// Handle socket.io connections for chat support
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for new chat messages
  socket.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all clients
    io.emit('message', message);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
