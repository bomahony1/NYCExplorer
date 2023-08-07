import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { THREE } from "three";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, List, ListItemButton, ListItemText, ListSubheader, Collapse ,} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import './Home.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LoadingIndicator from './LoadingIndicator';

function NestedList({ attractions }) {
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
      sx={{ padding: '10px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<ListSubheader component="div" id="nested-list-subheader"></ListSubheader>}
    >
      <ListItemButton onClick={handleClick1} sx={{ borderTop: '1px solid white' }}>
        <ListItemText
          primary={<span style={{ fontWeight: 'bold',color: 'white', fontSize: '1.1rem' }}>{attractions.length > 0 && attractions[0].name}</span>}
          style={{ textAlign: 'left' }}
        />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4, color: 'white', fontWeight: 'normal', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
              <b>Address:</b> {attractions.length > 0 && attractions[0].address}
            </div>
            <div>
              <b>Rating:</b> {attractions.length > 0 && attractions[0].rating}
            </div>
            <div>
              {attractions.length > 0 && attractions[0].photos && (
                <img src={attractions[0].photos[0]} alt={attractions[0].name} style={{ maxWidth: '300px', maxHeight: '200px' }} />
              )}
            </div>
            <div>
            <div>
              <b>Opening Hours:</b> {attractions.length > 0 &&(attractions[0].open)} AM - {attractions.length > 0 && (attractions[0].close)} PM
            </div>
            </div>
            <div>
              <Button
                size="small"
                style={{ color: '#477696' }}
                onClick={() => handleButtonClick('https://www.topoftherock.ie/')}
              >
                Explore
              </Button>
              <ArrowRightAltIcon sx={{ color: 'disabled' }} />
            </div>
          </ListItemButton>
        </List>
      </Collapse>
  
      <ListItemButton onClick={handleClick2} sx={{ borderTop: '1.3px solid white' }}>
        <ListItemText
          primary={<span style={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem' }}>{attractions.length > 1 && attractions[1].name}</span>}
          style={{ textAlign: 'left' }}
        />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4, color: 'white', fontWeight: 'normal', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
              <b>Address:</b> {attractions.length > 1 && attractions[1].address}
            </div>
            <div>
              <b>Rating:</b> {attractions.length > 1 && attractions[1].rating}
            </div>
            <div>
              {attractions.length > 1 && attractions[1].photos && (
                <img src={attractions[1].photos[0]} alt={attractions[1].name} style={{ maxWidth: '300px', maxHeight: '200px' }} />
              )}
            </div>
            <div>
              <b>Opening Hours:</b> {attractions.length > 1 &&(attractions[1].open)} AM - {attractions.length > 1 && (attractions[1].close)} PM
            </div>
            <div>
              <Button
                size="small"
                style={{ color: '#477696' }}
                onClick={() => handleButtonClick('https://bryantpark.org/')}
              >
                Explore
              </Button>
              <ArrowRightAltIcon sx={{ color: 'disabled' }} />
            </div>
          </ListItemButton>
        </List>
      </Collapse>
  
      <ListItemButton onClick={handleClick3} sx={{ borderTop: '1.6px solid white' }}>
        <ListItemText
          primary={<span style={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem' }}>{attractions.length > 2 && attractions[2].name}</span>}
          style={{ textAlign: 'left' }}
        />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4, color: 'white', fontWeight: 'normal', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
              <b>Address:</b> {attractions.length > 2 && attractions[2].address}
            </div>
            <div>
              <b>Rating:</b> {attractions.length > 2 && attractions[2].rating}
            </div>
            <div>
              {attractions.length > 2 && attractions[2].photos && (
                <img src={attractions[2].photos[0]} alt={attractions[2].name} style={{ maxWidth: '300px', maxHeight: '200px' }} />
              )}
            </div>
            <div>
              <b>Opening Hours:</b> {attractions.length > 2 &&(attractions[2].open)} AM - {attractions.length > 2 && (attractions[2].close)} PM
            </div>
            <div>
              <Button
                size="small"
                style={{ color: '#477696' }}
                onClick={() => handleButtonClick('https://www.rockefellercenter.com/')}
              >
                Explore
              </Button>
              <ArrowRightAltIcon sx={{ color: 'disabled' }} />
            </div>
          </ListItemButton>
        </List>
      </Collapse>
  
      <ListItemButton onClick={handleClick4} sx={{ borderTop: '1.8px solid white' }}>
        <ListItemText
          primary={<span style={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem' }}>{attractions.length > 3 && attractions[3].name}</span>}
          style={{ textAlign: 'left' }}
        />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4, color: 'white', fontWeight: 'normal',frontsize:"15px", display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
              <b>Address:</b> {attractions.length > 3 && attractions[3].address}
            </div>
            <div>
              <b>Rating:</b> {attractions.length > 3 && attractions[3].rating}
            </div>
            <div>
              {attractions.length > 3 && attractions[3].photos && (
                <img src={attractions[3].photos[0]} alt={attractions[3].name} style={{ maxWidth: '300px', maxHeight: '200px' }} />
              )}
            </div>
            <div>
              <b>Opening Hours:</b> {attractions.length > 3 &&(attractions[3].open)} AM - {attractions.length > 3 && (attractions[3].close)} PM
            </div>
            <div>
              <Button
                size="small"
                style={{ color: '#477696' }}
                onClick={() => handleButtonClick('https://www.oneworldobservatory.com/')}
              >
                Explore
              </Button>
              <ArrowRightAltIcon sx={{ color: 'disabled' }} />
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

// Photos from https://unsplash.com/
const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

// function Image({ id }) {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isInView, setIsInView] = useState(false);

//   return (
//     <div className="image-container">
//       <motion.div
//         initial={false}
//         animate={
//           isLoaded && isInView
//             ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
//             : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
//         }
//         transition={{ duration: 1, delay: 1 }}
//         viewport={{ once: true }}
//         onViewportEnter={() => setIsInView(true)}
//       >
//         <img src={`/${id}.jpg`} alt="" onLoad={() => setIsLoaded(true)} />
//       </motion.div>
//     </div>
//   );
// }

function Image({ id }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <div className="image-container" style={{ maxWidth: '100%' }}>
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
        <img
          src={`/${id}.jpg`}
          alt=""
          onLoad={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            margin: '5px',
          }}
        />
      </motion.div>
    </div>
  );
}

function HomePage() {
  const [events, setEvents] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true); 
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/events/')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const filteredEvents = data.reduce((accumulator, currentEvent) => {
            const isDuplicate = accumulator.some((event) => event.name === currentEvent.name);
            if (!isDuplicate) {
              accumulator.push(currentEvent);
            }
            return accumulator;
          }, []);

          setEvents(filteredEvents.slice(0, 5));
        } else {
          setEvents([]);
        }
        setLoading(false); // Data loaded, set loading to false
      })
      .catch((error) => {
        console.error(error);
        setEvents([]);
        setLoading(false); // Error occurred, set loading to false
      });
  }, []);

  const handleBringMeThere = (url) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/googleAttractions/')
      .then((response) => response.json())
      .then((data) => {
        const newAttractions = data.map((attraction) => ({
          name: attraction.name,
          address: attraction.address,
          latitude: attraction.latitude,
          longitude: attraction.longitude,
          rating: attraction.rating,
          photos: attraction.photos,
          open: attraction.opening_hours?.opening_hours?.periods[0]?.open?.time || '', 
          close: attraction.opening_hours?.opening_hours?.periods[0]?.close?.time || '',   
        }));
        setAttractions(newAttractions);
      })
      .catch((error) => {
        console.error(error);
        setAttractions([]);
      });
  }, []);

  const [loadingProgress, setLoadingProgress] = React.useState(0); // Add the loadingProgress state

  useEffect(() => {
    // Simulating the API fetch progress
    const timer = setInterval(() => {
      setLoadingProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    // Simulating the completion of the API fetch
    setTimeout(() => {
      clearInterval(timer);
      setLoadingProgress(100);
    }, 4000);

    // Clean up the interval timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Simulate fetching data from API - Replace this with your actual API fetch logic
  useEffect(() => {
    setTimeout(() => {
      // Simulate the completion of the data fetch
      setLoadingProgress(100);
    }, 4000);
  }, []);

  // If data is still loading, show the LoadingIndicator with the loading progress
  if (loadingProgress < 100) {
    return <LoadingIndicator loadingProgress={loadingProgress} />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', color: '#1C2541', fontWeight: 'bold' }}>
    <div style={{ width: '100%', maxWidth: '1440px' }}>
      <div style={{ textAlign: 'center', marginTop: '6px' }}>
          <Carousel
            autoPlay={true}
            interval={5000}
            infiniteLoop={true} // Keeps the carousel looping indefinitely
            showStatus={false} // Hides the status indicator (e.g., slide x of y)
            showThumbs={false} // Hides the thumbnail navigation
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
                  <CardMedia
                    component="img"
                    height="620"
                    width="699"
                    image={event.image}
                    alt="image of event"
                    padding="5px"
                    marginbutton="5px"
                  />
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
        <div style={{ marginTop: '10px', backgroundColor: '#1C2541', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ margin: '70px', color: 'white', textAlign: 'center', flex: '0 0 350px' }}>
            <div style={{ textAlign: 'left' }}>
              <h3>Discover iconic landmarks</h3>
              <h1>Immerse yourself in the vibrant energy of NYC with our recommended attractions:</h1>
              <h3>Let Buzzin New York help you create lasting memories</h3>
            </div>
            <NestedList attractions={attractions} />
          </div>
          <div className="images" style={{ border: '2px solid white', flex: '1 1 200px', margin: '70px',  maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
            <div className="images-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              {[1, 2, 3, 4, 13, 14, 15, 19, 23, 24, 25, 26, 28, 29, 32].map((image) => (
                <Image key={image} id={image} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;