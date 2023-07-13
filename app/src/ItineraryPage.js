import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform} from "framer-motion";
import { Button, Box, ButtonGroup } from "@mui/material";
import "./Itinerary.css"
import { removeItem } from "./array.ts";



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
      <ul ref={ref}>
        {items.map((item) => (
          <div key={item.id}>
           <li style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px" }}>{item.text}</li>
           <img src={`/${item.id}.png`}  alt={item.imageAlt} style={{ width: "999px", height: "600px" }}/>
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
    <div className="window">
      <div className="window-content">
        {content === "Content for 1-2 Days" && (
          <div>
             <code>New York City 2 Day Itinerary </code>
      
            <div className="gallery">
              <Gallery items={items} />
            </div>
          </div>
        )}
        {content === "Content for 3-4 Days" && (
          <div>
             <code>New York City 4 Day Itinerary </code>
            <div className="gallery">
              <Gallery items={items} />
            </div>
          </div>
        )}
        {content === "Content for 5-7 Days" && (
          <div>
             <code>New York City 7 Day Itinerary </code>
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
              color: "#1C2541",
              "&:hover": {
                color: "#1C2541",
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
  const count = useRef(0);
  const [items, setItems] = useState([]);
  const [popLayout, setPopLayout] = useState(false);

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

  return (
    <div className="example">
      <div className="controls">
        <label className="enable">
          <code>POP YOUR Itinerary Plan </code>
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
        >
          Add Plan
        </motion.button>
      </div>
      <ul>
        <AnimatePresence mode={popLayout ? "popLayout" : "sync"}>
          {items.map((item) => (
            <motion.li
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              style={{ justifyContent: "center", alignItems: "center", fontSize: "20px",display: "flex"}}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              key={item.id}
              onClick={() => {
                const newItems = items.filter((i) => i.id !== item.id);
                setItems(newItems);
              }}
            >
              {item.text}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}


function ItineraryPage() {
  const { scrollYProgress } = useScroll();
  const [selectedTab, setSelectedTab] = useState(null);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });
  const handleButtonClick = (url) => {
    window.open(url, '_blank');
  };


    return (
        <div className="itinerary-page">
            <div>
              <div style={{display:"flex",alignItems: "center",justifyContent: "center"}}>
              <h1 style={{flex:0.45}}>Money saving DAY Pass itineraries</h1>
              <Button size="small" style={{ backgroundColor: "white", color: "#477696",marginTop:"3px" }} onClick={() => handleButtonClick("https://www.sightseeingpass.com/en/new-york/day-pass/itineraries/7-days-in-nyc")}>
              Book now
              </Button>
              </div>
              <Buttons setSelectedTab={setSelectedTab} style={{flex:1}} />
                <Window content={selectedTab} />
            </div>
            <div className="pop">
            <Pop />
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
    );
}

export default ItineraryPage;