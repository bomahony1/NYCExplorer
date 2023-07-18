import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button, Box, Link } from "@mui/material";
import "./Itinerary.css";


function AttractionNames({ attractions, onAdd }) {
  return (
    <div className="attraction-names">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {attractions.map((attraction, index) => (
          <Link
            key={index}
            style={{ color: "white", fontSize: "16px" }}
            onClick={() => onAdd(attraction.name, attraction.address, attraction.photos[0])}
          >
            {attraction.name}
          </Link>
        ))}
      </Box>
    </div>
  );
}

function RestaurantNames({ restaurants, onAdd }) {
  return (
    <div className="restaurant-names">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {restaurants.map((restaurant, index) => (
          <div key={index}>
            <Link
              style={{ color: "white", fontSize: "16px" }}
              onClick={() => onAdd(restaurant.name, restaurant.address, null, restaurant.rating, "restaurants")}
            >
              {restaurant.name}
            </Link>
          </div>
        ))}
      </Box>
    </div>
  );
}

function HotelNames({ hotels, onAdd }) {
  return (
    <div className="hotel-names">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {hotels.map((hotel, index) => (
          <Link
            key={index}
            style={{ color: "white", fontSize: "16px" }}
            onClick={() => onAdd(hotel.name, hotel.address)}
          >
            {hotel.name}
          </Link>
        ))}
      </Box>
    </div>
  );
}

function ItineraryPage() {
  const { scrollYProgress } = useScroll();
  const [attractions, setAttractions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("attractions");
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/googleAttractions/")
      .then((response) => response.json())
      .then((data) => {
        const newAttractions = data.map((attraction) => ({
          name: attraction.name,
          address: attraction.address,
          latitude: attraction.latitude,
          longitude: attraction.longitude,
          rating: attraction.rating,
          photos: attraction.photos,
        }));
        setAttractions(newAttractions);
      })
      .catch((error) => {
        console.error(error);
        setAttractions([]);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/googleRestaurants/")
      .then((response) => response.json())
      .then((data) => {
        const newRestaurants = data.map((restaurant) => ({
          name: restaurant.name,
          address: restaurant.address,
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
          rating: restaurant.rating,
        }));
        setRestaurants(newRestaurants);
      })
      .catch((error) => {
        console.error(error);
        setRestaurants([]);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hotels/")
      .then((response) => response.json())
      .then((data) => {
        const hotelData = data.results.map((result) => ({
          name: result.name,
          address: result.location.address,
          latitude: result.location.latitude,
          longitude: result.location.longitude,
          rating: result.rating,
        }));
        setHotels(hotelData);
      })
      .catch((error) => {
        console.error(error);
        setHotels([]);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const [items, setItems] = useState([]);

  const addItem = (name, address, photo, rating, category) => {
    const newItem = { id: Date.now(), name, address, photo, rating, category };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="itinerary-page" style={{ backgroundColor: "#1C2541", color: "#fafafa" }}>
      <h2>Customize your own itinerary</h2>
      <h4>Creating Your Perfect Itinerary: Exploring Attractions, Hotels, and Restaurants.</h4>
      <div style={{ display: "flex", margin: "20px", padding:"10px" }}>
        <p>
          Planning a trip to a new city can be an exciting yet challenging endeavor. The task of creating an itinerary
          that encompasses all the must-visit attractions, best dining experiences, and comfortable accommodation options
          may seem daunting.
          <br /> <br />
          However, with our user-friendly itinerary tool, crafting your perfect travel plan has never been easier. Our
          platform provides you with a comprehensive list of attractions, hotels, and restaurants in your destination
          city. By simply clicking on the options below, you can curate a personalized itinerary tailored to your
          preferences and interests.
        </p>
      </div>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div className="info-box">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <button
                style={{ backgroundColor: "#fafafa", color: "#1C2541", margin: "10px" }}
                onClick={() => handleCategoryChange("attractions")}
                disabled={selectedCategory === "attractions"}
                className="btn-itin"
              >
                Attractions
              </button>
              <button
                style={{ backgroundColor: "#fafafa", color: "#1C2541", margin: "10px" }}
                onClick={() => handleCategoryChange("restaurants")}
                disabled={selectedCategory === "restaurants"}
                className="btn-itin"
              >
                Restaurants
              </button>
              <button
                style={{ backgroundColor: "#fafafa", color: "#1C2541", margin: "10px" }}
                onClick={() => handleCategoryChange("hotels")}
                disabled={selectedCategory === "hotels"}
                className="btn-itin"
              >
                Hotels
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
              {selectedCategory === "attractions" && (
                <AttractionNames attractions={attractions} onAdd={addItem} />
              )}
              {selectedCategory === "restaurants" && (
                <RestaurantNames restaurants={restaurants} onAdd={addItem} />
              )}
              {selectedCategory === "hotels" && <HotelNames hotels={hotels} onAdd={addItem} />}
            </div>
          </div>
        </div>
        <article>
          <motion.div className="progress" style={{ scaleX }} />
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
            exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
            style={{ originX: true ? 0 : 1 }}
            className="privacy-screen"
          />
        </article>
      </div>

      <div className="bottom-itin" style={{ backgroundColor: "#1C2541", color: "#fafafa" }}>
  <h2>Create an Itinerary</h2>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      gap: "20px",
      overflow: "auto",
      maxHeight: "400px",
      margin: "5px",
    }}
  >
    {items.map((item) => (
      <div key={item.id} style={{ display: "grid", gap: "10px" }}>
        <div>
          <b>{item.name}</b>
          <br />
          Address: {item.address}
          <br />
          {["attractions", "restaurants"].includes(item.category) && (
            <span>Rating: {item.rating}</span>
          )}
        </div>
        <div>
          {item.category !== "hotels" && item.photo && (
            <img src={item.photo} alt={item.name} style={{ width: "300px", height: "200px" }} />
          )}
          <br />
          <button
            style={{ backgroundColor: "#fafafa", color: "#1C2541", marginTop: "10px" }}
            onClick={() => removeItem(item.id)}
            className="btn-itin"
          >
            Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
}

export default ItineraryPage;