from django.urls import path
from django.contrib import admin
from django.views.generic import TemplateView

app_name = "website"

urlpatterns = [
    path("", TemplateView.as_view(template_name="website/index.html"))
]
