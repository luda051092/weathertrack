import unittest
import json
from app2 import app

class FlaskTest(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_get_weather(self):
        response = self.app.post('/get_weather', 
                                 data=json.dumps({'location': 'New York'}), 
                                 content_type='application/json')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('current_weather', data)
        self.assertIn('forecast', data)
        self.assertIn('photo_path', data)
        self.assertIn('location', data)

    def test_get_weather_no_location(self):
        response = self.app.post('/get_weather', 
                                 data=json.dumps({}), 
                                 content_type='application/json')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('error', data)

    

    def test_weather(self):
        response = self.app.get('/weather')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('current_weather', data)
        self.assertIn('forecast', data)

    def test_404_error(self):
        response = self.app.get('/nonexistent_route')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', data)

    def test_serve_nonexistent_static_file(self):
        response = self.app.get('/nonexistent_file.html')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', data)

if __name__ == "__main__":
    unittest.main()

if __name__ == "__main__":
    unittest.main()