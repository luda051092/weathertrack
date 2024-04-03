import os
from dotenv import load_dotenv
import requests
import unittest
from unittest.mock import patch, Mock
from weather2 import get_current_weather, get_five_day_forecast
from coordinates import get_location_from_google

class TestWeather(unittest.TestCase):
    def setUp(self):
        self.latitude = 40.7128
        self.longitude = -74.0060
        self.weather_data = {
            'main': 'Clear',
            'description': 'clear sky',
            'icon': '01d',
            'temperature': 26.53
        }
        self.forecast_data = [
            {
                'date': '2022-09-30 12:00:00',
                'main': 'Clear',
                'description': 'clear sky',
                'icon': '01d',
                'temperature': 26.53
            },
            {
                'date': '2022-09-30 15:00:00',
                'main': 'Clouds',
                'description': 'overcast clouds',
                'icon': '04d',
                'temperature': 24.88
            },
            {
                'date': '2022-09-30 18:00:00',
                'main': 'Clouds',
                'description': 'scattered clouds',
                'icon': '03d',
                'temperature': 23.33
            },
            {
                'date': '2022-09-30 21:00:00',
                'main': 'Rain',
                'description': 'light rain',
                'icon': '10n',
                'temperature': 22.94
            },
            {
                'date': '2022-10-01 00:00:00',
                'main': 'Clear',
                'description': 'clear sky',
                'icon': '01n',
                'temperature': 21.61
            }
        ]

    @patch('requests.get')
    def test_get_current_weather(self, mock_get):
        # Set up mock response
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'weather': [
                {
                    'main': self.weather_data['main'],
                    'description': self.weather_data['description'],
                    'icon': self.weather_data['icon']
                }
            ],
            'main': {
                'temp': self.weather_data['temperature']
            }
        }
        mock_get.return_value = mock_response

        # Call function and assert that it returns the expected weather data
        weather = get_current_weather(self.latitude, self.longitude, 'dummy_api_key')
        self.assertEqual(weather, self.weather_data)

    @patch('requests.get')
    def test_get_five_day_forecast(self, mock_get):
        mock_get.return_value.json.return_value = {
            'list': [
                {
                    'dt_txt': forecast['date'],
                    'weather': [
                        {
                            'main': forecast['main'],
                            'description': forecast['description'],
                            'icon': forecast['icon']
                        }
                    ],
                    'main': {
                        'temp': forecast['temperature']
                    }
                } for forecast in self.forecast_data
            ]
        }
        forecast = get_five_day_forecast(self.latitude, self.longitude, 'dummy_api_key')
        self.assertEqual(forecast, self.forecast_data)

    @patch('requests.get')
    def test_get_current_weather_invalid_api_key(self, mock_get):
        mock_get.return_value.status_code = 401
        with self.assertRaises(Exception):
            get_current_weather(self.latitude, self.longitude, 'invalid_api_key')

    @patch('requests.get')
    def test_get_current_weather_invalid_location(self, mock_get):
        mock_get.return_value.status_code = 400
        with self.assertRaises(Exception):
            get_current_weather(999, 999, 'dummy_api_key')

    @patch('requests.get')
    def test_get_current_weather_api_failure(self, mock_get):
        mock_get.return_value.status_code = 500
        with self.assertRaises(Exception):
            get_current_weather(self.latitude, self.longitude, 'dummy_api_key')

    @patch('requests.get')
    def test_get_current_weather_unexpected_response_structure(self, mock_get):
        mock_get.return_value.json.return_value = {
            'unexpected': 'response structure'
        }
        with self.assertRaises(Exception):
            get_current_weather(self.latitude, self.longitude, 'dummy_api_key')




if __name__ == '__main__':
    unittest.main()