from rest_framework import generics, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from website.models import Hotels, Restaurants, Tourism
from .serializers import HotelSerializer, RestaurantSerializer, TourismSerializer
from .services import get_weather

# Create your views here.
class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotels.objects.all()
    serializer_class = HotelSerializer

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantSerializer

class TourismViewSet(viewsets.ModelViewSet):
    queryset = Tourism.objects.all()
    serializer_class = TourismSerializer

@api_view(['GET'])
def weather_api_view(request):
    weather_data = get_weather()
    return Response(weather_data)