import React, { useState } from 'react';
import ImageUpload from '/src/components/ImageUpload';
import { Bar } from 'react-chartjs-2';
import { foodDetails } from '/fooddata';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaLeaf, FaHeartbeat, FaUtensils, FaGlobe } from 'react-icons/fa'; // Icons for visual clarity

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const NutriScan = () => {
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const recognizeFood = async (imageBase64) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foodKeys = Object.keys(foodDetails);
        const randomFood = foodKeys[Math.floor(Math.random() * foodKeys.length)];
        resolve(randomFood);
      }, 1500);
    });
  };

  const handleImageUpload = async (imageBase64) => {
    setLoading(true);
    const recognizedFood = await recognizeFood(imageBase64);
    setFoodItem(recognizedFood);
    setLoading(false);
  };

  const getChartData = () => {
    return {
      labels: ['Proteins', 'Fats', 'Carbs', 'Fiber', 'Sugar'],
      datasets: [
        {
          label: 'Nutritional Breakdown (g)',
          data: [
            foodDetails[foodItem]?.proteins,
            foodDetails[foodItem]?.fats,
            foodDetails[foodItem]?.carbs,
            foodDetails[foodItem]?.fiber,
            foodDetails[foodItem]?.sugar,
          ],
          backgroundColor: ['#1D3557', '#457B9D', '#A8DADC', '#F4A261', '#E63946'],
          borderRadius: 8,
        },
      ],
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-blue-100 p-6">
      <h1 className="text-5xl font-extrabold mb-10 text-gray-900 tracking-tight">
        NutriScan <span className="text-blue-500"> - Scan Your Food</span>
      </h1>

      <ImageUpload onImageUpload={handleImageUpload} />

      {loading && (
        <div className="flex flex-col items-center mt-8 space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="text-lg font-medium text-gray-700">Analyzing the food...</p>
        </div>
      )}

      {foodItem && (
        <div className="mt-12 w-full max-w-5xl p-8 bg-white rounded-lg shadow-2xl transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Recognized Food: {foodItem}</h2>

          {/* Nutritional Breakdown Chart */}
          <div className="mb-8">
            <Bar
              data={getChartData()}
              options={{
                plugins: {
                  legend: { display: true, position: 'top' },
                  tooltip: { enabled: true },
                },
                scales: {
                  y: { beginAtZero: true, grid: { color: '#e5e7eb' } },
                  x: { grid: { color: '#e5e7eb' } },
                },
              }}
              height={200}
            />
          </div>

          {/* Food Details in a Horizontal Layout */}
          <div className="flex flex-wrap justify-between space-x-4">
            {/* Nutrition Card */}
            <div className="flex-1 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-md shadow-md flex items-center">
              <FaUtensils className="text-4xl text-blue-500 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">Nutrition Facts</h3>
                <p className="text-gray-700"><strong>Calories:</strong> {foodDetails[foodItem].calories} kcal</p>
                <p className="text-gray-700"><strong>Vitamins:</strong> {foodDetails[foodItem].vitamins}</p>
              </div>
            </div>

            {/* Health Card */}
            <div className="flex-1 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-md shadow-md flex items-center">
              <FaHeartbeat className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">Health Benefits</h3>
                <p className="text-gray-700"><strong>Health Benefits:</strong> {foodDetails[foodItem].healthBenefits}</p>
                <p className="text-gray-700"><strong>Diseases Cured:</strong> {foodDetails[foodItem].diseasesCured}</p>
              </div>
            </div>

            {/* Diet Card */}
            <div className="flex-1 bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-md shadow-md flex items-center">
              <FaLeaf className="text-4xl text-yellow-500 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">Diet & Warnings</h3>
                <p className="text-gray-700"><strong>Diet Suitability:</strong> {foodDetails[foodItem].dietSuitability}</p>
                <p className="text-gray-700"><strong>Warnings:</strong> {foodDetails[foodItem].healthWarnings}</p>
              </div>
            </div>

            {/* Environment Card */}
            <div className="flex-1 bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-md shadow-md flex items-center">
              <FaGlobe className="text-4xl text-red-500 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">Environment & Cooking</h3>
                <p className="text-gray-700"><strong>Impact:</strong> {foodDetails[foodItem].environmentalImpact}</p>
                <p className="text-gray-700"><strong>Seasonality:</strong> {foodDetails[foodItem].seasonality}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutriScan;
