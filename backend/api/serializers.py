# Job of serializer is to convert model instances to JSON so the frontend can work with the recieved data easily

from rest_framework import serializers
from .models import attractions

class attractionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = attractions
        fields = ('name', 'address')