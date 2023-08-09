from rest_framework import generics, views, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
import requests
import json
from .services import (
    get_weather,
    get_events,
    get_google_restaurants,
    get_predictions,
    get_heat_map,
)
from .models import Attraction, Hotel
from .serializers import AttractionSerializer, HotelSerializer

class CachedAPIView(views.APIView):
    cache_timeout = 15 * 60  # 15 minutes cache time

    def get_cached_data(self, cache_key):
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            return Response(cached_data)
        return None

    def cache_data(self, cache_key, data, timeout):
        cache.set(cache_key, data, timeout=timeout)
        return Response(data)

class WeatherAPIView(CachedAPIView):
    def get(self, request, format=None):
        weather_data = self.get_cached_data('weather_data')
        if weather_data is not None:
            return weather_data

        weather_data = get_weather()
        return self.cache_data('weather_data', weather_data, self.cache_timeout)

class GoogleDataAPIView(CachedAPIView):
    def get(self, request, *args, **kwargs):
        cache_key = self.get_cache_key()
        cached_data = self.get_cached_data(cache_key)
        if cached_data is not None:
            return cached_data

        data = self.get_data()
        return self.cache_data(cache_key, data, self.cache_timeout)

    def get_cache_key(self):
        raise NotImplementedError("Subclasses must provide cache key logic.")

    def get_data(self):
        raise NotImplementedError("Subclasses must provide data retrieval logic.")

class GoogleRestaurantAPIView(GoogleDataAPIView):
    def get_cache_key(self):
        return 'google_restaurant_data'

    def get_data(self):
        return get_google_restaurants()

class AttractionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer

class HotelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class EventsAPIView(CachedAPIView):
    def get(self, request, format=None):
        event_data = self.get_cached_data('event_data')
        if event_data is not None:
            return event_data

        event_data = get_events()
        return self.cache_data('event_data', event_data, self.cache_timeout)

class PredictionAPIView(APIView):
    def get(self, request):
        hour, day, month, latitude, longitude = self.extract_params(request)

        if None in (hour, day, month, latitude, longitude):
            return Response({'error': 'Invalid parameter values'}, status=400)

        prediction = get_predictions(hour, day, month, latitude, longitude)
        return Response({'prediction': prediction}, status=200)

    def extract_params(self, request):
        hour = self.parse_int(request.query_params.get('hour'))
        day = self.parse_int(request.query_params.get('day'))
        month = self.parse_int(request.query_params.get('month'))
        latitude = self.parse_float(request.query_params.get('latitude'))
        longitude = self.parse_float(request.query_params.get('longitude'))
        return hour, day, month, latitude, longitude

    def parse_int(self, value):
        try:
            return int(value)
        except (ValueError, TypeError):
            return None

    def parse_float(self, value):
        try:
            return float(value)
        except (ValueError, TypeError):
            return None

class HeatMapAPIView(APIView):
    def get(self, request):
        hour, day, month = self.extract_params(request)

        if None in (hour, day, month):
            return Response({'error': 'Invalid parameter values'}, status=400)

        heat_map = get_heat_map(hour, day, month)
        return Response({'heat_map': heat_map}, status=200)

    def extract_params(self, request):
        hour = self.parse_int(request.query_params.get('hour'))
        day = self.parse_int(request.query_params.get('day'))
        month = self.parse_int(request.query_params.get('month'))
        return hour, day, month

    def parse_int(self, value):
        try:
            return int(value)
        except (ValueError, TypeError):
            return None
