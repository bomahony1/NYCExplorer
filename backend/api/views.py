from django.shortcuts import render

from rest_framework import viewsets
from .serializers import attractionsSerializer
from .models import attractions

class attractionsView(viewsets.ModelViewSet):
    serializer_class = attractionsSerializer
    queryset = attractions.objects.all()

