

import requests.exceptions
import os
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv()

# Define the URLs for the Google APIs
GOOGLE_GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json"
GOOGLE_GEOLOCATION_API_URL = "https://www.googleapis.com/geolocation/v1/geolocate"
GOOGLE_PLACES_API_URL="https://maps.googleapis.com/maps/api/place/nearbysearch/json"
GOOGLE_PHOTOS_API_URL = "https://maps.googleapis.com/maps/api/place/photo"

# Get the Google API key from the environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Function to get the latitude and longitude of a location from Google
def get_location_from_google(GOOGLE_API_KEY, location=None):
    try:
        # If a location is provided, use the Geocoding API to get the latitude and longitude
        if location:
            params = {'address': location, 'key': GOOGLE_API_KEY}
            response = requests.get(GOOGLE_GEOCODING_API_URL, params=params)
            data = response.json()
            if data['results']:
                latitude = data['results'][0]['geometry']['location']['lat']
                longitude = data['results'][0]['geometry']['location']['lng']
                address_components = data['results'][0]['address_components']
                location_name = ', '.join([component['long_name'] for component in address_components])
                print(f'Location name: {location_name}')  # Print the location name
            else:
                print("No results found for the provided location.")
                return None, None
        # If no location is provided, use the Geolocation API to get the current location
        else:
            params = {'key': GOOGLE_API_KEY, 'considerIp': True}
            response = requests.post(GOOGLE_GEOLOCATION_API_URL, params=params)
            data = response.json()
            latitude = data['location']['lat']
            longitude = data['location']['lng']

        return latitude, longitude
    except requests.exceptions.RequestException as e:
        print(f"Error fetching location from Google: {e}")
        return None, None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None, None
    
# Function to get the location name from the latitude and longitude
def get_location_name(lat, lng):
    try:
        print(f'get_location_name called with lat={lat}, lng={lng}')
        response = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={GOOGLE_API_KEY}')
    
        if response.status_code == 200:
            data = response.json()
    
            if 'results' in data and len(data['results']) > 0:
                # The location name is in the 'formatted_address' field of the first result
                location_name = data['results'][0]['formatted_address']
            
                return location_name
        # If the request failed or the data is not in the expected format, return None
        return None
    except requests.exceptions.RequestException as e:
        print(f"Error making request to Google API: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

# Function to get the place_id from the latitude and longitude
def get_place_id_from_coordinates(GOOGLE_API_KEY, latitude, longitude):
    try:
        
        params = {
            'location': f"{latitude},{longitude}",
            'radius': 500,
            'key': GOOGLE_API_KEY
        }
        response = requests.get(GOOGLE_PLACES_API_URL, params=params)
        data = response.json()
        print(data)

        # Check each result for a photos field
        for result in data['results']:
            if 'photos' in result:
                # Return the place_id of the first result with a photo
                return result['place_id']

        return None
    except requests.exceptions.RequestException as e:
        print(f"Error making request to Google API: {e}")
        return None
    except Exception as e:
        print(f"Error fetching place_id from Google: {e}")
        return None

# Function to get the photo reference from the place_id
def get_photo_reference(GOOGLE_API_KEY, place_id):
    try:
        # Use the Places API to find a place with the provided place_id
        params = {
            'place_id': place_id,
            'key': GOOGLE_API_KEY
        }


        response = requests.get("https://maps.googleapis.com/maps/api/place/details/json", params=params)
        data = response.json()
        print(data)

        # Check if the place was found
        if 'result' in data:
            place = data['result']

            # Check if the place has a photo
            if 'photos' in place:
                # Return the photo reference
                return place['photos'][0]['photo_reference']

        return None
    except requests.exceptions.RequestException as e:
        print(f"Error making request to Google API: {e}")
        return None
    except Exception as e:
        print(f"Error fetching photo reference from Google: {e}")
        return None

# Function to get the photo from the photo reference
def get_photo(photo_reference, GOOGLE_API_KEY):
    try:
        print(f"photo_reference: {photo_reference}")
        params = {
            'maxwidth': 400,
            'photoreference': photo_reference,
            'key': GOOGLE_API_KEY
        }
        response = requests.get("https://maps.googleapis.com/maps/api/place/photo", params=params)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            # Define the folder where you want to save the photo
            folder_path = "static/images"  # relative path

            # Create the folder if it doesn't exist
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)

            # Define the path to the photo
            photo_path = os.path.join(folder_path, 'photo.jpg')

            # Save the photo
            with open(photo_path, 'wb') as f:
                f.write(response.content)
            return photo_path
        else:
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error making request to Google API: {e}")
        return None    
    except Exception as e:
        print(f"Error fetching photo from Google: {e}")
        return None
    
# Main function to test the functions
if __name__ == "__main__":
    # Test the get_location_from_google function
    latitude, longitude = get_location_from_google(GOOGLE_API_KEY, location=None)
    print(f"Latitude: {latitude}, Longitude: {longitude}")

    # Test the get_place_id_from_coordinates function
    place_id = get_place_id_from_coordinates(GOOGLE_API_KEY, latitude, longitude)
    print(f"Place ID: {place_id}")

    # Test the get_photo_reference function
    photo_reference = get_photo_reference(GOOGLE_API_KEY, place_id)
    print(f"Photo Reference: {photo_reference}")

    # Test the get_photo function
    photo_path = get_photo(photo_reference, GOOGLE_API_KEY)
    print(f"Photo Path: {photo_path}")