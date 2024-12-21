import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid, Box, CircularProgress } from "@mui/material";

const SkinHealthComponent = () => {
  const [selectedSkinType, setSelectedSkinType] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const SPOONACULAR_API_KEY = "fcb96ae848b04fc2bab98b432ed7b287"; // Your Spoonacular API key
  const UNSPLASH_ACCESS_KEY = "9lR3w1H9gurziMXBUIp4aso9nBK12PlxrKdtEfIx960"; // Your Unsplash API key

  // Handle skin type change
  const handleSkinTypeChange = async (option) => {
    setSelectedSkinType(option);

    if (option) {
      setLoading(true);
      setError(null);

      try {
        // Example: Foods based on skin type
        const foodsForSkinType = {
          oily: ["Salmon", "Avocado", "Spinach"],
          dry: ["Coconut", "Sweet Potatoes", "Olive Oil"],
          sensitive: ["Blueberries", "Green Tea", "Walnuts"],
          aging: ["Carrots", "Tomatoes", "Almonds"],
          acne: ["Green Tea", "Lemon", "Turmeric"], // Added acne as new skin type
          combination: ["Cucumber", "Honey", "Chia Seeds"], // Added combination as new skin type
        };

        // Get foods for selected skin type
        const foods = foodsForSkinType[option.value];

        // Fetch food data from Spoonacular API
        const foodDataPromises = foods.map((food) =>
          axios.get(
            `https://api.spoonacular.com/food/ingredients/search?query=${food}&apiKey=${SPOONACULAR_API_KEY}`
          )
        );

        const foodDataResponses = await Promise.all(foodDataPromises);
        const foodDetails = await Promise.all(
          foodDataResponses.map(async (response, index) => {
            const food = response.data.results[0];
            const foodId = food.id;

            // Fetch detailed nutritional info
            const nutritionResponse = await axios.get(
              `https://api.spoonacular.com/food/ingredients/${foodId}/information?amount=100&apiKey=${SPOONACULAR_API_KEY}`
            );

            const nutrients = nutritionResponse.data.nutrition.nutrients;

            // Ensure nutrients are extracted correctly (map them)
            const mappedNutrients = nutrients.map((nutrient) => ({
              name: nutrient.title || nutrient.name, // Ensure we fetch the correct property
              amount: nutrient.amount,
              unit: nutrient.unit,
            }));

            return {
              name: food.name,
              image: food.image,
              skinBenefit: getSkinBenefit(option.value, food.name), // Personalized skin benefit for each food
              nutrients: mappedNutrients, // Pass the mapped nutrients
            };
          })
        );

        setRecommendations(foodDetails);
      } catch (err) {
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Get skin benefits based on skin type and specific food
  const getSkinBenefit = (skinType, foodName) => {
    const benefits = {
      oily: {
        Salmon: "Salmon helps regulate oil production and provides omega-3 fatty acids that reduce acne.",
        Avocado: "Avocado hydrates and nourishes oily skin with its rich vitamins.",
        Spinach: "Spinach helps reduce inflammation and keeps oil levels in check.",
      },
      dry: {
        Coconut: "Coconut helps hydrate the skin and prevents it from drying out.",
        "Sweet Potatoes": "Sweet potatoes are rich in beta-carotene, which keeps skin moisturized.",
        "Olive Oil": "Olive oil helps nourish dry skin and provides essential fatty acids.",
      },
      sensitive: {
        Blueberries: "Blueberries are antioxidants that calm and soothe irritated skin.",
        "Green Tea": "Green tea reduces redness and inflammation for sensitive skin.",
        Walnuts: "Walnuts provide anti-inflammatory properties that ease skin irritation.",
      },
      aging: {
        Carrots: "Carrots are rich in vitamin A and help boost collagen production.",
        Tomatoes: "Tomatoes help reduce wrinkles and fine lines by promoting collagen synthesis.",
        Almonds: "Almonds nourish skin and fight signs of aging with vitamin E and antioxidants.",
      },
      acne: {
        "Green Tea": "Green tea reduces inflammation and fights acne-causing bacteria.",
        Lemon: "Lemon helps cleanse the skin and detoxify acne-prone areas.",
        Turmeric: "Turmeric reduces acne and heals skin by reducing redness and inflammation.",
      },
      combination: {
        Cucumber: "Cucumber balances oil levels and keeps the skin hydrated.",
        Honey: "Honey hydrates the skin and provides anti-inflammatory properties.",
        "Chia Seeds": "Chia seeds provide essential nutrients that balance combination skin.",
      },
    };

    return benefits[skinType][foodName] || "This food provides various skin benefits!";
  };

  return (
    <div className="skin-health-container p-10 bg-gray-100">
      <Typography variant="h4" gutterBottom>
        Skin Health Recommendations
      </Typography>

      <div className="mb-4">
        <label htmlFor="skinType" className="block mb-2 font-semibold">
          Choose Your Skin Type:
        </label>
        <select
          id="skinType"
          value={selectedSkinType ? selectedSkinType.value : ""}
          onChange={(e) =>
            handleSkinTypeChange({
              value: e.target.value,
              label: e.target.options[e.target.selectedIndex].text,
            })
          }
          className="border p-2 w-full"
        >
          <option value="">Select your skin type...</option>
          {["oily", "dry", "sensitive", "aging", "acne", "combination"].map((skinType) => (
            <option key={skinType} value={skinType}>
              {skinType.charAt(0).toUpperCase() + skinType.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading && <CircularProgress />}

      {error && <div className="text-red-500">{error}</div>}

      {recommendations.length > 0 && (
        <Grid container spacing={4}>
          {recommendations.map((food, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {food.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Skin Benefit: {food.skinBenefit}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" paragraph>
                    <strong>Nutrients:</strong>
                  </Typography>
                  <Box sx={{ maxHeight: 150, overflowY: "auto" }}>
                    {food.nutrients.length > 0 ? (
                      food.nutrients.map((nutrient, idx) => (
                        <Typography key={idx} variant="body2" color="textSecondary">
                          {nutrient.name}: {nutrient.amount} {nutrient.unit}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No nutrient data available.
                      </Typography>
                    )}
                  </Box>

                  <Button
                    variant="outlined"
                    size="small"
                    href={`https://www.google.com/search?q=${food.name}+details`}
                    target="_blank"
                    sx={{ marginTop: 2 }}
                  >
                    Know More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default SkinHealthComponent;
