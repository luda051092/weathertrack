import React from 'react';

function Forecast({ data }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="forecast-container">
      {data.map((day, index) => {
        if (!day || !day.main || !day.description || !day.date || !day.temperature || !day.icon) {
          return <div key={index}>No data available for this day</div>;
        }

        return (
          <div className="forecast-item" key={day.date}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{day.main}</h5>
                <p className="card-text">{day.description}</p>
                <p className="card-text">Date: {day.date}</p>
                <p className="card-text">Temperature: {day.temperature}°C</p>
                <img className="card-img-top" src={`http://openweathermap.org/img/wn/${day.icon}.png`} alt={day.description} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Forecast;