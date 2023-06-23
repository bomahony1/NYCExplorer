from django.contrib import admin
from .models import attractions

# Test to see the CRUD operations work

class attractionsAdmin(admin.ModelAdmin):
    list_display = ("name", "address")

# Register Model

admin.site.register(attractions, attractionsAdmin)
