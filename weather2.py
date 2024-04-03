import os
from dotenv import load_dotenv
import requests
from coordinates import get_location_from_google

# Load environment variables from .env file
load_dotenv()

# OpenWeatherMap API endpoint for current weather
OPENWEATHER_CURRENT_API_URL = "https://api.openweathermap.org/data/2.5/weather"
OPENWEATHER_FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast"

# API key for OpenWeatherMap API and Google API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

# Function to get current weather data for a given latitude and longitude
def get_current_weather(latitude, longitude, api_key):
    
        # Request data from OpenWeatherMap API
        params = {
            'lat': latitude,
            'lon': longitude,
            'appid': api_key,
            'units': 'metric'
        }
        # Send GET request to OpenWeatherMap API
        response = requests.get(OPENWEATHER_CURRENT_API_URL, params=params)
        # Raise an exception if the response status code is not 200
        if response.status_code != 200:
            raise Exception(f"Error fetching weather data: {response.text}")
        # Parse the JSON response
        data = response.json()
        
        # Extract weather information
        weather = {
            'main': data['weather'][0]['main'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'temperature': data['main']['temp']
        }
        
        return weather
   
        
# Function to get five-day forecast data for a given latitude and longitude    
def get_five_day_forecast(latitude, longitude, api_key):
    try:
        # Request data from OpenWeatherMap API
        params = {
            'lat': latitude,
            'lon': longitude,
            'appid': api_key,
            'units': 'metric',
            'cnt': 5  # Number of forecast data points (change as needed)
        }
        # Send GET request to OpenWeatherMap API
        response = requests.get(OPENWEATHER_FORECAST_API_URL, params=params)
        # Parse the JSON response
        data = response.json()
        
        # Extract forecast information
        forecast = []
        for item in data['list']:
            forecast_item = {
                'date': item['dt_txt'],
                'main': item['weather'][0]['main'],
                'description': item['weather'][0]['description'],
                'icon': item['weather'][0]['icon'],
                'temperature': item['main']['temp']
            }
            forecast.append(forecast_item)
        
        return forecast
    except Exception as e:
        print(f"Error fetching five-day forecast data from OpenWeatherMap: {e}")
        return None

def main():
    # Get latitude and longitude from Google Maps API
    latitude, longitude = get_location_from_google(GOOGLE_API_KEY)
    if latitude is not None and longitude is not None:
        # Get and print current weather data
        weather_data = get_current_weather(latitude, longitude, OPENWEATHER_API_KEY)
        if weather_data:
            print("Current Weather:")
            print(weather_data)
        else:
            print("Unable to retrieve weather data from OpenWeatherMap.")
        # Get and print five-day forecast data
        forecast = get_five_day_forecast(latitude, longitude, OPENWEATHER_API_KEY)
        if forecast:
            print("\nFive-Day Forecast:")
            for item in forecast:
                print(item)
        else:
            print("Unable to retrieve forecast data from OpenWeatherMap.")
    else:
        print("Unable to retrieve location from Google.")
    

if __name__ == "__main__":
    main()

