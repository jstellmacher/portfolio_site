"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false });

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const cache = {}; // Simple cache object

function TravelMap() {
    const [locations, setLocations] = useState([]);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const addLocation = async () => {
        const locationKey = `${city},${country}`;
        
        // Check if the location is already cached
        if (cache[locationKey]) {
            const { lat, lng } = cache[locationKey];
            setLocations([...locations, { city, country, lat, lng }]);
            resetInput();
            return;
        }

        // Fetch coordinates using Nominatim API with English language
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationKey)}&format=json&accept-language=en`);
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0]; // Get the first result's coordinates
                cache[locationKey] = { lat, lng: lon }; // Cache the result
                setLocations([...locations, { city, country, lat, lng: lon }]);
            } else {
                alert("Location not found");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            alert("Error fetching location");
        }

        resetInput();
    };

    const resetInput = () => {
        setCity('');
        setCountry('');
    };

    let timeoutId;

    const handleInputChange = (event) => {
        clearTimeout(timeoutId);
        const userInput = event.target.value;

        timeoutId = setTimeout(() => {
            // Call the geocoding API with userInput
            addLocation();
        }, 300); // Wait for 300ms after the user stops typing
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <input 
                    type="text" 
                    placeholder="City" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="text" 
                    placeholder="Country" 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={addLocation} 
                    className="bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Location
                </button>
            </div>

            <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }} className="rounded-lg shadow-lg">
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {locations.map((loc, index) => (
                    <React.Fragment key={index}>
                        <Marker position={[loc.lat, loc.lng]}>
                            <Popup>
                                {loc.city}, {loc.country}
                            </Popup>
                        </Marker>
                        {/* Highlight the location with a circle */}
                        <Circle 
                            center={[loc.lat, loc.lng]} 
                            radius={50000} // Adjust the radius as needed
                            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }} 
                        />
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
}

export default TravelMap;