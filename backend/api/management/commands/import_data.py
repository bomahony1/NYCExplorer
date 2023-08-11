from django.core.management.base import BaseCommand
from django.db import IntegrityError
from api.models import Hotel, Attraction
from api.services import get_google_hotels, get_google_attractions

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        self.stdout.write("Importing hotel data from Google Places API...")
        hotel_data = get_google_hotels()

        # Delete all existing Hotel records
        Hotel.objects.all().delete()

        # Insert new Hotel records
        new_hotels = [
            Hotel(
                place_id=data["place_id"],
                name=data["name"],
                address=data["address"],
                latitude=data["latitude"],
                longitude=data["longitude"],
                rating=data["rating"],
                photos=data["photos"]
            )
            for data in hotel_data
        ]

        self.stdout.write("Importing Attraction data from Google Places API...")
        attraction_data = get_google_attractions()
        Attraction.objects.all().delete()

      
        # Insert new Attraction records
        new_attractions = [
            Attraction(
                place_id=data["place_id"],
                name=data["name"],
                address=data["address"],
                latitude=data["latitude"],
                longitude=data["longitude"],
                rating=data["rating"],
                opening_hours = data["opening_hours"],
                photos=data["photos"]
            )
            for data in attraction_data
        ]

        Hotel.objects.bulk_create(new_hotels)
        Attraction.objects.bulk_create(new_attractions)

        self.stdout.write(self.style.SUCCESS("Successfully imported and replaced all data."))
