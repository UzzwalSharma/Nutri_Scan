import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";



// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NutriScan = () => {
  const [food, setFood] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "525463f6aa0542418df4afc76133543a"; // Replace with your actual API key

  // Handle food search
  const handleSearch = async () => {
    if (!food) return;

    setLoading(true);
    setError(null);

   

    try {
      // Making the API request to search for food
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?query=${food}&apiKey=${API_KEY}`
      );
      const foodData = response.data;

      if (foodData.results && foodData.results.length > 0) {
        // Get the first food item
        const foodItem = foodData.results[0];

        // Fetch detailed nutrition info
        const nutritionResponse = await axios.get(
          `https://api.spoonacular.com/food/ingredients/${foodItem.id}/information?amount=100&apiKey=${API_KEY}`
        );
        setNutrition(nutritionResponse.data);
    
      } else {
        setError("This food doesnt exist in our db");
       
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
     
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: ["Calories", "Carbs", "Protein", "Fat", "Sugar"],
    datasets: [
      {
        label: "Nutritional Information (per 100g)",
        data: nutrition
          ? [
              nutrition.nutrition.nutrients[0].amount,
              nutrition.nutrition.nutrients[1].amount,
              nutrition.nutrition.nutrients[2].amount,
              nutrition.nutrition.nutrients[3].amount,
              nutrition.nutrition.nutrients[5].amount,
            ]
          : [],
        backgroundColor: nutrition
          ? [
              "rgba(255, 99, 132, 0.6)", // Red for Calories
              "rgba(54, 162, 235, 0.6)", // Blue for Carbs
              "rgba(255, 206, 86, 0.6)", // Yellow for Protein
              "rgba(75, 192, 192, 0.6)", // Green for Fat
              "rgba(153, 102, 255, 0.6)", // Purple for Sugar
            ]
          : [],
        borderColor: nutrition
          ? [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ]
          : [],
        borderWidth: 2,
        borderRadius: 10, // Rounded corners for bars
        hoverBackgroundColor: nutrition
          ? [
              "rgba(255, 99, 132, 0.8)", // Red for hover on Calories
              "rgba(54, 162, 235, 0.8)", // Blue for hover on Carbs
              "rgba(255, 206, 86, 0.8)", // Yellow for hover on Protein
              "rgba(75, 192, 192, 0.8)", // Green for hover on Fat
              "rgba(153, 102, 255, 0.8)", // Purple for hover on Sugar
            ]
          : [],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Nutritional Breakdown (per 100g)",
        font: {
          size: 20,
          weight: 'bold',
        },
        padding: {
          top: 20,
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} ${tooltipItem.label === "Calories" ? "kcal" : "g"}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Nutrients",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="nutriscan-container p-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">NutriScan: Get Nutritional Insights</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter food item..."
          value={food}
          onChange={(e) => setFood(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white py-2 px-4 rounded mt-2"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <span>Loading...</span>
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}

      {nutrition && (
        <div className="nutrition-info mt-4 p-4 bg-white shadow-lg">
          <h3 className="text-xl font-semibold">{nutrition.name}</h3>
          <div className="mt-2">
            <p><strong>Calories:</strong> {nutrition.nutrition.nutrients[0].amount} kcal</p>
            <p><strong>Carbs:</strong> {nutrition.nutrition.nutrients[1].amount} g</p>
            <p><strong>Protein:</strong> {nutrition.nutrition.nutrients[2].amount} g</p>
            <p><strong>Fat:</strong> {nutrition.nutrition.nutrients[3].amount} g</p>
            <p><strong>Sugar:</strong> {nutrition.nutrition.nutrients[5].amount} g</p>
          </div>

          {/* Chart displaying the nutritional data */}
          <div className="mt-4">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      )}

    
    </div>
  );
};

export default NutriScan;
