import requests
from datetime import date, timedelta

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
    "radius": "10",  # Radius in miles around the specified coordinates
    "size": 20,  # Number of events per API response (maximum allowed)
}

# Send the initial API request
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
                event_genres = event["classifications"][0]["genre"]["name"]
            else:
                event_genres = None

            print(f"Event: {event_name}")
            print(f"Date: {event_date}")
            print(f"Time: {event_time}")
            print(f"Image: {event_image}")
            print(f"URL: {event_url}")
            print(f"Genres: {event_genres}")
            print("--------------------")

    # Pagination
    total_events = data["page"]["totalElements"]
    current_size = data["page"]["size"]
    current_page = data["page"]["number"]
    remaining_events = total_events - current_size

    # Fetch remaining events if available
    while remaining_events > 0:
        current_page += 1
        params["page"] = current_page
        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            events = data["_embedded"]["events"]

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
                        event_genres = event["classifications"][0]["genre"]["name"]
                    else:
                        event_genres = None

                    print(f"Event: {event_name}")
                    print(f"Date: {event_date}")
                    print(f"Time: {event_time}")
                    print(f"Image: {event_image}")
                    print(f"URL: {event_url}")
                    print(f"Genres: {event_genres}")
                    print("--------------------")

            current_size = data["page"]["size"]
            remaining_events -= current_size
        else:
            print("Failed to retrieve events. Please check your API key or try again later.")

else:
    print("Failed to retrieve events. Please check your API key or try again later.")
