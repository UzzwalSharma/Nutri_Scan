import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion";
import "./MealScanner.css";

const Healthier = () => {
    const [mealName, setMealName] = useState("");
    const [healthierMeals, setHealthierMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showComponent, setShowComponent] = useState(true); // State to toggle visibility

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        const API_KEY = "724009c2784e4d0d8efb019dfa7070d4"; // Replace with your Spoonacular API key

        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch`,
                {
                    params: {
                        query: mealName,
                        number: 8,
                        apiKey: API_KEY,
                        addRecipeInformation: true,
                    },
                }
            );

            const mealResults = response.data.results.map((meal) => ({
                title: meal.title,
                image: meal.image,
                recipeUrl: meal.sourceUrl,
            }));

            setHealthierMeals(mealResults);
        } catch (error) {
            console.error("Error fetching healthier meals:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowComponent(false); // Hide component
    };

    const handleReopen = () => {
        setShowComponent(true); // Reopen component
    };

    return (
        <>
            {!showComponent && (
                <button
                    onClick={handleReopen}
                    className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg
                    reopen"
                >
                    Reopen Healthier Options
                </button>
            )}

            {showComponent && (
                <motion.div
                    className="scanner-container relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Close
                    </button>

                    <motion.h1
                        className="text-3xl font-bold text-gray-800"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Find Healthier Meal Options
                    </motion.h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Enter your meal name to discover healthier alternatives.
                    </p>

                    <form onSubmit={handleSearch} className="meal-search-form">
                        <input
                            type="text"
                            placeholder="Enter Meal Name"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                            required
                            className="border rounded-md p-3 w-full md:w-1/2"
                        />
                        <motion.button
                            type="submit"
                            className="mt-4 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-lg hover:from-green-500 hover:to-blue-600"
                            whileHover={{ scale: 1.1 }}
                        >
                            Find Healthier Options
                        </motion.button>
                    </form>

                    {loading && (
                        <div className="fullscreen-spinner">
                            <ClipLoader color="#4CAF50" loading={loading} size={100} />
                            <p className="text-gray-700 mt-4">Fetching Healthier Options...</p>
                        </div>
                    )}

                    {!loading && healthierMeals.length > 0 && (
                        <motion.div
                            className="meal-results mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                Healthier Meal Options:
                            </h3>
                            <div className="meal-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {healthierMeals.map((meal, index) => (
                                    <motion.div
                                        key={index}
                                        className="meal-item bg-white shadow-lg rounded-lg p-4 text-center transform transition duration-300 hover:scale-105"
                                        whileHover={{ scale: 1.05 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {meal.title}
                                        </h4>
                                        <img
                                            src={meal.image}
                                            alt={meal.title}
                                            className="meal-image w-40 h-40 mx-auto rounded-md my-4"
                                        />
                                        <a
                                            href={meal.recipeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="view-recipe-button px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                        >
                                            View Recipe
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </>
    );
};

export default Healthier;
