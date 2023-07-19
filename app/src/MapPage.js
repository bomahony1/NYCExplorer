import React, { useMemo, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { MAPS_API_KEY } from './login.js';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent,Paper} from '@mui/material';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import the styles
import 'react-date-range/dist/theme/default.css'; // Import the theme


// add the drawer and plan window

function DateRangePickerComponent({ handleSelect }) {
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleChange = (ranges) => {
    setSelectedRange(ranges.selection);
    handleSelect(ranges.selection);
  };

  return (
    <div style={{ width: '100px' }}>
      <DateRangePicker
        ranges={[selectedRange]}
        onChange={handleChange}
      />
    </div>
  );
}

function DateRangePickerDialog({ handleSelect }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Date Range Picker</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Date Range</DialogTitle>
        <DialogContent>
          <Paper sx={{ width: '600px' }}>
            <DateRangePickerComponent handleSelect={handleSelect} />
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TemporaryDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isWindowOpen, setWindowOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
    setWindowOpen(false);
  };

  const toggleWindow = () => {
    setWindowOpen(!isWindowOpen);
  };

  const handleSelectRange = (range) => {
    setSelectedRange(range);
  };

  const renderDateRangeContent = () => {
    if (selectedRange) {
      const { startDate, endDate } = selectedRange;
      const start = startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const end = endDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

      const dateContent = [];
      for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24));
        const dayString = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        dateContent.push(
          <div key={i}>
            <h4>{dayString}</h4>
            <p>Click to add day notes</p>
            <p>Drag a place here to add it</p>
          </div>
        );
      }

      return (
        <>
          <h3>Selected Date Range</h3>
          <p>{`${start} - ${end}`}</p>
          {dateContent}
        </>
      );
    }

    return null;
  };

  return (
    <div>
      <button onClick={toggleDrawer}>Drawer Button</button>
      {isDrawerOpen && (
        <div style={{ display: 'flex' }}>
          <div style={{ width: '300px', background: 'white' }}>
            <h3>New York Trip</h3>
            <Divider />
            <button onClick={toggleWindow}>Open Window</button>
            <Divider />
            <CustomizedAccordions />
          </div>
          {isWindowOpen && (
            <div
              style={{
                width: '300px',
                marginLeft: '10px',
                background: 'lightblue',
              }}
            >
              Itinerary
              <DateRangePickerDialog handleSelect={handleSelectRange} />
              <div>{renderDateRangeContent()}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary {...props} />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  
  function CustomizedAccordions() {
    const [expanded, setExpanded] = useState('panel1');
    const [items, setItems] = useState([
      { label: 'Atrractions', checked: false, iconColor: '#fdffb6', inputValue: '' },
      { label: 'Food', checked: false, iconColor: '#06d6a0', inputValue: '' },
      { label: 'Hotels', checked: true, iconColor: '#ff6b35', inputValue: '' },
    ]);
  
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  
    const handleCheckboxChange = (index) => {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = { ...newItems[index], checked: !newItems[index].checked };
        return newItems;
      });
    };
  
    const handleInputChange = (index, value) => {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = { ...newItems[index], inputValue: value };
        return newItems;
      });
    };
  
    return (
      <div>
        {items.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary
              aria-controls={`panel${index + 1}d-content`}
              id={`panel${index + 1}d-header`}
              expandIcon={
                <Checkbox
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(index)}
                  color="primary"
                  inputProps={{ 'aria-label': 'checkbox' }}
                />
              }
            >
              <Typography>{item.label}</Typography>
              {item.checked && (
                <FiberManualRecordIcon style={{ color: item.iconColor, marginLeft: '8px' }} />
              )}
            </AccordionSummary>
            <AccordionDetails>
              <input
                type="text"
                value={item.inputValue}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </AccordionDetails>
            {item.checked && (
              <AccordionDetails>
                <Typography>{item.inputValue}</Typography>
              </AccordionDetails>
            )}
          </Accordion>
        ))}
      </div>
    );
  }






