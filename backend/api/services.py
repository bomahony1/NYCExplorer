import requests
import traceback
import json
from datetime import date, timedelta
import requests
from collections import Counter
from django.http import JsonResponse



# //// OPENWEATHER API ////

##Weather API Key
WEATHERAPI = "http://api.openweathermap.org/data/2.5/weather?appid=d5de0b0a9c3cc6473da7d0005b3798ac&q=Manhattan"

# Define the function to get weather data
def get_weather():
    try: 
        # Retrieve the data passed into the function and load it as a JSON object
        text = requests.get(WEATHERAPI).text
        weather = json.loads(text)
        # Extract the necessary values from the JSON object
        vals = (weather["weather"][0]["main"], weather["weather"][0]["description"], weather["main"]["temp"], weather["visibility"], weather["wind"]["speed"], weather["wind"]["deg"], weather["clouds"]["all"], datetime.timestamp(datetime.now()))
        print('#found {} Availability {}'.format(len(vals), vals))
        return weather
    except Exception as e:
        print(traceback.format_exc())
        return "Error in get_weather: " + str(e), 404



# //// Foursquare API ////

def get_venues(query):
    url = "https://api.foursquare.com/v3/places/search"

    params = {
        "query": query,
        "ll": "40.7831,-73.9712",  # Manhattan coordinates
        "open_now": "true",
        "sort": "DISTANCE"
    }

    headers = {
        "Accept": "application/json",
        "Authorization": "fsq3YJj6mpB8MvstI7T9B/Z74vyD/AuUXD48pI8OJbs7U70="
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        print(response.json())
        return response.json()

    except requests.exceptions.RequestException as e:
        print("Error occurred:", e)
        return None


# //// Ticketmaster API ////

def get_events_in_next_month():
    # Set your Ticketmaster API credentials
    api_key = "q62LGBfQCP3kg9gVyUlveTeq2BayJuLL"

    # Set the API endpoint URL
    url = "https://app.ticketmaster.com/discovery/v2/events.json"

    # Calculate the date range
    today = date.today()
    end_date = today + timedelta(days=30)

    # Set the query parameters
    params = {
        "apikey": api_key,
        "latlong": "40.7831,-73.9712",  # Manhattan coordinates (latitude, longitude)
        "radius": "5",  # Radius in miles around the specified coordinates
        "size": 200,  # Number of events per API response (maximum allowed)
        "page": 0,  # Start with the first page
    }

    event_data = []

    while True:
        # Send the API request
        response = requests.get(url, params=params)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the response JSON
            data = response.json()

            # Extract the events
            events = data["_embedded"]["events"]

            # Process each event
            for event in events:
                event_date = event["dates"]["start"]["localDate"]
                event_date_obj = date.fromisoformat(event_date)

                # Filter events that occur within the next month
                if today <= event_date_obj <= end_date:
                    event_name = event["name"]
                    event_time = event["dates"]["start"].get("localTime", "Time not available")
                    event_image = event["images"][0]["url"] if event["images"] else None
                    event_url = event["url"]

                    # Check if classification data is available
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

            # Increment the page number
            params["page"] += 1

            # Stop fetching events if the maximum limit is reached
            if len(event_data) >= 1000:
                break

        else:
            # API request failed
            break

    return event_data


def get_restaurant_coordinates():
    # Set the API endpoint URL
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"

    api_key ="AIzaSyDgYC8VXvS4UG9ApSUhS2v-ByddtHljFls"

    # Set the query parameters
    params = {
        "query": "restaurants in Manhattan, New York",
        "key": api_key
    }

    # Send the API request
    response = requests.get(url, params=params)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the response JSON
        data = response.json()

        # Extract the restaurant results
        results = data["results"]

        # Process each restaurant result
        restaurant_coordinates = []

        for result in results:
            name = result["name"]
            address = result["formatted_address"]
            location = result["geometry"]["location"]
            lat = location["lat"]
            lng = location["lng"]
            rating = result.get("rating")
            website = result.get("website")
            phone = result.get("formatted_phone_number")

            restaurant_coordinates.append({
                "name": name,
                "address": address,
                "latitude": lat,
                "longitude": lng,
                "rating": rating,
                "website": website,
                "phone": phone
            })

        return restaurant_coordinates

    else:
        return []
