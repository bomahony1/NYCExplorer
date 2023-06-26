import json
import mysql.connector

with open("././data/export.json") as f:
    data = json.load(f)

cnx = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='Sd89Bn34',
    database='nyc_app_test'
)

cursor = cnx.cursor()

# Create the table
create_table_query = """
CREATE TABLE IF NOT EXISTS restaurants (
    name VARCHAR(255),
    address VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    cocktails VARCHAR(255),
    cuisine VARCHAR(255),
    drink_beer VARCHAR(255),
    drink_wine VARCHAR(255),
    opening_hours VARCHAR(255),
    phone VARCHAR(255),
    website VARCHAR(255)
)
"""

cursor.execute(create_table_query)

restaurants = data['elements']

# Iterate over the elements and insert them into the table
for restaurant in restaurants:
    if 'tags' in restaurant and 'name' in restaurant['tags'] and 'lat' in restaurant and 'lon' in restaurant:
        restaurant_name = restaurant['tags']['name']
        latitude = restaurant['lat']
        longitude = restaurant['lon']
        address = restaurant['tags'].get('address', None)
        cocktails = restaurant['tags'].get('cocktails', None)
        cuisine = restaurant['tags'].get('cuisine', None)
        drink_beer = restaurant['tags'].get('drink:beer', None)
        drink_wine = restaurant['tags'].get('drink:wine', None)
        opening_hours = restaurant['tags'].get('opening_hours', None)
        phone = restaurant['tags'].get('phone', None)
        website = restaurant['tags'].get('website', None)

        # SQL INSERT statement
        insert_query = """
        INSERT INTO restaurants (name, latitude, longitude, address, cocktails, cuisine,
                                drink_beer, drink_wine, opening_hours, phone, website)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        # Execute the INSERT statement
        cursor.execute(insert_query, (restaurant_name, latitude, longitude, address,
                                      cocktails, cuisine, drink_beer, drink_wine,
                                      opening_hours, phone, website))

# Commit the changes and close the connection
cnx.commit()
cursor.close()
cnx.close()
