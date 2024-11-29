import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import "./MealScanner.css";

const MealScanner = () => {
    const [mealName, setMealName] = useState('');
    const [healthierMeals, setHealthierMeals] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        const API_KEY = "bcfb3ed36c394b65bb58e554d5643556"; // Replace with your Spoonacular API key

        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch`,
                {
                    params: {
                        query: mealName,
                        number: 8,
                        apiKey: API_KEY,
                        addRecipeInformation: true, // Include recipe information in the API response
                    },
                }
            );

            const mealResults = response.data.results.map((meal) => ({
                title: meal.title,
                image: meal.image,
                recipeUrl: meal.sourceUrl, // URL for the recipe details
            }));

            setHealthierMeals(mealResults);
        } catch (error) {
            console.error("Error fetching healthier meals:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="scanner-container">
            <h1>Meal Alternatives Finder</h1>
            <p>Enter the name of your meal to find healthier options.</p>

            <form onSubmit={handleSearch} className="meal-search-form">
                <input
                    type="text"
                    placeholder="Enter Meal Name"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">
                    Find Healthier Options
                </button>
            </form>

            {loading && (
                <div className="fullscreen-spinner">
                    <ClipLoader color="#ffffff" loading={loading} size={100} />
                    <p>Fetching Healthier Meal Options...</p>
                </div>
            )}

            {!loading && healthierMeals.length > 0 && (
                <div className="meal-results">
                    <h3>Healthier Meal Options:</h3>
                    <div className="meal-grid">
                        {healthierMeals.map((meal, index) => (
                            <div key={index} className="meal-item">
    <h4>{meal.title}</h4>
    <img src={meal.image} alt={meal.title} className="meal-image" />
    <a
        href={meal.recipeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="view-recipe-button"
    >
        View Recipe
    </a>
</div>

                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealScanner;
