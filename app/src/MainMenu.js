
import React, { useState, useRef, useEffect, Suspense } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomePage from './HomePage';
import MapPage from './MapPage';
import ItineraryPage from './ItineraryPage';
import sloganImage from './images/slogan.jpg';
import { motion, MotionConfig, useMotionValue } from 'framer-motion';
import { Shapes } from './Shapes';
import { transition as transitions} from './settings';
import useMeasure from 'react-use-measure';
import './MainMenu.css';
import { styled } from '@mui/system';
import Footer from './Footer';
import ThreeD from "./ThreeD.js";

function PlayButton() {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <MotionConfig transition={transitions}>
      <motion.button
        className="PlayButton"
        ref={ref}
        initial={false}
        animate={isHover ? 'hover' : 'rest'}
        whileTap="press"
        variants={{
          rest: { scale: 0.4 },
          hover: { scale: 0.8 },
          press: { scale: 0.8 },
        }}
        onHoverStart={() => {
          resetMousePosition();
          setIsHover(true);
        }}
        onHoverEnd={() => {
          resetMousePosition();
          setIsHover(false);
        }}
        onTapStart={() => setIsPress(true)}
        onTap={() => setIsPress(false)}
        onTapCancel={() => setIsPress(false)}
        onPointerMove={(e) => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
        }}
      >
        <motion.div
          className="shapes"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
        >
          <div className="pink blush" />
          <div className="blue blush" />
          <div className="container">
            <Suspense fallback={null}>
              <Shapes isHover={isHover} isPress={isPress} mouseX={mouseX} mouseY={mouseY} />
            </Suspense>
          </div>
        </motion.div>
        <motion.div variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }} className="label">
          Contact 
        </motion.div>
      </motion.button>
    </MotionConfig>
  );
}

export default function MainMenu() {
  const [value, setValue] = useState(0);
  const StyledTabIcon = styled('span')({
    fontSize: '1.6rem', // Adjust the icon size as needed
  });
  const navRef = useRef(null); // Reference to the navigation bar element
  const [isSticky, setIsSticky] = useState(false); // State to track if navigation bar should be sticky

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        // Check if the page has scrolled past the navigation bar position
        setIsSticky(window.scrollY > navRef.current.offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let content;
  if (value === 0) {
    content = <HomePage />;
  } else if (value === 1) {
    content = <MapPage />;
  } else if (value === 2) {
    content = <ItineraryPage />;
  }

  return (
    <Box>
      <div
        ref={navRef} // Set the reference to the navigation bar element
        style={{
          position: isSticky ? 'fixed' : 'relative', // Apply 'fixed' position if sticky, 'relative' otherwise
          top: 0, // Stick to the top of the viewport
          zIndex: 999, // Set a higher z-index to ensure it's displayed on top of other content
          width: '100%',
          height:'80px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        <img src={sloganImage} alt="Slogan" style={{ width: '13%' }} />
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{
            marginLeft: '400px',
          }}
        >
          <Tab
            label="Home"
            icon={<StyledTabIcon><HomeOutlinedIcon /></StyledTabIcon>}
            sx={{ color: '#1C2541', fontWeight: 'bold', fontSize: '0.8rem', '&.Mui-selected': { color: '#477696' } }}
          />
          <Tab
            label="Map"
            icon={<StyledTabIcon><SearchIcon /></StyledTabIcon>}
            sx={{ color: '#1C2541', fontWeight: 'bold', fontSize: '0.8rem', '&.Mui-selected': { color: '#477696' } }}
          />
          <Tab
            label="Itinerary"
            icon={<StyledTabIcon><PersonPinIcon /></StyledTabIcon>}
            sx={{ color: '#1C2541', fontWeight: 'bold', fontSize: '0.8rem', '&.Mui-selected': { color: '#477696' } }}
          />
        </Tabs>
        <PlayButton />
      </div>
      <Box>{content}</Box>
      <Box><div style={{backgroundColor:"#1C2541"}}>
          {/* <ThreeD /> */}
        </div>
        <div><Footer /></div></Box>
     
    </Box>
    

  );
}
