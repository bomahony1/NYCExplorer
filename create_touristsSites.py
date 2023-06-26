import json
import mysql.connector

with open("././data/tourism.json") as f:
    data = json.load(f)

cnx = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='Sd89Bn34',
    database='nyc_app_test'
)

cursor = cnx.cursor()

# Modify the CREATE TABLE statement
create_table_query = """
CREATE TABLE IF NOT EXISTS tourism (
    name VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    tourism VARCHAR(255),
    phone VARCHAR(255),
    website VARCHAR(255)
)
"""

cursor.execute(create_table_query)

touristSites = data['elements']

# Iterate over the sites and insert them into the table
for site in touristSites:
    name = site['tags'].get('name', 'None')
    tourism = site['tags'].get('tourism', 'None')
    website = site['tags'].get('website', 'None')
    phone = site['tags'].get('phone', 'None')
    latitude = site.get('lat', 0.0)
    longitude = site.get('lon', 0.0)

    # SQL INSERT statement
    insert_query = """
    INSERT INTO tourism (name, latitude, longitude, tourism, phone, website)
    VALUES (%s, %s, %s, %s, %s, %s)
    """

    # Execute the INSERT statement
    cursor.execute(insert_query, (name, latitude, longitude, tourism, phone, website))


# Commit the changes and close the connection
cnx.commit()
cursor.close()
cnx.close()
