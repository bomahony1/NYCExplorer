
import React, { useState, useRef, useEffect, Suspense } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomePage from './HomePage';
import MapPage from './MapPage';
import RecommendPage from './RecommendPage';
import { motion, MotionConfig, useMotionValue } from 'framer-motion';
import { Shapes } from './Shapes';
import { transition as transitions} from './settings';
import useMeasure from 'react-use-measure';
import './MainMenu.css';
import { styled } from '@mui/system';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import {  Routes,Route } from 'react-router-dom';



const handleButtonClick = (url) => {
  window.open(url, '_blank');
};

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
        <motion.div variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }} className="label" onClick={() => handleButtonClick('https://github.com/paul-od24/NYC_Busyness')}>
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
    // Handle tab change and navigate to corresponding route
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/map");
        break;
      case 2:
        navigate("/recommend");
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();

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



  return (
    <Box>
  <div
      ref={navRef}
      style={{
        position: isSticky ? 'fixed' : 'relative',
        top: 0,
        zIndex: 999,
        width: '100%',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
      }}
    >
      <img src={`/slogan.jpg`} alt="Slogan" style={{ width: '13%', marginLeft: '5%', flex: '0 0 auto' }} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{
            // Apply custom styles for different screen sizes
            flex: 1, // Allow the Tabs to grow and occupy available space
            maxWidth: '300px', // Limit the maximum width of Tabs on larger screens
            
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
            label="Recommend"
            icon={<StyledTabIcon><PersonPinIcon /></StyledTabIcon>}
            sx={{ color: '#1C2541', fontWeight: 'bold', fontSize: '0.8rem', '&.Mui-selected': { color: '#477696' } }}
          />
        </Tabs>
       
      </div>
      <PlayButton style={{ marginRight: '5%', flex: '0 0 auto' }} />
    </div>
      <div>
      <Routes>
          {/* Use the Route component to specify the path and the component to render */}
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
        </Routes>
      </div>
      <Box style={{ position: "relative", display: "flex", justifyContent: "center" }}>
      <div style={{position:'absolute',bottom:'200px',padding:"5px",textAlign:"center",top:"10px",zIndex:"999"}}><Footer /></div>
      </Box>
    </Box>
  );
}
