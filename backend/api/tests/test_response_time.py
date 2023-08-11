from django.urls import reverse
from rest_framework.test import APITestCase
import time

class TestResponseTime(APITestCase):
    def test_response_time_google_attractions(self):
        url = reverse('api:google-attractions-list')  # Use the correct URL pattern name
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        # Measure response time
        start_time = time.time()
        response = self.client.get(url)
        end_time = time.time()

        response_time = end_time - start_time
        print(f"Response time for Google Attractions: {response_time:.4f} seconds")

        # Add your assertions as needed
        self.assertTrue(response_time < 1.0)  # Example assertion
        print("Response time test for Google Attractions passed")

    def test_response_time_google_hotels(self):
        url = reverse('api:google-hotels-list')  # Use the correct URL pattern name
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        # Measure response time
        start_time = time.time()
        response = self.client.get(url)
        end_time = time.time()

        response_time = end_time - start_time
        print(f"Response time for Google Hotels: {response_time:.4f} seconds")

        # Add your assertions as needed
        self.assertTrue(response_time < 1.0)  # Example assertion
        print("Response time test for Google Hotels passed")

    def test_response_time_google_restaurants(self):
        url = reverse('api:google-restaurants')  # Use the correct URL pattern name
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        # Measure response time
        start_time = time.time()
        response = self.client.get(url)
        end_time = time.time()

        response_time = end_time - start_time
        print(f"Response time for Google Restaurants: {response_time:.4f} seconds")

        # Add your assertions as needed
        self.assertTrue(response_time < 1.0)  # Example assertion
        print("Response time test for Google Restaurants passed")

    def test_response_time_events(self):
        url = reverse('api:events')  # Use the correct URL pattern name
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        # Measure response time
        start_time = time.time()
        response = self.client.get(url)
        end_time = time.time()

        response_time = end_time - start_time
        print(f"Response time for Events: {response_time:.4f} seconds")

        # Add your assertions as needed
        self.assertTrue(response_time < 1.0)  # Example assertion
        print("Response time test for Events passed")

    def test_response_time_weather(self):
        url = reverse('api:weather')  # Use the correct URL pattern name
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        # Measure response time
        start_time = time.time()
        response = self.client.get(url)
        end_time = time.time()

        response_time = end_time - start_time
        print(f"Response time for Weather: {response_time:.4f} seconds")

        # Add your assertions as needed
        self.assertTrue(response_time < 1.0)  # Example assertion
        print("Response time test for Weather passed")
    
    def test_response_time_predict(self):
        url = "/api/predict/?hour=5&day=8&month=8&latitude=40.748&longitude=-73.9857"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        # Measure response time
        start_time = time.time()
        response = self.client.get(url)
        end_time = time.time()

        response_time = end_time - start_time
        print(f"Response time for Predict: {response_time:.4f} seconds")

        # Add your assertions as needed
        self.assertTrue(response_time < 1.0)  # Example assertion
        print("Response time test for Predict passed")
    
    def test_response_time_heat_map(self):
        url = "/api/heatMap/?hour=5&day=8&month=8"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        # Measure response time
        start_time = time.time()
        response = self.client.get(url)
        end_time = time.time()

        response_time = end_time - start_time
        print(f"Response time for Heat Map: {response_time:.4f} seconds")

        # Add your assertions as needed
        self.assertTrue(response_time < 1.0)  # Example assertion
        print("Response time test for Heat Map passed")
