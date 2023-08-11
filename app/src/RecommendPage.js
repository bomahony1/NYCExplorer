// import React, { useState, useEffect } from "react";
// import { motion, useScroll, useSpring } from "framer-motion";
// import { Button, Box, Link } from "@mui/material";
// import "./Itinerary.css";


// function AttractionNames({ attractions, onAdd }) {
//   return (
//     <div className="attraction-names">
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//         {attractions.map((attraction, index) => (
//           <Link
//             key={index}
//             style={{ color: "white", fontSize: "16px" }}
//             onClick={() => onAdd(attraction.name, attraction.address, attraction.photos[0])}
//           >
//             {attraction.name}
//           </Link>
//         ))}
//       </Box>
//     </div>
//   );
// }

// function RestaurantNames({ restaurants, onAdd }) {
//   return (
//     <div className="restaurant-names">
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//         {restaurants.map((restaurant, index) => (
//           <div key={index}>
//             <Link
//               style={{ color: "white", fontSize: "16px" }}
//               onClick={() => onAdd(restaurant.name, restaurant.address, null, restaurant.rating, "restaurants")}
//             >
//               {restaurant.name}
//             </Link>
//           </div>
//         ))}
//       </Box>
//     </div>
//   );
// }

// function HotelNames({ hotels, onAdd }) {
//   return (
//     <div className="hotel-names">
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//         {hotels.map((hotel, index) => (
//           <Link
//             key={index}
//             style={{ color: "white", fontSize: "16px" }}
//             onClick={() => onAdd(hotel.name, hotel.address)}
//           >
//             {hotel.name}
//           </Link>
//         ))}
//       </Box>
//     </div>
//   );
// }

// function ItineraryPage() {
//   const { scrollYProgress } = useScroll();
//   const [attractions, setAttractions] = useState([]);
//   const [restaurants, setRestaurants] = useState([]);
//   const [hotels, setHotels] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("attractions");
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 200,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/googleAttractions/")
//       .then((response) => response.json())
//       .then((data) => {
//         const newAttractions = data.map((attraction) => ({
//           name: attraction.name,
//           address: attraction.address,
//           latitude: attraction.latitude,
//           longitude: attraction.longitude,
//           rating: attraction.rating,
//           photos: attraction.photos,
//         }));
//         setAttractions(newAttractions);
//       })
//       .catch((error) => {
//         console.error(error);
//         setAttractions([]);
//       });
//   }, []);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/googleRestaurants/")
//       .then((response) => response.json())
//       .then((data) => {
//         const newRestaurants = data.map((restaurant) => ({
//           name: restaurant.name,
//           address: restaurant.address,
//           latitude: restaurant.latitude,
//           longitude: restaurant.longitude,
//           rating: restaurant.rating,
//         }));
//         setRestaurants(newRestaurants);
//       })
//       .catch((error) => {
//         console.error(error);
//         setRestaurants([]);
//       });
//   }, []);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/hotels/")
//       .then((response) => response.json())
//       .then((data) => {
//         const hotelData = data.results.map((result) => ({
//           name: result.name,
//           address: result.location.address,
//           latitude: result.location.latitude,
//           longitude: result.location.longitude,
//           rating: result.rating,
//         }));
//         setHotels(hotelData);
//       })
//       .catch((error) => {
//         console.error(error);
//         setHotels([]);
//       });
//   }, []);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const [items, setItems] = useState([]);

//   const addItem = (name, address, photo, rating, category) => {
//     const newItem = { id: Date.now(), name, address, photo, rating, category };
//     setItems((prevItems) => [...prevItems, newItem]);
//   };

