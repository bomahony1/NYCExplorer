from rest_framework import generics, views
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
import requests
from .services import get_foursquare_restaurants, get_foursquare_hotels, get_weather, get_events, get_google_restaurants, get_google_attractions, get_google_hotels, get_predictions

class WeatherAPIView(generics.GenericAPIView):
    @method_decorator(cache_page(60 * 15))  # Cache the response for 15 minutes
    def get(self, request, format=None):
        weather_data = get_weather()
        return Response(weather_data)

class RestaurantAPIView(APIView):
    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
    def get(self, request, format=None):
        restaurant_data = get_foursquare_restaurants()
        if restaurant_data:
            return Response(restaurant_data)
        else:
            return Response({"error": "An error occurred while fetching restaurant data."}, status=500)

class HotelsAPIView(APIView):
    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
    def get(self, request, format=None):
        hotel_data = get_foursquare_hotels()
        if hotel_data:
            return Response(hotel_data)
        else:
            return Response({"error": "An error occurred while fetching hotel data."}, status=500)


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

class GoogleHotelsAPIView(generics.ListAPIView):
    queryset = []  # Add your queryset here if you have one
    cache_key = 'google_hotel_data'

    def get_queryset(self):
        # You can implement custom queryset logic here if needed
        return self.queryset

    def get(self, request, *args, **kwargs):
        # Check if the data is already cached
        cached_data = cache.get(self.cache_key)
        if cached_data is not None:
            return Response(cached_data)

        # If not cached, fetch the data and cache it
        google_hotel_data = get_google_hotels()
        cache.set(self.cache_key, google_hotel_data, timeout=3600)  # Cache for 1 hour

        return Response(google_hotel_data)

class GoogleAttractionsAPIView(generics.ListAPIView):
    queryset = []  # Add your queryset here if you have one
    cache_key = 'google_attraction_data'

    def get_queryset(self):
        return self.queryset

    def get(self, request, *args, **kwargs):
        cached_data = cache.get(self.cache_key)
        if cached_data is not None:
            return Response(cached_data)

        google_attraction_data = get_google_attractions()
        cache.set(self.cache_key, google_attraction_data, timeout=3600)  # Cache for 1 hour

        return Response(google_attraction_data)


class EventsAPIView(views.APIView):
    # @method_decorator(cache_page(60 * 15))  # Cache the response for 15 minutes
    def get(self, request, format=None):
        event_data = get_events()
        return Response(event_data)


class PredictionAPIView(APIView):
    def get(self, request):
        hour = request.query_params.get('hour')
        day = request.query_params.get('day')
        month = request.query_params.get('month')
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')
        
        try:
            hour = int(hour)
            day = int(day)
            month = int(month)
            latitude = float(latitude)
            longitude = float(longitude)
        except (ValueError, TypeError):
            return Response({'error': 'Invalid parameter values'}, status=400)
        
        prediction = get_predictions(hour, day, month, latitude, longitude)
        return Response({'prediction': prediction}, status=200)