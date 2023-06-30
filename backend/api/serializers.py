from rest_framework import serializers
from website.models import Hotels, Restaurants, Tourism

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotels
        fields = ('name', 'latitude', 'longitude', 'phone', 'website')

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = ('name', 'latitude', 'longitude', 'cocktails', 'cuisine', 'drink_beer', 'drink_wine', 'opening_hours', 'phone', 'website')

class TourismSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tourism
        fields = ('name', 'latitude', 'longitude', 'tourism', 'phone', 'website')
