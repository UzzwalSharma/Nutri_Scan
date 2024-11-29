import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Clarifai API credentials
const CLARIFAI_API_KEY = '4a695e6bdf5f4db0a82d3af1cdf49554';

app.post("/api/clarifai", async (req, res) => {
  try {
    const { inputs } = req.body;
    const response = await axios.post(
      "https://api.clarifai.com/v2/models/food-image-recognition/outputs",
      { inputs },
      {
        headers: {
          Authorization: `Bearer ${CLARIFAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
