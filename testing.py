import requests
import time


def get_google_restaurants():
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    api_key = "AIzaSyDgYC8VXvS4UG9ApSUhS2v-ByddtHljFls"
    params = {
        "query": "restaurants in Manhattan, New York",
        "key": api_key,
        "fields": "place_id,name,formatted_address,geometry/location,rating,photos,opening_hours"
    }
    restaurant_data = []

    try:
        while True:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            results = data["results"]

            for result in results:
                place_id = result["place_id"]  # Add place ID
                name = result["name"]
                address = result["formatted_address"]
                location = result["geometry"]["location"]
                lat = location["lat"]
                lng = location["lng"]
                rating = result.get("rating")
                photos = result.get("photos", [])

                photo_urls = []
                for photo in photos:
                    photo_reference = photo.get("photo_reference")
                    photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={api_key}"
                    photo_urls.append(photo_url)

                # Fetch opening hours separately using place details API
                details_url = "https://maps.googleapis.com/maps/api/place/details/json"
                details_params = {
                    "place_id": place_id,
                    "key": api_key,
                    "fields": "opening_hours"
                }

                details_response = requests.get(details_url, params=details_params)
                details_response.raise_for_status()
                details_data = details_response.json()
                opening_hours = details_data.get("result", {}).get("opening_hours", {}).get("weekday_text", [])

                # Clean up opening hours
                cleaned_opening_hours = []
                for day_hours in opening_hours:
                    day, hours = day_hours.split(": ", 1)
                    cleaned_opening_hours.append(f"{day}: {hours}")

                restaurant_data.append({
                    "place_id": place_id,
                    "name": name,
                    "address": address,
                    "latitude": lat,
                    "longitude": lng,
                    "rating": rating,
                    "photos": photo_urls,
                    "opening_hours": cleaned_opening_hours
                })

            if "next_page_token" not in data:
                break

            params["pagetoken"] = data["next_page_token"]
            time.sleep(2)  # Delay between API calls as per Google's guidelines

    except requests.exceptions.RequestException as e:
        print("Error in get_google_restaurants:", e)
    print(restaurant_data)
    return restaurant_data

get_google_restaurants()