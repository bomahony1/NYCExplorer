from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import WeatherAPIView, EventsAPIView, RestaurantAPIView, GoogleRestaurantAPIView, GoogleHotelsAPIView,GoogleAttractionsAPIView, HotelsAPIView, PredictionAPIView, HeatMapAPIView

app_name = "api"

urlpatterns = [
    path('googleRestaurants/', GoogleRestaurantAPIView.as_view(), name='events'),
    path('googleHotels/', GoogleHotelsAPIView.as_view(), name='events'),
    path('googleAttractions/', GoogleAttractionsAPIView.as_view(), name='events'),
    path('restaurants/', RestaurantAPIView.as_view(), name='events'),
    path('hotels/', HotelsAPIView.as_view(), name='events'),
    path('events/', EventsAPIView.as_view(), name='events'),
    path('weather/', WeatherAPIView.as_view(), name='weather'),
    path('predict/', PredictionAPIView.as_view(), name='predict'),
    path('heatMap/', HeatMapAPIView.as_view(), name='predict'),
]
