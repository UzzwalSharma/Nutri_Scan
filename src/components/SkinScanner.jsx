import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { FaCamera, FaTimes } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import './MealScanner.css';

const SkinScanner = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [mealName, setMealName] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const [healthierMeals, setHealthierMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageProcessing, setImageProcessing] = useState(false);
    const webcamRef = useRef(null);

    const handleCapture = () => {
        setImageProcessing(true);

        // Simulate image capture delay (3 seconds for demo)
        setTimeout(() => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImageSrc(imageSrc);
            setImageProcessing(false);
            setPopupVisible(true); // Show popup if image cannot be processed
        }, 3000);
    };

    const handlePopupSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const API_KEY = '9c83c683f5f94e559aa1d33b3ed75dc8'; 
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                    query: mealName,
                    number: 5,
                    apiKey: API_KEY
                }
            });

            const mealResults = response.data.results.map(meal => ({
                title: meal.title,
                calories: meal.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 'N/A',
                image: meal.image
            }));

            setHealthierMeals(mealResults);
            setPopupVisible(false);
        } catch (error) {
            console.error("Error fetching healthier meals:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="scanner-container">
            <h1>Meal Scanner</h1>
            <p>Capture an image of your meal to find healthier options.</p>

            {!imageSrc ? (
                <>
                    <Webcam 
                        audio={false} 
                        ref={webcamRef} 
                        screenshotFormat="image/png" 
                        style={{ width: '100%', height: 'auto', border: '2px solid #ddd', borderRadius: '10px' }} 
                    />
                    <button className="capture-button" onClick={handleCapture}>
                        <FaCamera /> Capture Image
                    </button>
                </>
            ) : (
                <div className="captured-image-preview">
                    <h4>Captured Image:</h4>
                    <img src={imageSrc} alt="Captured Meal" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                </div>
            )}

            {/* Popup for entering meal details */}
            {popupVisible && (
                <div className="popup">
                    <h2>Image Not Processed</h2>
                    <p>Please fill in the details of your meal to find healthier options:</p>
                    <form onSubmit={handlePopupSubmit}>
                        <input
                            type="text"
                            placeholder="Enter Meal Name"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                            required
                        />
                        <button type="submit" className="submit-button">Find Healthier Options</button>
                    </form>
                    <button className="cancel-button" onClick={() => setPopupVisible(false)}>
                        <FaTimes /> Cancel
                    </button>
                </div>
            )}

            {/* Fullscreen spinner for image capture */}
            {imageProcessing && (
                <div className="fullscreen-spinner">
                    <ClipLoader color="#ffffff" loading={imageProcessing} size={100} />
                    <p>Processing Image...</p>
                </div>
            )}

            {/* Fullscreen spinner for meal fetching */}
            {loading && (
                <div className="fullscreen-spinner">
                    <ClipLoader color="#ffffff" loading={loading} size={100} />
                    <p>Fetching Healthier Meal Options...</p>
                </div>
            )}

            {!loading && healthierMeals.length > 0 && (
                <div className="meal-results">
                    <h3>Healthier Meal Options:</h3>
                    <div className="swipe-container">
                        {healthierMeals.map((meal, index) => (
                            <div key={index} className="meal-item">
                                <h4>{meal.title}</h4>
                                <p>Calories: {meal.calories}</p>
                                <img src={meal.image} alt={meal.title} className="meal-image" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkinScanner;
