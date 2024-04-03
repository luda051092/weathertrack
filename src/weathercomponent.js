import React, { useState } from 'react';
import axios from 'axios';

function WeatherComponent() {
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
        const location = 'your location'; // replace with your actual location
        const response = await axios.post('http://localhost:5000/get_weather', { location });
        setWeather(response.data);
    };

    return (
        <div>
            <button onClick={getWeather}>Get Weather</button>
            {weather && (
                <div>
                    <h1>{weather.location}</h1>
                    <p>{weather.current_weather}</p>
                    <p>{weather.forecast}</p>
                    <img src={weather.photo_path} alt="Location" />
                </div>
            )}
        </div>
    );
}

export default WeatherComponent;