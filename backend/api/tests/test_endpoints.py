from rest_framework.test import APITestCase
from rest_framework import status


class GoogleHotelsAPITestCase(APITestCase):
    def test_get_google_hotels(self):
        # Endpoint
        url = "/api/googleHotels/"

        # Make a GET request to the endpoint
        response = self.client.get(url)

        # Assert the response status code is as expected (200 OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert the response media type is as expected
        self.assertEqual(response.accepted_media_type, "application/json")


        print("Google Hotels API test passed")

class GoogleAttractionsAPITestCase(APITestCase):
    def test_get_google_attractions(self):
        # Endpoint
        url = "/api/googleAttractions/"

        # Make a GET request to the endpoint
        response = self.client.get(url)

        # Assert the response status code is as expected (200 OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert the response media type is as expected
        self.assertEqual(response.accepted_media_type, "application/json")
       
        # Print a message indicating the test passed
        print("Google Attractions API test passed")

class GoogleRestaurantsAPITestCase(APITestCase):
    def test_get_google_restaurants(self):
        # Endpoint
        url = "/api/googleRestaurants/"

        response = self.client.get(url)

        # Assert the response status code is as expected (200 OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert the response media type is as expected
        self.assertEqual(response.accepted_media_type, "application/json")

        print("Google Restaurants API test passed")

class EventsAPITestCase(APITestCase):
    def test_get_events(self):
         # Endpoint
        url = "/api/events/"

        # Make a GET request to the endpoint
        response = self.client.get(url)

        # Assert the response status code is as expected (200 OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert the response media type is as expected
        self.assertEqual(response.accepted_media_type, "application/json")

        print("Events API test passed")

        # Print an error message if the test fails
        if response.status_code != status.HTTP_200_OK:
            print("Events API test failed!")
        

class PredictionAPITestCase(APITestCase):
    def test_get_prediction(self):
        # Endpoint
        url = "/api/predict/?hour=5&day=8&month=8&latitude=40.748&longitude=-73.9857"

        # Make a GET request to the endpoint
        response = self.client.get(url)

        # Assert the response status code is as expected (200 OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert the response media type is as expected
        self.assertEqual(response.accepted_media_type, "application/json")

        # Print a message indicating the test passed
        print("Prediction API test passed")

        # Print an error message if the test fails
        if response.status_code != status.HTTP_200_OK:
            print("Prediction API test failed!")

class HeatMapAPITestCase(APITestCase):
    def test_get_heat_map(self):
         # Endpoint
        url = "/api/heatMap/?hour=5&day=8&month=8"

        response = self.client.get(url)

        # Assert the response status code is as expected (200 OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert the response media type is as expected
        self.assertEqual(response.accepted_media_type, "application/json")

        print("Heat Map API test passed")

        # Print an error message if the test fails
        if response.status_code != status.HTTP_200_OK:
            print("Heat Map API test failed!")
    


if __name__ == "__main__":
    import unittest
    unittest.main()





