from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import HotelViewSet, RestaurantViewSet, TourismViewSet, weather_api_view

app_name = "api"

router = DefaultRouter()
router.register(r'hotels', HotelViewSet)
router.register(r'restaurants', RestaurantViewSet)
router.register(r'tourism', TourismViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('weather/', weather_api_view, name='weather'),
]
