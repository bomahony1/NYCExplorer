import requests
import traceback
import json
import time
from datetime import datetime, timedelta
from collections import Counter
from django.http import JsonResponse
from django.utils import timezone

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

        vals = (main_weather, description, temperature, visibility, wind_speed, wind_deg, clouds, timestamp)
        print('#found {} Availability {}'.format(len(vals), vals))
        
        return weather
    except requests.exceptions.RequestException as e:
        print("Error in get_weather:", e)
        return None


# Foursquare API

def get_venues(query):
    url = "https://api.foursquare.com/v3/places/search"
    headers = {
        "Accept": "application/json",
        "Authorization": "fsq3YJj6mpB8MvstI7T9B/Z74vyD/AuUXD48pI8OJbs7U70="
    }
    params = {
        "query": query,
        "ll": "40.7831,-73.9712",  # Manhattan coordinates
        "open_now": "true",
        "sort": "DISTANCE"
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        venues = response.json()
        print(venues)
        return venues
    except requests.exceptions.RequestException as e:
        print("Error in get_venues:", e)
        return None


# Ticketmaster API

def get_events_in_next_month():
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
                        "genres": event_genres
                    })

            params["page"] += 1

            if len(event_data) >= 1000:
                break

        except requests.exceptions.RequestException as e:
            print("Error in get_events_in_next_month:", e)
            break

    return event_data


# Google Places API

def get_restaurants(api_key):
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": "restaurants in Manhattan, New York",
        "key": api_key
    }
    restaurant_data = []

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        results = data["results"]
        restaurant_data = process_results(results)

        while "next_page_token" in data:
            time.sleep(2)
            params["pagetoken"] = data["next_page_token"]
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            results = data.get("results", [])
            restaurant_data += process_results(results)

    except requests.exceptions.RequestException as e:
        print("Error in get_restaurants:", e)

    return restaurant_data


def process_results(results):
    restaurant_data = []

    for result in results:
        name = result["name"]
        address = result["formatted_address"]
        location = result["geometry"]["location"]
        lat = location["lat"]
        lng = location["lng"]
        rating = result.get("rating")
        website = result.get("website")
        phone = result.get("formatted_phone_number")

        restaurant_data.append({
            "name": name,
            "address": address,
            "latitude": lat,
            "longitude": lng,
            "rating": rating,
            "website": website,
            "phone": phone
        })

    return restaurant_data
