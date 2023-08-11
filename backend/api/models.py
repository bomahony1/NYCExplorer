from django.db import models

# Create your models here.

class Attraction(models.Model):
    place_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    rating = models.FloatField(null=True, blank=True)
    opening_hours = models.JSONField(null=True, blank=True)
    photos = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name

class Hotel(models.Model):
    place_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    rating = models.FloatField(null=True, blank=True)
    photos = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name