try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        venues = response.json()
        print(venues)
        return venues
    except requests.exceptions.RequestException as e:
        print("Error in get_venues:", e)
        return None

get_venues()