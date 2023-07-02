from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from datetime import date, timedelta
import requests

from website.models import Hotels, Restaurants, Tourism
from .serializers import HotelSerializer, RestaurantSerializer, TourismSerializer
from .services import get_weather, get_venues, get_events_in_next_month, get_restaurant_coordinates





# Define custom pagination class
class CustomPagination(PageNumberPagination):
    page_size = 10  # Adjust the page size as per your needs
    page_size_query_param = 'page_size'
    max_page_size = 100

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotels.objects.all()
    serializer_class = HotelSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]

class TourismViewSet(viewsets.ModelViewSet):
    queryset = Tourism.objects.all()
    serializer_class = TourismSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]

class WeatherAPIView(generics.GenericAPIView):
    def get(self, request, format=None):
        weather_data = get_weather()
        return Response(weather_data)

class VenuesAPIView(generics.GenericAPIView):
    def get(self, request, format=None):
        query = self.request.GET.get('query', '')  # Get the query parameter from the request
        venues_data = get_venues(query)
        return Response(venues_data)
    
class RestaurantAPIView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        restaurant_data = get_restaurant_coordinates()
        return Response(restaurant_data)
    
class EventsAPIView(APIView):
    def get(self, request):
        # Set your Ticketmaster API credentials
        api_key = "q62LGBfQCP3kg9gVyUlveTeq2BayJuLL"

        # Set the API endpoint URL
        url = "https://app.ticketmaster.com/discovery/v2/events.json"

        # Set the query parameters
        params = {
            "apikey": api_key,
            "latlong": "40.7831,-73.9712",  # Manhattan coordinates (latitude, longitude)
            "radius": "10",  # Radius in miles around the specified coordinates
            "size": 20,  # Number of events per API response (maximum allowed)
            "genres": "Hockey",  # Filter for sports events
        }

        # Send the API request
        response = requests.get(url, params=params)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the response JSON
            data = response.json()

            # Extract the events
            events = data["_embedded"]["events"]

            event_data = []

            # Process each event
            for event in events:
                event_name = event["name"]
                event_date = event["dates"]["start"]["localDate"]
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

            return Response(event_data)

        else:
            return Response([])  # Return an empty list if the API request fails


    def get(self, request, format=None):
        events = get_events_in_next_month()
        return Response(events)

