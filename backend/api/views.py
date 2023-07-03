from rest_framework import generics, views
from rest_framework.response import Response
import requests
from .services import get_venues_restaurant, get_venues_hotels, get_weather, get_events

class WeatherAPIView(generics.GenericAPIView):
    def get(self, request, format=None):
        weather_data = get_weather()
        return Response(weather_data)

class RestaurantAPIView(generics.GenericAPIView):
    def get(self, request, format=None):
        restaurant_data = get_venues_restaurant()
        return Response(restaurant_data)

class HotelsAPIView(generics.GenericAPIView):
    def get(self, request, format=None):
        hotel_data = get_venues_hotels()
        return Response(hotel_data)

class EventsAPIView(views.APIView):
    def get(self, request, format=None):
        event_data = get_events()
        return Response(event_data)
       

