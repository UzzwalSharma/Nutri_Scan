import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import RestaurantMap from '/src/components/RestaurentMap'; // Ensure the correct path
import "/src/components/NearbyRestaurants.css.css"; // Ensure styles are included
import { motion } from "framer-motion";

// Modal.setAppElement('#root'); // Uncomment this for accessibility

const NearbyRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null); // For modal

    const fetchRestaurants = async (latitude, longitude) => {
        try {
            const apiKey = 'fsq3w7ZRRnNtIxxnhWx22GDpLRoym98vgXS8T61Vuv64LrU='; // Your API key
            const response = await axios.get(
                'https://api.foursquare.com/v3/places/search',
                {
                    headers: {
                        Authorization: apiKey,
                    },
                    params: {
                        query: 'restaurant',
                        ll: `${latitude},${longitude}`,
                        limit: 20,
                    },
                }
            );

            const restaurantData = response.data.results;

            // Fetch photos for each restaurant
            const restaurantWithPhotos = await Promise.all(
                restaurantData.map(async (restaurant) => {
                    const photoResponse = await axios.get(
                        `https://api.foursquare.com/v3/places/${restaurant.fsq_id}/photos`,
                        { headers: { Authorization: apiKey } }
                    );

                    const photo = photoResponse.data.length
                        ? `${photoResponse.data[0].prefix}original${photoResponse.data[0].suffix}`
                        : 'https://via.placeholder.com/150'; // Placeholder if no photo

                    return { ...restaurant, photo };
                })
            );

            setRestaurants(restaurantWithPhotos);
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchRestaurants(latitude, longitude);
            },
            (err) => {
                setError('Location access denied');
                setLoading(false);
            }
        );
    }, []);

    const openMap = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    const closeMap = () => {
        setSelectedRestaurant(null);
    };

    if (loading)
        return (
            <div className="loader-container">
                <motion.div
                    className="loader"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5 }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    🍔
                </motion.div>
                <p>Finding delicious places near you...</p>
                <h2>  Made with ❤️ by  Simran and team</h2>
            </div>
        );

    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="restaurant-list">
            {restaurants.map((restaurant) => (
                <motion.div
                    key={restaurant.fsq_id}
                    className="restaurant-card"
                    onClick={() => openMap(restaurant)}
                    style={{ cursor: 'pointer' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <img src={restaurant.photo} alt={restaurant.name} className="restaurant-image" />
                    <div className="restaurant-info">
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.location.address}</p>
                        <p>Distance: {Math.round(restaurant.distance / 1000)} km</p>
                    </div>
                </motion.div>
            ))}

            {/* Modal to show map */}
        

<Modal
    isOpen={!!selectedRestaurant}
    onRequestClose={closeMap}
    className="modal-content"
    overlayClassName="modal-overlay"
>
    {selectedRestaurant && (
        <div>
            <div className="map-container">
                <RestaurantMap
                    latitude={selectedRestaurant.geocodes.main.latitude}
                    longitude={selectedRestaurant.geocodes.main.longitude}
                    name={selectedRestaurant.name}
                />
            </div>
            <button onClick={closeMap} className="close-map-btn">
                Close Map
            </button>
        </div>
    )}
</Modal>

        </div>
    );
};

export default NearbyRestaurants;