//   const removeItem = (id) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="itinerary-page" style={{ backgroundColor: "#1C2541", color: "#fafafa" }}>
//       <h2>Customize your own itinerary</h2>
//       <h4>Creating Your Perfect Itinerary: Exploring Attractions, Hotels, and Restaurants.</h4>
//       <div style={{ display: "flex", margin: "20px", padding:"10px" }}>
//         <p>
//           Planning a trip to a new city can be an exciting yet challenging endeavor. The task of creating an itinerary
//           that encompasses all the must-visit attractions, best dining experiences, and comfortable accommodation options
//           may seem daunting.
//           <br /> <br />
//           However, with our user-friendly itinerary tool, crafting your perfect travel plan has never been easier. Our
//           platform provides you with a comprehensive list of attractions, hotels, and restaurants in your destination
//           city. By simply clicking on the options below, you can curate a personalized itinerary tailored to your
//           preferences and interests.
//         </p>
//       </div>
//       <div style={{ display: "flex", marginBottom: "20px" }}>
//         <div className="info-box">
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
//               <button
//                 style={{ backgroundColor: "#fafafa", color: "#1C2541", margin: "10px" }}
//                 onClick={() => handleCategoryChange("attractions")}
//                 disabled={selectedCategory === "attractions"}
//                 className="btn-itin"
//               >
//                 Attractions
//               </button>
//               <button
//                 style={{ backgroundColor: "#fafafa", color: "#1C2541", margin: "10px" }}
//                 onClick={() => handleCategoryChange("restaurants")}
//                 disabled={selectedCategory === "restaurants"}
//                 className="btn-itin"
//               >
//                 Restaurants
//               </button>
//               <button
//                 style={{ backgroundColor: "#fafafa", color: "#1C2541", margin: "10px" }}
//                 onClick={() => handleCategoryChange("hotels")}
//                 disabled={selectedCategory === "hotels"}
//                 className="btn-itin"
//               >
//                 Hotels
//               </button>
//             </div>
//             <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
//               {selectedCategory === "attractions" && (
//                 <AttractionNames attractions={attractions} onAdd={addItem} />
//               )}
//               {selectedCategory === "restaurants" && (
//                 <RestaurantNames restaurants={restaurants} onAdd={addItem} />
//               )}
//               {selectedCategory === "hotels" && <HotelNames hotels={hotels} onAdd={addItem} />}
//             </div>
//           </div>
//         </div>
//         <article>
//           <motion.div className="progress" style={{ scaleX }} />
//           <motion.div
//             initial={{ scaleX: 1 }}
//             animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
//             exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
//             style={{ originX: true ? 0 : 1 }}
//             className="privacy-screen"
//           />
//         </article>
//       </div>

//       <div className="bottom-itin" style={{ backgroundColor: "#1C2541", color: "#fafafa" }}>
//   <h2>Create an Itinerary</h2>
//   <div
//     style={{
//       display: "grid",
//       gridTemplateColumns: `repeat(${items.length}, 1fr)`,
//       gap: "20px",
//       overflow: "auto",
//       maxHeight: "400px",
//       margin: "5px",
//     }}
//   >
//     {items.map((item) => (
//       <div key={item.id} style={{ display: "grid", gap: "10px" }}>
//         <div>
//           <b>{item.name}</b>
//           <br />
//           Address: {item.address}
//           <br />
//           {["attractions", "restaurants"].includes(item.category) && (
//             <span>Rating: {item.rating}</span>
//           )}
//         </div>
//         <div>
//           {item.category !== "hotels" && item.photo && (
//             <img src={item.photo} alt={item.name} style={{ width: "300px", height: "200px" }} />
//           )}
//           <br />
//           <button
//             style={{ backgroundColor: "#fafafa", color: "#1C2541", marginTop: "10px" }}
//             onClick={() => removeItem(item.id)}
//             className="btn-itin"
//           >
//             Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <hr />
//       </div>
//     </div>
//   );
// }

// export default ItineraryPage;


import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll,  useTransform} from "framer-motion";
import { Button, Box, ButtonGroup,Link } from "@mui/material";
import "./RecommendPage.css"
import { removeItem } from "./array.js";
import {  useNavigate } from 'react-router-dom';





