import requests
api_key = "AIzaSyDgYC8VXvS4UG9ApSUhS2v-ByddtHljFls"

def get_restaurant_coordinates(api_key):
    # Set the API endpoint URL
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"

    # Set the query parameters
    params = {
        "query": "hotels in Manhattan, New York",
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

            restaurant_coordinates.append({
                "name": name,
                "address": address,
                "latitude": lat,
                "longitude": lng
            })

        print(restaurant_coordinates)
        return restaurant_coordinates

    else:
        print("Fail")
        return []  # Return an empty list if the API request fails

get_restaurant_coordinates(api_key)