# api/apps.py
from django.apps import AppConfig

class MyAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    verbose_name = 'My App'

    def ready(self):
        # Import and register the custom management commands here
        from api.management.commands import import_data
