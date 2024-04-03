
import React from 'react';

function WeatherDisplay({ data }) {
  return (
    <div id="current-weather" className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Current Weather</h5>
        <p className="card-text">{data.description}</p>
        <p className="card-text">Temperature: {data.temperature}°C</p>
        <img className="card-img-top" src={`http://openweathermap.org/img/wn/${data.icon}.png`} alt={data.description} />
      </div>
    </div>
  );
}

export default WeatherDisplay;