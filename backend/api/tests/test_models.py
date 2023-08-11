from django.test import TestCase
from api.models import Attraction, Hotel

class AttractionModelTest(TestCase):
    def setUp(self):
        self.attraction = Attraction.objects.create(
            place_id="abc123",
            name="Test Attraction",
            address="123 Test Street, City",
            latitude=40.7128,
            longitude=-74.0060,
            rating=4.5,
            opening_hours={"monday": "9 AM - 5 PM"},
            photos=["photo1.jpg", "photo2.jpg"]
        )

    def test_str_representation(self):
        self.assertEqual(str(self.attraction), "Test Attraction")
        print("Attraction model test passed")


class HotelModelTest(TestCase):
    def setUp(self):
        self.hotel = Hotel.objects.create(
            place_id="xyz789",
            name="Test Hotel",
            address="456 Test Avenue, City",
            latitude=40.7128,
            longitude=-74.0060,
            rating=3.8,
            photos=["photo3.jpg", "photo4.jpg"]
        )

    def test_str_representation(self):
        self.assertEqual(str(self.hotel), "Test Hotel")
        print("Hotel model test passed")

if __name__ == "__main__":
    import unittest
    unittest.main()
