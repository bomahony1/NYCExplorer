import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring} from "framer-motion";
import { Button, Box, ButtonGroup } from "@mui/material";
import "./Itinerary.css"
import { removeItem } from "./array.ts";


// function Buttons(){
//     const buttons = [
//         <Button key="one">1-3 Days</Button>,
//         <Button key="two">4-6 Days</Button>,
//         <Button key="three">7-10 Days</Button>,
//       ];
//     return (
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             '& > *': {
//               m: 2,
//             },
//           }}
//         >
//           <ButtonGroup size="large" aria-label="large button group">
//             {buttons}
//           </ButtonGroup>
//         </Box>
//       );
// }


function Gallery() {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });

  return (
    <>
      <svg id="progress" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          className="indicator"
          style={{ pathLength: scrollXProgress }}
        />
      </svg>
      <ul ref={ref}>
        <li></li>
        <p>Additional text or description for 1-3 Days</p>
        <li></li>
        <p>Additional text or description for 1-3 Days</p>
        <li></li>
        <p>Additional text or description for 1-3 Days</p>
       
      </ul>
    </>
  );
}


function Buttons({ setSelectedTab }) {
  const buttons = [
    { label: "1-3 Days", content: "Content for 1-3 Days" },
    { label: "4-6 Days",  content: "Content for 4-6 Days" },
    { label: "7-10 Days", content: "Content for 7-10 Days" },
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
          >
           {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}



function Window({ content }) {
  return (
    <div className="window">
      <div className="window-content">
        {content === "Content for 1-3 Days" && (
          <div>
            <h3>Gallery for 1-3 Days</h3>
            <div className="gallery">
              <Gallery />
            </div>

          </div>
        )}
        {content === "Content for 4-6 Days" && (
          <div>
            <h3>Gallery for 4-6 Days</h3>
            <div className="gallery">
            <Gallery />
            </div>
            <p>Additional text or description for 4-6 Days</p>
          </div>
        )}
        {content === "Content for 7-10 Days" && (
          <div>
            <h3>Gallery for 7-10 Days</h3>
            <div className="gallery">
            <Gallery />
            </div>
            <p>Additional text or description for 7-10 Days</p>
          </div>
        )}
      </div>
    </div>
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
                <h2>How many days are you planning to stay?</h2>
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