function Gallery({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <svg id="progress" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength={pathLength}
          className="indicator"
        />
      </svg>
      <ul ref={ref} style={{ width: "100%" }}>
        {items.map((item) => (
          <div key={item.id}>
            <li style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px" }}>{item.text}</li>
            <img src={`/${item.id}.png`} alt={item.imageAlt} style={{ width: "100%", height: "auto" }} />
          </div>
        ))}
      </ul>
    </>
  );
}

//  photos from https://www.sightseeingpass.com
function Window({ content }) {
  let items = [];
  if (content === "Content for 1-2 Days") {
    items = [
      { id: 5, text: "1st Day in NYC",  imageAlt: "1st Day" },
      { id: 6, text: "2nd Day in NYC",  imageAlt: "2nd Day" },
      
    ];
  } else if (content === "Content for 3-4 Days") {
    items = [
      { id: 5, text: "1st Day in NYC",  imageAlt: "1st Day" },
      { id: 6, text: "2nd Day in NYC",  imageAlt: "2nd Day" },
      { id: 7, text: "3rd Day in NYC",  imageAlt: "3rd Day" },
      { id: 8, text: "4td Day in NYC",  imageAlt: "4th Day" },
      
      
    ];
    
    // Define items for 4-6 Days
  } else if (content === "Content for 5-7 Days") {
    items = [
      { id: 5, text: "1st Day in NYC",  imageAlt: "1st Day" },
      { id: 6, text: "2nd Day in NYC",  imageAlt: "2nd Day" },
      { id: 7, text: "3rd Day in NYC",  imageAlt: "3rd Day" },
      { id: 8, text: "4th Day in NYC",  imageAlt: "4th Day" },
      { id: 9, text: "5th Day in NYC",  imageAlt: "5rd Day" },
      { id: 10, text: "6th Day in NYC",  imageAlt: "6th Day" },
      { id: 11, text: "7th Day in NYC",  imageAlt: "7th Day" },
    ];
   
    
  }

  return (
    <div className="window" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="window-content">
        {content === "Content for 1-2 Days" && (
          <div>
            <code>New York City 2 Day Itinerary</code>
            <div className="gallery">
              <Gallery items={items} />
            </div>
          </div>
        )}
        {content === "Content for 3-4 Days" && (
          <div>
            <code>New York City 4 Day Itinerary</code>
            <div className="gallery">
              <Gallery items={items} />
            </div>
          </div>
        )}
        {content === "Content for 5-7 Days" && (
          <div>
            <code>New York City 7 Day Itinerary</code>
            <div className="gallery">
              <Gallery items={items} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function Buttons({ setSelectedTab }) {
  const buttons = [
    { label: "1-2 Days", content: "Content for 1-2 Days" },
    { label: "3-4 Days", content: "Content for 3-4 Days" },
    { label: "5-7 Days", content: "Content for 5-7 Days" },
  ];
  const handleClick = (item) => {
    setSelectedTab(item.content);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 2,
        },
      }}
    >
      <ButtonGroup size="large" aria-label="large button group">
        {buttons.map((item) => (
          <Button
            key={item.label}
            onClick={() => handleClick(item)}
            sx={{
              color: "white",
              "&:hover": {
                color: "white",
                border: "1px solid white", // 添加白色边框
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}


function Pop() {
  const [, setContainerHeight] = useState(0);
  const count = useRef(0);
  const [items, setItems] = useState([]);
  const [popLayout, setPopLayout] = useState(false);

  useEffect(() => {
    const newHeight = items.length * 220; // Adjust the height 
    setContainerHeight(newHeight);
  }, [items]);
  const locations = [
    { name: "Fotografiska NY", lat: 40.702523, lng: -74.014090 },
    { name: "Downtown & Statue of Liberty", lat: 40.689249, lng: -74.044500 },
    { name: "Madame Tussauds New York", lat: 40.756222, lng: -73.988253 },
    { name: "Solomon R. Guggenheim Museum", lat: 40.783010, lng: -73.958465 },
    { name: "Entertain Yourself in Times Square", lat: 40.758895, lng: -73.985131 },
    { name: "Museum of Broadway", lat: 40.760037, lng: -73.984017 },
    { name: "El Museo del Barrio", lat: 40.792433, lng: -73.951863 },
    { name: "Empire State Building", lat: 40.748817, lng: -73.985428 },
    { name: "Escape Game New York", lat: 40.744717, lng: -73.988134 },
    { name: "St. Patrick’s Cathedral Tour", lat: 40.758446, lng: -73.976211 },
    { name: "LoL Comedy Lounge Magic", lat: 40.760616, lng: -73.994915 },
    { name: "Intrepid Sea, Air & Space Museum", lat: 40.764532, lng: -73.999161 },
    { name: "One World Observatory", lat: 40.713015, lng: -74.013169 },
    { name: "Central Park Guided Bike Tour", lat: 40.767783, lng: -73.971833 },
    { name: "American Museum of Natural History", lat: 40.781324, lng: -73.974843 },
    { name: "Scavenger Hunts", lat: 40.758899, lng: -73.985057 },
    { name: "Observation Deck at Rockefeller Center", lat: 40.759145, lng: -73.979698 },
    { name: "Whitney Museum of American Art", lat: 40.739612, lng: -74.008130 },
    { name: "Museum of the City of New York", lat: 40.792614, lng: -73.951309 },
    { name: "Ellis Island Roundtrip Ferry Tour", lat: 40.699663, lng: -74.039863 },
    { name: "New York Historical Society Museum and Library", lat: 40.779442, lng: -73.973939 }
  ];
  

  const customTexts = [
                        "Fotografiska NY",
                        "Downtown & Statue of Liberty", 
                        "Madame Tussauds New York",
                        "Solomon R. Guggenheim Museum",
                        "Entertain Yourself in Times Square",
                        "Museum of Broadway",
                        "El Museo del Barrio",
                        "Empire State Building", 
                        "Escape Game New York",
                        "St. Patrick’s Cathedral Tour",
                        "LoL Comedy Lounge Magic",
                        "Intrepid Sea, Air & Space Museum",
                        "One World Observatory",
                        "Central Park Guided Bike Tour ",
                        "American Museum of Natural History",
                        "Scavenger Hunts",
                        "Observation Deck at Rockefeller Center",
                        "Whitney Museum of American Art",
                        "Museum of the City of New York",
                        "Ellis Island Roundtrip Ferry Tour",
                        "New York Historical Society Museum and Library"]; // Add your custom texts here
                        const navigate = useNavigate();
                        


return (
  <div className="example" style={{ height: "100%" }}>
  <div className="controls">
        <label className="enable">
          <code style={{color:"white"}}>Display on Map? Click Image  </code>
          
          <input
            type="checkbox"
            checked={popLayout}
            onChange={(e) => setPopLayout(e.currentTarget.checked)}
          />
        </label>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            count.current++;
            const newItem = { id: count.current, text: customTexts[count.current - 1] };
            setItems([...items, newItem]);
          }}
          style={{ width: "260px",margin:"10px",border:"1px solid white"}}
        >
         POP Recommendations
       
        </motion.button>
      </div>
      <ul style={{ flex: 1 }}>
        <AnimatePresence mode={popLayout ? "popLayout" : "sync"}>
          {items.map((item) => (
            <div  key={item.id}><motion.li
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              style={{ justifyContent: "center", alignItems: "center", fontSize: "20px",margin:"10px", display: "flex" }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              key={item.id}
              onClick={() => {
                const newItems = items.filter((i) => i.id !== item.id);
                setItems(newItems);
                removeItem(newItems, item.id);
              } }
            >
              {item.text}
            </motion.li>
            <img
            src={`/${item.id + 11}.jpg`} // Use index + 12 as the file name
            alt={item.imageAlt}
            style={{ maxWidth: "100%", height: "auto", alignItems: "center" }}
            onClick={() => {
              navigate('/map', {
                state: { location: { lat: locations[item.id - 1].lat, lng: locations[item.id - 1].lng ,title:locations[item.id - 1].name} },
              });
            }}
            />
            </div>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}


function ItineraryPage() {
  // const { scrollYProgress } = useScroll();
  const [selectedTab, setSelectedTab] = useState(null);
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 200,
  //   damping: 30,
  //   restDelta: 0.001
  // });
  const handleButtonClick = (url) => {
    window.open(url, '_blank');
  };


  return (
    <div className="itinerary-page" style={{ backgroundColor: "#1C2541", height: "100%" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "0px" }}>
          <h1 style={{ color: "white", marginBottom: "3px", width: "39%" }}>Money saving DAY Pass itineraries</h1>
          <Button size="small" style={{ color: "white", marginTop: "10px", border: "none", width: "15%" }} onClick={() => handleButtonClick("https://www.sightseeingpass.com/en/new-york/day-pass/itineraries/7-days-in-nyc")}>
            Book now
          </Button>
        </div>

        <Buttons setSelectedTab={setSelectedTab} style={{ flex: 1, marginTop: "0px", marginBottom: "0px" }} />
        <Window content={selectedTab} />
      </div>

      <div className="flex-container">
        <div className="pop" style={{ flex: 1.4, marginTop: "60px",heigh:"70%",marginRight:"-6%" }}>
          <Pop />
        </div>

        <div className="info-box" style={{ border: "2px solid white", flex: 2, height: "65%", width: "80%", marginTop: "80px",marginBottom:"6%", marginRight: "10%", marginLeft: "10%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", backgroundColor: "#1C2541", fontSize: "18px", justifyContent: "center" }}>
        <div style={{ gridColumn: "1 / span 2", color: "white", fontSize: "24px", textAlign: "center", marginBottom: "10px", fontFamily: "cursive" }}>
          Recommendations Links
        </div>
            <Link href="https://www.fotografiska.com/nyc/exhibitions/terry-oneill/?gclid=CjwKCAjw5MOlBhBTEiwAAJ8e1noSR8twV9Ka83hIecqPsBg7LL7OyAVq5AOZKr6uoRNROASJobHt7xoCPtsQAvD_BwE" underline="hover" style={{color:"white"}}>
              {'Fotografiska NY'}
            </Link>
            <Link href="https://www.nps.gov/stli/index.htm"   underline="hover" style={{color:"white" }}>
              {'Downtown & Statue of Liberty'}
            </Link>
            <Link href="https://www.madametussauds.com/new-york/"   underline="hover" style={{color:"white" }}>
              {'Madame Tussauds New York'}
            </Link>
            <Link href="https://www.guggenheim.org/"   underline="hover" style={{color:"white" }}>
              {'Solomon R. Guggenheim Museum'}
            </Link>
            <Link href="https://tourscanner.com/blog/fun-things-to-do-in-times-square/"   underline="hover" style={{color:"white" }}>
              {'Entertain yourself in times square'}
            </Link>
            <Link href="https://www.themuseumofbroadway.com/?gclid=CjwKCAjw5MOlBhBTEiwAAJ8e1jsyRHZy1YH050mzXWoeBxfqDuqtGLp6acv5wSRwVinSj5jb0gtE8BoCJckQAvD_BwE&gclsrc=aw.ds"   underline="hover" style={{color:"white" }}>
              {'Museum of Broadway'}
            </Link>
            <Link href="https://www.elmuseo.org/"   underline="hover" style={{color:"white"}}>
              {'el museo del barrio'}
            </Link>
            <Link href="https://www.esbnyc.com/"   underline="hover" style={{color:"white" }}>
              {'Empire State Building'}
            </Link>
            <Link href="https://theescapegame.com/newyorkcity/"   underline="hover" style={{color:"white"}}>
              {'Escape game new york'}
            </Link>
            <Link href="https://www.stpatrickscathedral.ie/visit/?psafe_param=1&gclid=CjwKCAjw5MOlBhBTEiwAAJ8e1jMGy5LGUGm8EhlMrFzsB2zEdQJQ_c9qAGlo4InSlhLofWAhflZQgRoCpCkQAvD_BwE"   underline="hover" style={{color:"white" }}>
              {'st. patrick’s cathedral tour'}
            </Link>
            <Link href="https://www.esbnyc.com/"   underline="hover" style={{color:"white" }}>
              {'Empire State Building'}
            </Link>
            <Link href="https://lolcomedylounge.com/magic/"   underline="hover" style={{color:"white" }}>
              {'LoL Comedy Lounge Magic'}
            </Link>

            <Link href="https://www.intrepidmuseum.org/Purchase-Tickets?PartnerID=1343&gclid=CjwKCAjw5MOlBhBTEiwAAJ8e1vtjCXg-vWEAIpj2oOBDaSc8T04IzVJ_G2RLCWkiNzO-Ru3nef8X-RoCDwYQAvD_BwE"   underline="hover" style={{color:"white"}}>
              {'Intrepid Sea, Air & Space Museum'}
            </Link>

            <Link href="https://www.oneworldobservatory.com/buy-tickets/tradedoubler/?tduid=ce1a6289b3062962a332618c6cab2697"   underline="hover" style={{color:"white" }}>
              {'One World Observatory'}
            </Link>

            <Link href="https://www.sightseeingpass.com/en/new-york/attractions/guided-central-park-bike-tour-by-bike-rent-nyc?aid=66&gad=1&gclid=CjwKCAjw5MOlBhBTEiwAAJ8e1pCW29Qc5QQHJaS5_loVFY4ZPzv5KO-Jpg9u_lvDU8KyIQEHxYEOzRoCJ7cQAvD_BwE"   underline="hover" style={{color:"white" }}>
              {'Central Park Guided Bike Tour'}
            </Link>

            <Link href="https://www.amnh.org/"   underline="hover" style={{color:"white" }}>
              {'American Museum of Natural History'}
            </Link>

            <Link href="https://www.tripadvisor.ie/Attractions-g60763-Activities-c56-t209-New_York_City_New_York.html"   underline="hover" style={{color:"white" }}>
              {'Scavenger hunts new york'}
            </Link>

            <Link href="https://www.rockefellercenter.com/attractions/top-of-the-rock-observation-deck/"   underline="hover" style={{color:"white" }}>
              {'Observation Deck at Rockefeller Center '}
            </Link>
            <Link href="https://whitney.org/"   underline="hover" style={{color:"white" }}>
              {'Whitney Museum of American Art'}
            </Link>
            <Link href="https://www.mcny.org/about?gclid=CjwKCAjw5MOlBhBTEiwAAJ8e1pgF3C_PgumehNW0S1vh0oludiOu807GgJkHCXj_xqOQMXQXo1WWkRoCjooQAvD_BwE"   underline="hover" style={{color:"white" }}>
              {'Museum of the City of New York'}
            </Link>
            <Link href="https://www.statueofliberty.org/visit/tickets/"   underline="hover" style={{color:"white" }}>
              {'Ellis Island Roundtrip Ferry Tour'}
            </Link>
            <Link href="https://www.nyhistory.org/"   underline="hover" style={{color:"white" }}>
              {'Historical Society Museum and Library'}
            </Link>

            </div>
            </div>
            <style>
        {`
          /* 在手机屏幕下，flex-direction设为column，即pop和recommend links在垂直方向上排列 */
          @media (max-width: 768px) {
            .flex-container {
              display: flex;
              align-items: center;
              flex-direction: column;
            }
          }

          /* 在web端，flex-direction设为row，即pop在recommend links右侧 */
          @media (min-width: 769px) {
            .flex-container {
              display: flex;

              flex-direction: row;
            }
          }
        `}
      </style>
            {/* add the scroll process */}
            {/* <article>
      <motion.div className="progress" style={{ scaleX }} />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: true ? 0 : 1 }}
        className="privacy-screen"
      />
    </article> */}
      </div>
    );
}

export default ItineraryPage;