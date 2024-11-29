// RestaurantMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function RestaurantMap({ latitude, longitude, name }) {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            style={{ height: "400px", width: "35vw" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]}>
                <Popup>{name}</Popup>
            </Marker>
        </MapContainer>
    );
}

export default RestaurantMap;
