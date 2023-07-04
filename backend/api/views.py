from rest_framework import generics, views
from rest_framework.response import Response
from django.core.cache import cache
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
import requests
from .services import get_venues_restaurant, get_venues_hotels, get_weather, get_events, get_google_restaurants

class WeatherAPIView(generics.GenericAPIView):
    @method_decorator(cache_page(60 * 15))  # Cache the response for 15 minutes
    def get(self, request, format=None):
        weather_data = get_weather()
        return Response(weather_data)
    
class RestaurantAPIView(generics.GenericAPIView):
    @method_decorator(cache_page(60 * 15))  # Cache the response for 15 minutes
    def get(self, request, format=None):
        restaurant_data = get_venues_restaurant()
        return Response(restaurant_data)

class GoogleRestaurantAPIView(generics.ListAPIView):
    queryset = []  # Add your queryset here if you have one
    cache_key = 'google_restaurant_data'

    def get_queryset(self):
        # You can implement custom queryset logic here if needed
        return self.queryset

    def get(self, request, *args, **kwargs):
        # Check if the data is already cached
        cached_data = cache.get(self.cache_key)
        if cached_data is not None:
            return Response(cached_data)

        # If not cached, fetch the data and cache it
        google_restaurant_data = get_google_restaurants()
        cache.set(self.cache_key, google_restaurant_data, timeout=3600)  # Cache for 1 hour

        return Response(google_restaurant_data)


class HotelsAPIView(generics.GenericAPIView):
    @method_decorator(cache_page(60 * 15))  # Cache the response for 15 minutes
    def get(self, request, format=None):
        hotel_data = get_venues_hotels()
        return Response(hotel_data)

class EventsAPIView(views.APIView):
    @method_decorator(cache_page(60 * 15))  # Cache the response for 15 minutes
    def get(self, request, format=None):
        event_data = get_events()
        return Response(event_data)

