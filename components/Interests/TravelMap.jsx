import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

const TravelMap = () => {
    const [country, setCountry] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isClient, setIsClient] = useState(false);
    const [countries, setCountries] = useState([]);
    const [geojson, setGeojson] = useState(null);
    const [pinnedCountries, setPinnedCountries] = useState([]);

    useEffect(() => {
        setIsClient(true);

        // Fetch countries data from the public directory
        fetch('/data/countries.json')
            .then(response => response.json())
            .then(data => {
                setCountries(data);

                // Convert to GeoJSON format
                const geojsonData = {
                    type: "FeatureCollection",
                    features: data.map(country => ({
                        type: "Feature",
                        properties: {
                            name: country.Country
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [country.Lng, country.Lat]
                        }
                    }))
                };
                setGeojson(geojsonData);
            })
            .catch(error => console.error('Error fetching countries data:', error));
    }, []);

    useEffect(() => {
        if (country.length > 0) {
            const filteredSuggestions = countries.filter(c => 
                c.Country.toLowerCase().includes(country.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [country, countries]);

    const addCountryPin = (country) => {
        if (!pinnedCountries.includes(country)) {
            setPinnedCountries([...pinnedCountries, country]);
        }
    };

    const handleCountryClick = (country) => {
        addCountryPin(country);
    };

    const customIcon = L.divIcon({
        className: 'custom-icon',
        html: `<div style="font-size: 24px; color: red; display: flex; align-items: center; justify-content: center; height: 30px; width: 30px;"><i class="fa fa-map-marker-alt"></i></div>`,
        iconSize: [30, 30]
    });

    const geojsonStyle = {
        color: 'blue',
        weight: 2,
        fillColor: '#add8e6',
        fillOpacity: 0.6
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <input 
                    type="text" 
                    placeholder="Country" 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={() => addCountryPin(country)} 
                    className="bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Location
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Suggestions:</h2>
                <ul className="list-disc pl-5">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleCountryClick(suggestion.Country)} style={{ cursor: 'pointer', color: pinnedCountries.includes(suggestion.Country) ? 'green' : 'black' }}>
                            {suggestion.Country}
                        </li>
                    ))}
                </ul>
            </div>

            {isClient && (
                <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }} className="rounded-lg shadow-lg">
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    {geojson && (
                        <GeoJSON data={geojson} style={geojsonStyle} />
                    )}
                    {pinnedCountries.map((country, index) => {
                        const countryData = countries.find(c => c.Country === country);
                        if (!countryData || countryData.Lat === undefined || countryData.Lng === undefined) {
                            console.error("Invalid coordinates for country:", countryData);
                            return null;
                        }
                        return (
                            <Marker key={index} position={[countryData.Lat, countryData.Lng]} icon={customIcon}>
                                <Popup>
                                    {country}
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            )}
        </div>
    );
}

export default TravelMap;
