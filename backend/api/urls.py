from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import HotelViewSet, RestaurantViewSet, TourismViewSet, WeatherAPIView, VenuesAPIView, EventsAPIView, RestaurantAPIView

app_name = "api"

router = DefaultRouter()
router.register(r'hotels', HotelViewSet)
router.register(r'restaurants', RestaurantViewSet)
router.register(r'tourism', TourismViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('venues/', VenuesAPIView.as_view(), name='venues'),
    path('weather/', WeatherAPIView.as_view(), name='weather'),
    path('events/', EventsAPIView.as_view(), name='event-list'),
    path('rest/', RestaurantAPIView.as_view(), name='restaurant_coordinates'),
]
