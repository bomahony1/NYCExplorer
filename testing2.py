import requests

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
        print(venues)
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
        print(venues)
        return venues
    except requests.exceptions.RequestException as e:
        print("Error in get_venues:", e)
        return None
    
get_venues_attractions()