# Generated by Django 4.2.2 on 2023-06-26 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0004_alter_hotels_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotels',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
