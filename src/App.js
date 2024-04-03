

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import LocationInput from './locationInput';
import WeatherDisplay from './weatherDisplay'; 
import Forecast from './forecast';
import Photo from './photo'; // Import the Photo component
import WeatherComponent from './weathercomponent'; 

axios.defaults.baseURL = 'http://localhost:5001';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/weather')
      .then(response => setData(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleGetWeather = (location) => {
    axios.post('/get_weather', { location })
      .then(response => setData(response.data))
      .catch(error => console.error('Error:', error));
  };

  return (

      <Router>  
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/weather" element={<WeatherComponent />} />
              <Route path="/" element={
                <>
                  {data && <Photo location={data.location} />}
                  {data && data.location && <p>{data.location.split(', ')[1]}, {data.location.split(', ')[2]}, {data.location.split(', ')[3]}</p>}
                  <LocationInput onGetWeather={handleGetWeather} />
                  {data && (
                    <div className="App-header">
                      <WeatherDisplay data={data.current_weather} />
                      <Forecast data={data.forecast} />
                    </div>
                  )}
                </>
              } />  
            </Routes>
          </header>
        </div>
      </Router>
    
  );
}

export default App;