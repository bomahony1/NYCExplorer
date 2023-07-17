import requests
import json
import pickle 
import time
import datetime
import pandas as pd
from datetime import timedelta
#from django.http import JsonResponse
#from django.utils import timezone

# OpenWeather API

WEATHER_API = "http://api.openweathermap.org/data/2.5/weather?appid=d5de0b0a9c3cc6473da7d0005b3798ac&q=Manhattan"

def get_weather():
    try:
        response = requests.get(WEATHER_API)
        response.raise_for_status()
        weather = response.json()
        
        main_weather = weather["weather"][0]["main"]
        description = weather["weather"][0]["description"]
        temperature = weather["main"]["temp"]
        visibility = weather["visibility"]
        wind_speed = weather["wind"]["speed"]
        wind_deg = weather["wind"]["deg"]
        clouds = weather["clouds"]["all"]
        timestamp = timezone.now().timestamp()

        weather_data = {
            "main_weather": main_weather,
            "description": description,
            "temperature": temperature,
            "visibility": visibility,
            "wind_speed": wind_speed,
            "wind_deg": wind_deg,
            "clouds": clouds,
            "timestamp": timestamp
        }
        
        return weather_data
    except requests.exceptions.RequestException as e:
        print("Error in get_weather:", e)
        return None

# Foursquare API

def get_venues_restaurant():
    url = "https://api.foursquare.com/v3/places/search"
    headers = {
        "Accept": "application/json",
        "Authorization": "fsq3YJj6mpB8MvstI7T9B/Z74vyD/AuUXD48pI8OJbs7U70="
    }
    params = {
        "query": "restaurants",
        "ll": "40.7831,-73.9712",  # Manhattan coordinates
        "open_now": "true",
        "categoryId": "4d4b7105d754a06374d81259",  # Category ID for Food (Restaurants)
        "limit": 50,  # Number of results to retrieve per request
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        venues = response.json()
        return venues
    except requests.exceptions.RequestException as e:
        print("Error in get_venues:", e)
        return None

def get_venues_hotels():
    url = "https://api.foursquare.com/v3/places/search"
    headers = {
        "Accept": "application/json",
        "Authorization": "fsq3YJj6mpB8MvstI7T9B/Z74vyD/AuUXD48pI8OJbs7U70="
    }
    params = {
        "query": "hotels",
        "ll": "40.7831,-73.9712",  # Manhattan coordinates
        "open_now": "true",
        "limit": 50,  # Number of results to retrieve per request
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        venues = response.json()
        return venues
    except requests.exceptions.RequestException as e:
        print("Error in get_venues:", e)
        return None

# Ticketmaster API

def get_events():
    API_KEY = "q62LGBfQCP3kg9gVyUlveTeq2BayJuLL"
    url = "https://app.ticketmaster.com/discovery/v2/events.json"
    today = datetime.date.today()
    end_date = today + timedelta(days=30)
    event_data = []

    params = {
        "apikey": API_KEY,
        "latlong": "40.7831,-73.9712",  # Manhattan coordinates (latitude, longitude)
        "radius": "5",  # Radius in miles around the specified coordinates
        "size": 200,  # Number of events per API response (maximum allowed)
        "page": 0,  # Start with the first page
    }

    while True:
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            events = data["_embedded"]["events"]

            for event in events:
                event_date = event["dates"]["start"]["localDate"]
                event_date_obj = datetime.datetime.fromisoformat(event_date).date()

                if today <= event_date_obj <= end_date:
                    event_name = event["name"]
                    event_time = event["dates"]["start"].get("localTime", "Time not available")
                    event_image = event["images"][0]["url"] if event["images"] else None
                    event_url = event["url"]
                    event_latitude = event["_embedded"]["venues"][0]["location"]["latitude"]
                    event_longitude = event["_embedded"]["venues"][0]["location"]["longitude"]

                    if event.get("classifications"):
                        classification = event["classifications"][0]
                        genre = classification.get("genre", {})
                        event_genres = genre.get("name")
                    else:
                        event_genres = None

                    event_data.append({
                        "name": event_name,
                        "date": event_date,
                        "time": event_time,
                        "image": event_image,
                        "url": event_url,
                        "genres": event_genres,
                        "latitude": event_latitude,
                        "longitude": event_longitude
                    })

            params["page"] += 1

            if len(event_data) >= 1000:
                break

        except requests.exceptions.RequestException as e:
            print("Error in get_events:", e)
            break

    return event_data


# Google Places API

def get_google_restaurants():
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    api_key = "AIzaSyDgYC8VXvS4UG9ApSUhS2v-ByddtHljFls"
    params = {
        "query": "restaurants in Manhattan, New York",
        "key": api_key
    }
    restaurant_data = []

    try:
        while True:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            results = data["results"]

            for result in results:
                name = result["name"]
                address = result["formatted_address"]
                location = result["geometry"]["location"]
                lat = location["lat"]
                lng = location["lng"]
                rating = result.get("rating")

                restaurant_data.append({
                    "name": name,
                    "address": address,
                    "latitude": lat,
                    "longitude": lng,
                    "rating": rating
                })

            if "next_page_token" not in data:
                break

            params["pagetoken"] = data["next_page_token"]
            time.sleep(2)  # Delay between API calls as per Google's guidelines

    except requests.exceptions.RequestException as e:
        print("Error in get_restaurants:", e)

    return restaurant_data


def get_predictions(hour, day, month, latitude, longitude):
    """Returns prediction of busyness in Area."""
    def get_location_id(latitude, longitude):
        """Returns location ID given coordinates"""
        with open('../../data/taxi_zones.json', 'r') as file:
            data = json.load(file)
        latitude, longitude = str(latitude), str(longitude)
        zone = None
        for _ in data:
            if latitude and longitude in data['data'][0][10]:
                zone = data['data'][0][13]
        return zone
        
    with open('../../data/small_model.pkl', 'rb') as file:
        model = pickle.load(file)
    location_id = get_location_id(latitude, longitude)

    feature_names = ['hour', 'day_of_week', 'month', 'pulocationid']
    prediction_data = [[hour, month, day, location_id]]
    prediction_data_df = pd.DataFrame(prediction_data, columns=feature_names)

    prediction_data = model.predict(prediction_data_df)
    return prediction_data[0]



