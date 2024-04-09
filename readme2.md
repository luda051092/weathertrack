# Project Title "Weathertrack"


https://git.heroku.com/weathertrack2.git

## Description

 WeatherTrack is a web application that provides real-time weather updates and forecasts for any location. The application is designed to be user-friendly and visually appealing, displaying a photo of the chosen location alongside the weather information.

## Features
The WeatherTrack app likely provides users with real-time weather updates for their current location or for a location 
of their choice. It may display information such as temperature, humidity, wind speed, and weather conditions 
(sunny, cloudy, rainy, etc.). The app might also provide weather forecasts for the near future.
The features implemented in this project include:

1. ## Features

1. **Weather Tracking and Forecasting with User-Provided Photo**: Users can enter any location, and the app will 
provide the current weather conditions and a forecast for that location. This feature was implemented to give 
users personalized, location-specific weather information. Additionally, a photo is displayed along with the weather information, creating a more engaging and visually appealing interface.

2. **Automatic Location Detection and Weather Information**: The app automatically detects the user's current location and 
provides real-time weather data for that location. This feature was implemented to give users immediate access to 
relevant weather information without the need for manual input. In addition to weather data, the app also displays 
a photo of the user's current location, enhancing the visual appeal and providing a more immersive user experience.



This project has separate tests for the frontend and backend.

### Frontend Tests

The frontend tests are written in JavaScript and are located in the `weathertrack2/src` directory. 
To run these tests, navigate to the `weathertrack2/src` directory in your terminal and use the command `npm test`.

### Backend Tests

The backend tests are written in Python and are located in the `weathertrack2` directory. 
To run these tests, navigate to the `weathertrack2` directory in your terminal 
and use the command `python -m unittest discover`.


## User Flow

1. **Step 1**: The user opens the app. If it's their first time using the app, they may be prompted to allow the app to access their location data.

2. **Step 2**: The app automatically detects the user's current location and displays the current weather data and a photo of the location.





## API

This project uses several APIs to provide weather data and location-based services:

1. **Google Geocoding API**: Used to convert addresses into geographic coordinates (latitude and longitude), which can be used to place markers or position the map. [Google Geocoding API](https://maps.googleapis.com/maps/api/geocode/json)

2. **Google Geolocation API**: Used to get the geographical location of the user. [Google Geolocation API](https://www.googleapis.com/geolocation/v1/geolocate)

3. **Google Places API**: Used to get information about places including the name, location, and type of a place. [Google Places API](https://maps.googleapis.com/maps/api/place/nearbysearch/json)

4. **Google Photos API**: Used to get photos of the places. [Google Photos API](https://maps.googleapis.com/maps/api/place/photo)

5. **OpenWeather Current Weather Data API**: Used to get current weather data for any location on Earth including over 200,000 cities. [OpenWeather Current Weather Data API](https://api.openweathermap.org/data/2.5/weather)

6. **OpenWeather Forecast API**: Used to get weather forecast data for any location on Earth. [OpenWeather Forecast API](https://api.openweathermap.org/data/2.5/forecast)

## Technology Stack

This project was created using the following technologies:

1. **Python**: The backend of the application is written in Python.
2. **Flask**: Flask, a web framework written in Python, is used for handling requests and responses on the server side.
3. **JavaScript (JS)**: The frontend of the application is written in JavaScript, enabling interactive elements.
4. **React**: React, a JavaScript library, is used for building the user interface on the client side.

## Additional Information


This project was a great learning experience in using multiple APIs together 
and building a full-stack application with Python, Flask, JavaScript, and React. 
One of the challenges faced during development trial and error when trying to implemet certain functions, which as of this 
writing are now part of the future improvements. There were also issues with certain APIs not providing quality photos for the locations
provided, as well as CORS issues which were solved by implementing CORS on the backend and also, in pre-production mode, correcting the local 
host so that it did not interfere with other programs.
 which was resolved by implementing caching.

Future improvements planned for this project include:

- **User Authentication**: Adding a sign-in feature so that returning users can have profiles.
- **Favorite Locations**: Allowing users to save their favorite locations for quick access to weather information.
- **User Photo Uploads**: Enabling users to upload their own photos of locations, which could potentially be featured alongside the photos fetched from the Google API.
- **Weather Alerts**: Implementing weather alerts to notify users of severe weather conditions in their saved locations.