const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#3f5a68', 0.15),
  '&:hover': {
    backgroundColor: alpha('#3f5a68', 0.25),
  },
  marginLeft: 0,
  marginTop: 10,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#477b96',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 2),
    paddingLeft: theme.spacing(6),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

function LocationSearchInput({ placeholder, value, onChange }) {
  return (
    <PlacesAutocomplete value={value} onChange={onChange}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            {...getInputProps({
              placeholder: placeholder,
              className: 'location-search-input',
            })}
            inputProps={{ 'aria-label': 'search' }}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              return (
                <div key={index} {...getSuggestionItemProps(suggestion)}>
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </Search>
      )}
    </PlacesAutocomplete>
  );
}

function MapPage() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ['places'],
  });

  const center = useMemo(() => ({ lat: 40.7484, lng: -73.9857 }), []);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [showMarkers, setShowMarkers] = useState(true);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');



    // fetch restaurants data
useEffect(() => {
  if (isLoaded) {
    fetch('http://127.0.0.1:8000/api/googleAttractions/')
      .then((response) => response.json())
      .then((data) => {
        const newMarkers = data.map((attraction) => ({
          id: attraction.name,
          position: {
            lat: attraction.latitude,
            lng: attraction.longitude,
          },
          title: attraction.name,
          info: {
            address: attraction.address,
            rating: attraction.rating,
            photos: attraction.photos,
          },
          options: {
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#efefd0', // Color for restaurants  黄
              fillOpacity: 0.7,
              strokeColor: 'white',
              strokeWeight: 1,
              scale: 8,
            },
          },
        }));
        setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
      })
      .catch((error) => {
        console.error(error);
        setMarkers([]); // Clear markers if there's an error
      });
  }
}, [isLoaded]);


