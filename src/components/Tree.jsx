import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const CircularChart = () => {
  const users = [
    "Simran",
    "Ujjwal",
    "Teevrata",
    "Subhash Raja",
    "Vanshika",
    "Ishika",
    "Sakshi",
    "Udit",
    "Divyanshi",
    "Krupa",
    "Arjun",
    "Priyanshi",
  ];

  const data = {
    labels: users,
    datasets: [
      {
        label: "User Engagement",
        data: users.map(() => Math.floor(Math.random() * 100) + 10),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
          "#E7E9EG",
          "#71B37C",
          "#FF5A5E",
          "#FFC870",
          "#B37D4E",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw} points`,
        },
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto my-12">
      <h2 className="text-4xl font-bold text-center mb-4">
       Our Current User Engagement Chart
      </h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CircularChart;
