import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, List, ListItemButton, ListItemText, ListSubheader, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { motion} from "framer-motion";
import './Home.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ThreeD from "./ThreeD.js";




function NestedList() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const handleClick4 = () => {
    setOpen4(!open4);
  };
  const handleButtonClick = (url) => {
    window.open(url, '_blank');
  };

  

  return (
    <List
    sx={{  padding: '10px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<ListSubheader component="div" id="nested-list-subheader"></ListSubheader>}
    >
      <ListItemButton onClick={handleClick1}
      sx={{ borderTop: '1px solid white' }} 
      >
        <ListItemText primary={<span style={{ fontWeight: 'bold',color:'white',fontSize: '1.2rem' }}>Empire State Building</span>} style={{ textAlign: 'left' }} />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 ,color:"white",fontWeight: 'normal'}}>
          Visit New York City's most iconic skyscraper and admire the panoramic views over Manhattan
          <Button size="small" style={{  color: '#477696' }}onClick={() => handleButtonClick('https://www.esbnyc.com/')}>Explore</Button>
          <ArrowRightAltIcon  sx={{ color: "disabled"}}/>
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick2}
      sx={{ borderTop: '1.3px solid white' }} >
      <ListItemText primary={<span style={{ fontWeight: 'bold' ,color:'white',fontSize: '1.2rem'}}>Wall Street</span>} style={{ textAlign: 'left' }} />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 ,color:"white",fontWeight: 'normal'}}>
          Explore the world's financial center with a Wall Street insider
          <Button size="small" style={{  color: '#477696' }} onClick={() => handleButtonClick('https://www.getyourguide.com/wall-street-l3414/tours-tc1/')}>Explore</Button>
          <ArrowRightAltIcon  sx={{ color: "disabled"}}/>
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick3}
      sx={{ borderTop: '1.6px solid white' }} >
        <ListItemText primary={<span style={{ fontWeight: 'bold',color:'white',fontSize: '1.2rem' }}>Time Square</span>} style={{ textAlign: 'left' }} />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 ,color:"white" ,fontWeight: 'normal'}}>
        Explore central area in NYC that has many shops, restaurants, office buildings and flashing billboards around it.
        <Button size="small" style={{  color: '#477696' }} onClick={() => handleButtonClick('https://www.timessquarenyc.org/')}>Explore</Button>
        <ArrowRightAltIcon  sx={{ color: "disabled"}}/>
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick4}
      sx={{ borderTop: '1.8px solid white' }} >
        <ListItemText primary={<span style={{ fontWeight: 'bold',color:'white',fontSize: '1.2rem' }}>Statue of Liberty</span>} style={{ textAlign: 'left' }} />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 ,color:"white",fontWeight: 'normal'}}>
        Donated by the French in 1886, Lady Liberty is a symbol of democracy both in the USA and worldwide
        <Button size="small"  style={{  color: '#477696' }} onClick={() => handleButtonClick('https://www.statueoflibertytickets.com/')}>Explore</Button>
        <ArrowRightAltIcon  sx={{ color: "disabled"}}/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

// Photos from https://unsplash.com/
const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;


function Image({ id }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <div className="image-container">
      <motion.div
        initial={false}
        animate={
          isLoaded && isInView
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsInView(true)}
      >
        <img src={`/${id}.jpg`} alt="" onLoad={() => setIsLoaded(true)} />
      </motion.div>
    </div>
  );
}





function HomePage() {
  const [events, setEvents] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
 

 

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/events/')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setEvents(data.slice(0, 5)); // Only store the first 5 events
        } else {
          setEvents([]);
        }
      })
      .catch(error => {
        console.error(error);
        setEvents([]);
      });
  }, []);

  const handleBringMeThere = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', color: '#1C2541', fontWeight: 'bold' }}>
      <div>
        <div style={{ textAlign: 'center', marginTop: '6px'}}>
          <Carousel
            selectedItem={activeSlide}
            onChange={setActiveSlide}
            renderIndicator={(onClickHandler, isSelected, index) => (
              <button
                type="button"
                onClick={onClickHandler}
                style={{
                  background: isSelected ? '#1C2541' : '#ddd',
                  border: 'none',
                  borderRadius: '80%',
                  width: 9,
                  height: 10,
                  display: 'inline-block',
                  margin: '10px 10px', // Adjust the margin value as needed
                  cursor: 'pointer',
                }}
              />
            )}
          >
            {events.map((event, index) => (
              <div key={index} onMouseEnter={() => setActiveSlide(index)} onClick={() => handleBringMeThere(event.url)}>
                <CardActionArea>
                  <CardMedia component="img" height="620" width="699" image={event.image} alt="image of event"  padding="5px" marginButton="5px" />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      onClick={() => handleBringMeThere(event.url)}
                      style={{ cursor: 'pointer' }}
                    >
                      <strong>{event.name}</strong>  
                      <strong> {event.date} {event.time}</strong>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </div>
            ))}
          </Carousel>
        </div>
        <div style={{ marginTop: '10px',display: 'flex',backgroundColor:"#1C2541"}}>
        <div style={{ flex: 1 ,margin:'100px',}}>
          <div style={{ color: 'white', textAlign: 'left' }}>
            <h3>Discover iconic landmarks </h3>
            <h1>Immerse yourself in the vibrant energy of NYC with our recommended attractions:</h1>
            <h3>Let Buzzin New York help you create lasting memories</h3>
          </div> 
          <NestedList />
          </div >
          <div classname="images" style={{ border:"2px solid white",flex: 2,margin:"100px"}}>
          <div className="images-container">
            {[1, 2, 3, 4].map((image) => (
              <Image key={image} id={image} />
            ))}
          </div>       
          </div>
        </div>
        <div style={{backgroundColor:"#1C2541"}}>
          <ThreeD />
        </div>
      </div>
    </div>
  );
}




export default HomePage;