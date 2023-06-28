import json
import mysql.connector

# Parse JSON hotel
with open("././data/hotels.json") as f:
    data = json.load(f)

# MySQL connection
cnx = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='Sd89Bn34',
    database='nyc_app_test'
)

cursor = cnx.cursor()

# Modify the CREATE TABLE statement if needed
create_table_query = """
CREATE TABLE IF NOT EXISTS hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NULL,
    latitude FLOAT NULL,
    longitude FLOAT NULL,
    phone VARCHAR(255) NULL,
    website VARCHAR(255) NULL
);
"""

cursor.execute(create_table_query)

hotels = data['elements']

# Iterate over the hotels and insert them into the table
for hotel in hotels:
    # Extract relevant values
    name = hotel['tags'].get('name', 'None')
    phone = hotel['tags'].get('phone', 'None')
    website = hotel['tags'].get('website', 'None')
    latitude = hotel.get('lat', 0.0)
    longitude = hotel.get('lon', 0.0)

    # SQL INSERT statement
    insert_query = """
    INSERT INTO hotels (name, latitude, longitude, phone, website)
    VALUES (%s, %s, %s, %s, %s)
    """

    # Execute the INSERT statement
    cursor.execute(insert_query, (name, latitude, longitude, phone, website))

# Commit the changes and close the connection
cnx.commit()
cursor.close()
cnx.close()
