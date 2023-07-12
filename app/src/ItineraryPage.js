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
            <li>{item.text}</li>
            
            
            <img src={`/${item.id}.png`}  alt={item.imageAlt} />
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
      { id: 7, text: "1st Day in NYC",  imageAlt: "3rd Day" },
      { id: 8, text: "2nd Day in NYC",  imageAlt: "4th Day" },
      
      
    ];
    
    // Define items for 4-6 Days
  } else if (content === "Content for 5-7 Days") {
    items = [
      { id: 5, text: "1st Day in NYC",  imageAlt: "1st Day" },
      { id: 6, text: "2nd Day in NYC",  imageAlt: "2nd Day" },
      { id: 7, text: "1st Day in NYC",  imageAlt: "3rd Day" },
      { id: 8, text: "2nd Day in NYC",  imageAlt: "4th Day" },
      { id: 9, text: "1st Day in NYC",  imageAlt: "5rd Day" },
      { id: 10, text: "2nd Day in NYC",  imageAlt: "6th Day" },
      { id: 11, text: "2nd Day in NYC",  imageAlt: "6th Day" },
    ];
   
    
  }

  return (
    <div className="window">
      <div className="window-content">
        {content === "Content for 1-2 Days" && (
          <div>
            <h2>Itinerary for 1-2 Days</h2>
            <div className="gallery">
              <Gallery items={items} />
            </div>
          </div>
        )}
        {content === "Content for 3-4 Days" && (
          <div>
            <h2>Itinerary for 3-4 Days</h2>
            <div className="gallery">
              <Gallery items={items} />
            </div>
          </div>
        )}
        {content === "Content for 5-7 Days" && (
          <div>
            <h2>Itinerary for 5-7 Days</h2>
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



function Pop(){
  const count = useRef(0);
  const [items, setItems] = useState([0]);
  const [popLayout, setPopLayout] = useState(false);

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
            setItems([...items, count.current]);
          }}
        >
          Add Plan
        </motion.button>
      </div>
      <ul>
        <AnimatePresence mode={popLayout ? "popLayout" : "sync"}>
          {items.map((id) => (
            <motion.li
              layout
              // initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              key={id}
              onClick={() => {
                const newItems = [...items];
                removeItem(newItems, id);
                setItems(newItems);
              }}
            />
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


    return (
        <div className="itinerary-page">
            <div>
                <h1>How many days are you planning to stay?</h1>
                <Buttons setSelectedTab={setSelectedTab} />
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