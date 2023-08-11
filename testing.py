import time 
import requests

def get_google_attractions():
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    details_url = "https://maps.googleapis.com/maps/api/place/details/json"
    api_key = "AIzaSyBRYIfKjAvimx8V1gihtKnCaMRKPDOCm1w"
    params = {
        "query": "tourist attractions in Manhattan, New York",
        "key": api_key,
        "fields": "place_id,name,formatted_address,geometry/location,rating,photos,opening_hours"
    }
    attraction_data = []

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
                photos = result.get("photos")

                # Make a separate API call to get details
                details_params = {
                    "place_id": place_id,
                    "fields": "opening_hours",
                    "key": api_key
                }
                details_response = requests.get(details_url, params=details_params)
                details_response.raise_for_status()
                details_data = details_response.json()

                # Get the opening hours if available, or an empty list if not present
                # Get the opening hours if available, or an empty list if not present
                opening_hours = details_data.get("result")

                photo_urls = []
                if photos:
                    for photo in photos:
                        photo_reference = photo.get("photo_reference")
                        photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={api_key}"
                        photo_urls.append(photo_url)

                attraction_data.append({
                    "place_id": place_id,
                    "name": name,
                    "address": address,
                    "latitude": lat,
                    "longitude": lng,
                    "rating": rating,
                    "photos": photo_urls,
                    "opening_hours": opening_hours
                })

            if "next_page_token" not in data:
                break

            params["pagetoken"] = data["next_page_token"]
            time.sleep(2)  # Delay between API calls as per Google's guidelines

    except requests.exceptions.RequestException as e:
        print("Error in get_google_attractions:", e)
    print(attraction_data)
    return attraction_data

get_google_attractions()