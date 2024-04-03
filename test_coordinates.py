import unittest
import os
import requests
from dotenv import load_dotenv
from unittest.mock import patch
from coordinates import get_location_from_google, get_location_name, get_place_id_from_coordinates, get_photo_reference, get_photo

load_dotenv()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

class MockResponse:
    def __init__(self, json_data, status_code):
        self.json_data = json_data
        self.status_code = status_code

    def json(self):
        return self.json_data

class TestCoordinates(unittest.TestCase):
    def setUp(self):
        self.GOOGLE_API_KEY = 'GOOGLE_API_KEY'
        self.location = 'New York'
        self.latitude = 40.7128
        self.longitude = -74.0060
        self.place_id = 'ChIJH7fsIKlZwokR6GPeEwXXofc'
        self.photo_reference = 'CmRaAAAA...'
        self.photo_path = 'static/images/photo.jpg'

    @patch('requests.get')
    def test_get_location_from_google(self, mock_get):
        mock_get.return_value.json.return_value = {
            'results': [
                {
                    'address_components': [
                        {'long_name': 'New York', 'short_name': 'New York', 'types': ['locality', 'political']},
                        {'long_name': 'New York', 'short_name': 'NY', 'types': ['administrative_area_level_1', 'political']},
                        {'long_name': 'United States', 'short_name': 'US', 'types': ['country', 'political']}
                    ],
                    'geometry': {
                        'location': {
                            'lat': self.latitude,
                            'lng': self.longitude
                         }
                    }
                }
            ],
            'status': 'OK'
        }
        latitude, longitude = get_location_from_google(self.GOOGLE_API_KEY, self.location)
        self.assertEqual(latitude, self.latitude)
        self.assertEqual(longitude, self.longitude)
    @patch('requests.get')
    def test_get_location_name(self, mock_get):
        mock_get.return_value.json.return_value = {
            'results': [
                {
                    'address_components': [
                        {'long_name': 'New York', 'short_name': 'New York', 'types': ['locality', 'political']},
                        {'long_name': 'New York', 'short_name': 'NY', 'types': ['administrative_area_level_1', 'political']},
                        {'long_name': 'United States', 'short_name': 'US', 'types': ['country', 'political']}
                    ],
                    'formatted_address': self.location
                }
            ],
            'status': 'OK'
        }
        location_name = get_location_name(self.latitude, self.longitude)
        self.assertEqual(location_name, self.location)
    
        latitude, longitude = get_location_from_google(self.GOOGLE_API_KEY, self.location)
        self.assertEqual(latitude, self.latitude)
        self.assertEqual(longitude, self.longitude)

    @patch('requests.get')
    def test_get_location_name(self, mock_get):
        def side_effect(url):
            if 'latlng' in url:
                return MockResponse({
                    'results': [
                        {
                            'formatted_address': self.location,
                            'address_components': [
                                {'long_name': 'New York', 'short_name': 'New York', 'types': ['locality', 'political']},
                                {'long_name': 'New York', 'short_name': 'NY', 'types': ['administrative_area_level_1', 'political']},
                                {'long_name': 'United States', 'short_name': 'US', 'types': ['country', 'political']}
                            ]
                        }
                    ],
                    'status': 'OK'
                }, 200)
            else:
                return MockResponse(None, 404)

        mock_get.side_effect = side_effect

        location_name = get_location_name(self.latitude, self.longitude)
        self.assertEqual(location_name, self.location)

    @patch('requests.get')
    def test_get_place_id_from_coordinates(self, mock_get):
        mock_get.return_value.json.return_value = {
            'results': [
                {
                    'place_id': self.place_id,
                    'photos': [{}]
                }
            ]
        }
        place_id = get_place_id_from_coordinates(self.GOOGLE_API_KEY, self.latitude, self.longitude)
        self.assertEqual(place_id, self.place_id)

    @patch('requests.get')
    def test_get_photo_reference(self, mock_get):
        mock_get.return_value.json.return_value = {
            'result': {
                'photos': [
                    {
                        'photo_reference': self.photo_reference
                    }
                ]
            }
        }
        photo_reference = get_photo_reference(self.GOOGLE_API_KEY, self.place_id)
        self.assertEqual(photo_reference, self.photo_reference)

    @patch('requests.get')
    def test_get_photo(self, mock_get):
        mock_get.return_value.content = b'test content'
        mock_get.return_value.status_code = 200
        photo_path = get_photo(self.photo_reference, self.GOOGLE_API_KEY)
        self.assertEqual(photo_path, self.photo_path)

if __name__ == '__main__':
    unittest.main()