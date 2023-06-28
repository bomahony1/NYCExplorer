import requests
import traceback
import json
from datetime import datetime
import time

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
