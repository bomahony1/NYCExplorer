import unittest  # Add this import
import json

from django.test import TestCase
from rest_framework.test import APIRequestFactory
from unittest.mock import patch
from api.views import GoogleRestaurantAPIView
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse 
from rest_framework import status 
from .models import Attraction, Hotel

class WeatherApiTestCase(APITestCase):
    def test_weather(self):
        response = self.client.get(reverse('api:weather'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ModelTestCase(TestCase):

    def setUp(self):
        self.attraction_data = {
            'place_id': '123abc',
            'name': 'Sample Attraction',
            'address': '123 Main St, City, Country',
            'latitude': 40.712776,
            'longitude': -74.005974,
            'rating': 4.5,
            'opening_hours': 'Monday-Friday: 9 AM - 6 PM',
            'photo_urls': ['url1', 'url2']
        }

        self.hotel_data = {
            'place_id': '456def',
            'name': 'Sample Hotel',
            'address': '456 Elm St, City, Country',
            'latitude': 34.052235,
            'longitude': -118.243683,
            'rating': 3.8,
            'photo_urls': ['url3', 'url4']
        }

    def test_attraction_creation(self):
        attraction = Attraction.objects.create(**self.attraction_data)
        self.assertEqual(attraction.place_id, '123abc')
        self.assertEqual(attraction.name, 'Sample Attraction')
        self.assertEqual(attraction.address, '123 Main St, City, Country')
        self.assertEqual(attraction.latitude, 40.712776)
        self.assertEqual(attraction.longitude, -74.005974)
        self.assertEqual(attraction.rating, 4.5)
        self.assertEqual(attraction.opening_hours, 'Monday-Friday: 9 AM - 6 PM')
        self.assertEqual(attraction.photo_urls, ['url1', 'url2'])

    def test_hotel_creation(self):
        hotel = Hotel.objects.create(**self.hotel_data)
        self.assertEqual(hotel.place_id, '456def')
        self.assertEqual(hotel.name, 'Sample Hotel')
        self.assertEqual(hotel.address, '456 Elm St, City, Country')
        self.assertEqual(hotel.latitude, 34.052235)
        self.assertEqual(hotel.longitude, -118.243683)
        self.assertEqual(hotel.rating, 3.8)
        self.assertEqual(hotel.photo_urls, ['url3', 'url4'])

    def test_model_str_representation(self):
        attraction = Attraction.objects.create(**self.attraction_data)
        hotel = Hotel.objects.create(**self.hotel_data)

        self.assertEqual(str(attraction), 'Sample Attraction')
        self.assertEqual(str(hotel), 'Sample Hotel')
   