// fetch hotel data
    // useEffect(() => {
    //   if (isLoaded) {
    //     fetch('http://127.0.0.1:8000/api/hotels/')
    //       .then((response) => response.json())
    //       .then((data) => {
    //         const newMarkers = data.results.map((hotel) => ({
    //           id: hotel.fsq_id,
    //           position: {
    //             lat: hotel.geocodes.main.latitude,
    //             lng: hotel.geocodes.main.longitude,
    //           },
    //           title: hotel.name,
    //           info: {
    //             categories: hotel.categories,
    //             address: hotel.location.address,
    //             link: hotel.link,
    //           },
    //           options: {
    //             icon: {
    //               path: window.google.maps.SymbolPath.CIRCLE,
    //               fillColor: '#efefd0', // Color for hotels
    //               fillOpacity: 0.7,
    //               strokeColor: 'white',
    //               strokeWeight: 1,
    //               scale: 8,
    //             },
    //           },
    //         }));
    //         setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         setMarkers([]); // Clear markers if there's an error
    //       });
    //   }
    // }, [isLoaded]);

    useEffect(() => {
      if (isLoaded) {
        fetch('http://127.0.0.1:8000/api/googleHotels')
          .then((response) => response.json())
          .then((data) => {
            const newMarkers = data.map((hotel) => ({
              id: hotel.name,
              position: {
                lat: hotel.latitude,
                lng: hotel.longitude,
              },
              title: hotel.name,
              info: {
                address: hotel.address,
                rating: hotel.rating,
                 photos: hotel.photos,
              },
              options: {
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: '#ff6b35', // Set the desired color for Google restaurants 橘
                  fillOpacity: 0.9,
                  strokeColor: 'white',
                  strokeWeight: 1,
                  scale: 8,
                },
              },
            }));
            setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
          })
          .catch((error) => {
            console.error(error);
            setMarkers([]); // Clear markers if there's an error
          });
      }
    }, [isLoaded]);



    // fetch googleRestaurants data
    useEffect(() => {
      if (isLoaded) {
        fetch('http://127.0.0.1:8000/api/googleRestaurants/')
          .then((response) => response.json())
          .then((data) => {
            const newMarkers = data.map((restaurant) => ({
              id: restaurant.name,
              position: {
                lat: restaurant.latitude,
                lng: restaurant.longitude,
              },
              title: restaurant.name,
              info: {
                address: restaurant.address,
                rating: restaurant.rating,
                 photos: restaurant.photos,
              },
              options: {
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: '#06d6a0', // Set the desired color for Google restaurants 绿
                  fillOpacity: 0.6,
                  strokeColor: 'white',
                  strokeWeight: 1,
                  scale: 8,
                },
              },
            }));
            setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
          })
          .catch((error) => {
            console.error(error);
            setMarkers([]); // Clear markers if there's an error
          });
      }
    }, [isLoaded]);

    //  fetch the  real time weather data
    const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data from the API
    fetch('http://127.0.0.1:8000/api/weather/')
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error(error));
  }, []);

  function getImageUrl(weatherType) {
    if (weatherType === "Thunderstorm") {
      return "https://openweathermap.org/img/wn/11d@2x.png";
    } else if (weatherType === "Drizzle") {
      return "https://openweathermap.org/img/wn/09d@2x.png";
    } else if (weatherType === "Rain") {
      return "https://openweathermap.org/img/wn/10d@2x.png";
    } else if (weatherType === "Snow") {
      return "https://openweathermap.org/img/wn/13d@2x.png";
    } else if (weatherType === "Clear") {
      return "https://openweathermap.org/img/wn/01d@2x.png";
    } else if (weatherType === "Clouds") {
      return "https://openweathermap.org/img/wn/02d@2x.png";
    } else {
      return "https://openweathermap.org/img/wn/50d@2x.png";
    }
  }

  const formattedDate = weatherData
    ? new Date(weatherData.timestamp * 1000).toLocaleDateString()
    : '';



      useEffect(() => {
        if (originInput) {
          const handleSelect = async (value) => {
            try {
              const results = await geocodeByAddress(value, {
                circle: {
                  lat: center.lat,
                  lng: center.lng,
                  radius: 40000, // 40 km radius
                },
              });
              const latLng = await getLatLng(results[0]);
              setOrigin(latLng);
            } catch (error) {
              console.log(error);
            }
          };

          handleSelect(originInput);
        }
      }, [originInput]);

      useEffect(() => {
        if (destinationInput) {
          const handleSelect = async (value) => {
            try {
              const results = await geocodeByAddress(value, {
                circle: {
                  lat: center.lat,
                  lng: center.lng,
                  radius: 40000, // 40 km radius
                },
              });
              const latLng = await getLatLng(results[0]);
              setDestination(latLng);
            } catch (error) {
              console.log(error);
            }
          };

          handleSelect(destinationInput);
        }
      }, [destinationInput]);





  const handleMarkerClick = (marker) => {
    if (origin === null) {
      setOrigin(marker.position);
    } else {
      setDestination(marker.position);
    }
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
    setOrigin(null);
    setDestination(null);
    setDirections(null);
  };

  const handleDirectionsResponse = (response) => {
    if (response !== null) {
      setDirections(response);
  
      const leg = response.routes[0]?.legs[0];
      if (leg) {
        setDistance(leg.distance?.text || '');
        setDuration(leg.duration?.text || '');
      } else {
        setDistance('');
        setDuration('');
      }
    }
  };

  const handleSearch = () => {
    if (origin && destination) {
      setShowMarkers(false);
      handleSearchii();
    }
  };

  const handleSearchii = () => {
    if (origin && destination) {
      setShowMarkers(false);
  
      // Perform routing using DirectionsService
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            setDirections(response);
          } else {
            console.error('Error:', status);
          }
        }
      );
    }
  };

  const distanceText = directions?.routes[0]?.legs[0]?.distance?.text || '';
  const durationText = directions?.routes[0]?.legs[0]?.duration?.text || '';
  return (
    <div style={{ margin: '0 0px', color: '#1C2541' }}>
    <div className='fixed-box'>
    
    <div id="info01">
      <div>
      {weatherData ? (
        <div>
          <img src={getImageUrl(weatherData.main_weather)} alt={weatherData.main_weather} />
          <strong>{formattedDate}: {weatherData.main_weather}, {Math.round(weatherData.temperature - 273.15)}°C</strong>
        </div>
      ) : (
        <strong>Loading weather data...</strong>
      )}
    </div>
      <div>
        <LocationSearchInput
          placeholder="Enter current location here..."
          value={originInput}
          onChange={setOriginInput}
        />
        <LocationSearchInput
          placeholder="Enter destination here..."
          value={destinationInput}
          onChange={setDestinationInput}
        />

        <Button 
          variant="outlined" 
          size="medium" 
          onClick={handleSearch} 
          disabled={!origin || !destination} 
          style={{ marginTop: '20px' }}
        >
          Toggle Markers
        </Button>
        <Button 
          variant="outlined" 
          size="medium" 
          onClick={handleSearchii} 
          disabled={!origin || !destination} 
          style={{ marginTop: '20px' }}
        >
          Search
        </Button>
      </div>
      {origin && destination && !directions &&  (
        <div style={{ marginTop: '20px' }}>
          <p>Distance: {distanceText}</p>
          <p>Time to walk: {durationText}</p>
        </div>
      )}
      </div>
      </div>
      <div style={{display:"flex"}}>
      <div style={{flex:1}}>
     <TemporaryDrawer />
    </div>

      {/* map div */}
      <div style={{ marginTop: '20px', height: '800px' ,flex:"2"}}>
        {!isLoaded ? (
          <div>Loading...</div>
        ) : (
          <GoogleMap
            mapContainerStyle={{ height: '100%' }}
            center={center}
            zoom={13}
            mapId="MAPS_API_KEY"
            options={{
              styles: [
                {
                  featureType: 'all',
                  stylers: [
                    { saturation: 0 },
                    { hue: '#e3f2fd' },
                  ],
                },
                {
                  featureType: 'road',
                  stylers: [{ saturation: -70 }],
                },
                {
                  featureType: 'transit',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'poi',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'water',
                  stylers: [
                    { visibility: 'simplified' },
                    { saturation: -60 },
                  ],
                },
              ],
            }}
          >
            {origin && destination && !directions && showMarkers && (
              <DirectionsService
                options={{
                  origin: origin,
                  destination: destination,
                  travelMode: 'DRIVING',
                }}
                callback={handleDirectionsResponse}
              />
            )}
            {directions && (
              <DirectionsRenderer
                options={{
                  directions: directions,
                }}
              />
            )}
            {showMarkers &&
              markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  title={marker.title}
                  onClick={() => handleMarkerClick(marker)}
                  options={marker.options}
                  
                >
                  {selectedMarker === marker && (
                    <InfoWindow
                      position={selectedMarker.position}
                      onCloseClick={handleInfoWindowClose}
                    >
                      {/* <div>
                        <h3>{selectedMarker.title}</h3>
                        <p>Categories: {selectedMarker.info.categories.map(category => category.name).join(', ')}</p>
                        <p>Address: {selectedMarker.info.address}</p>
                        <p>
                          Link: <a href={selectedMarker.info.link}>{selectedMarker.info.link}</a>
                        </p>
                      </div> */}
                         <div>
                        <h3>{selectedMarker.title}</h3>
                        {selectedMarker.info && ( // Add a check for the existence of info object
                          <div>
                            <p>Address: {selectedMarker.info.address}</p>
                            <p>Rating: {selectedMarker.info.rating}</p>
                            {selectedMarker.info.photos && selectedMarker.info.photos.length > 0 && (
          <img
            src={selectedMarker.info.photos[0]} // Display the first photo in the photos array
            alt={selectedMarker.title}
          />
        )}
                          </div>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
          </GoogleMap>
        )}
      </div>
      </div>
    </div>
  );
}

export default MapPage;
