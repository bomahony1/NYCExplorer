import React, { useMemo, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { MAPS_API_KEY } from './login.js';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Dialog, DialogTitle, DialogContent,Paper,Button, Box, Link} from '@mui/material';
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
import Autosuggest from 'react-autosuggest';
import './MapPage.css';
import { useDrag } from 'react-dnd';

const handleDragStart = (event, data) => {
  event.dataTransfer.setData('text/plain', JSON.stringify(data));
};




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
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [isWindowOpen, setWindowOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const allowDrop = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, date) => {
    event.preventDefault();
    event.stopPropagation();
    const placeData = JSON.parse(event.dataTransfer.getData('text/plain'));
    const content = `<div>${placeData.name} - ${placeData.rating}</div>`;
    event.target.innerHTML += content;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  

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
      for (let i = 0; i <=days; i++) {
        const currentDate = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24));
        const dayString = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        dateContent.push(
          <div key={i} className="day-container" onDrop={(event) => handleDrop(event, currentDate)} onDragOver={allowDrop}>
            <h4>{dayString}</h4>
            <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ background: "lightgrey", padding: "10px", marginTop: "10px" }}
          >
            Drag a place here to add it
          </div>
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
      {isDrawerOpen && (
        <div style={{ display: 'flex' }}>

          <div style={{ width: '300px', background: 'white' }}>
            <h3>New York Trip</h3>
            <Divider />
            <button onClick={toggleWindow}>Open Day Planner</button>
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
    const [expanded, setExpanded] = useState('attractions');
    const [attractions, setAttractions] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [attractionValue, setAttractionValue] = useState('');
    const [restaurantValue, setRestaurantValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const [selectedRestaurants, setSelectedRestaurants] = useState([]);
    const [attractionsChecked, setAttractionsChecked] = useState(false);
    const [restaurantsChecked, setRestaurantsChecked] = useState(false);
    // 
    



    

    
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/googleAttractions/')
        .then((response) => response.json())
        .then((data) => setAttractions(data))
        .catch((error) => console.error(error));
  
      fetch('http://127.0.0.1:8000/api/googleRestaurants/')
        .then((response) => response.json())
        .then((data) => setRestaurants(data))
        .catch((error) => console.error(error));
    }, []);
  
    const getAttractionSuggestions = (inputValue) => {
      const inputValueLowerCase = inputValue.toLowerCase();
      return attractions.filter(
        (attraction) =>
          attraction.name.toLowerCase().includes(inputValueLowerCase) ||
          attraction.address.toLowerCase().includes(inputValueLowerCase)
      );
    };
  
    const getRestaurantSuggestions = (inputValue) => {
      const inputValueLowerCase = inputValue.toLowerCase();
      return restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(inputValueLowerCase) ||
          restaurant.address.toLowerCase().includes(inputValueLowerCase)
      );
    };
  
    const getAttractionSuggestionValue = (suggestion) => suggestion.name;
  
    const getRestaurantSuggestionValue = (suggestion) => suggestion.name;
    


    const renderAttractionSuggestion = (suggestion, { isHighlighted }) => (
      <div
        className={`suggestion ${isHighlighted ? 'suggestion-hover' : ''}`}
        onClick={() => handleSelectSuggestion(suggestion, 'attractions')}
        draggable
        onDragStart={(event) => handleDragStart(event, suggestion)}
      >
        <div>{suggestion.name}</div>
        <div>Rating: {suggestion.rating}</div>
      </div>
    );
    
    const renderRestaurantSuggestion = (suggestion, { isHighlighted }) => (
      <div
        className={`suggestion ${isHighlighted ? 'suggestion-hover' : ''}`}
        onClick={() => handleSelectSuggestion(suggestion, 'restaurants')}
        draggable
        onDragStart={(event) => handleDragStart(event, suggestion)}
      >
        <div>{suggestion.name}</div>
        <div>Rating: {suggestion.rating}</div>
      </div>
    );
    
  
    const handleChange = (panel) => (event, newExpanded) => {
      if (panel === 'attractions') {
        setAttractionsChecked(newExpanded);
      } else if (panel === 'restaurants') {
        setRestaurantsChecked(newExpanded);
      }
      setExpanded(newExpanded ? panel : false);
    };
    
  
    const handleInputChange = (section) => (event, { newValue }) => {
      if (section === 'attractions') {
        setAttractionValue(newValue);
      } else if (section === 'restaurants') {
        setRestaurantValue(newValue);
      }
    };
  
    const handleSelectSuggestion = (suggestion, section) => {
      if (section === 'attractions') {
        const isAlreadySelected = selectedAttractions.some((attraction) => attraction.name === suggestion.name);
        if (!isAlreadySelected) {
          setSelectedAttractions((prevAttractions) => [...prevAttractions, suggestion]);
          setAttractionValue('');
        }
      } else if (section === 'restaurants') {
        const isAlreadySelected = selectedRestaurants.some((restaurant) => restaurant.name === suggestion.name);
        if (!isAlreadySelected) {
          setSelectedRestaurants((prevRestaurants) => [...prevRestaurants, suggestion]);
          setRestaurantValue('');
        }
      }
    };
  
    const handleRemoveAttraction = (index) => {
      setSelectedAttractions((prevAttractions) => prevAttractions.filter((_, i) => i !== index));
    };
  
    const handleRemoveRestaurant = (index) => {
      setSelectedRestaurants((prevRestaurants) => prevRestaurants.filter((_, i) => i !== index));
    };
  
    const attractionInputProps = {
      placeholder: 'Search attractions',
      value: attractionValue,
      onChange: handleInputChange('attractions'),
    };
  
    const restaurantInputProps = {
      placeholder: 'Search restaurants',
      value: restaurantValue,
      onChange: handleInputChange('restaurants'),
    };
  
    return (
      <div>
        <Accordion expanded={expanded === 'attractions'} onChange={handleChange('attractions')}>
            <AccordionSummary
              aria-controls="attractions-content"
              id="attractions-header"
              expandIcon={
                <Checkbox
                  color="primary"
                  inputProps={{ 'aria-label': 'checkbox' }}
                  checked={attractionsChecked}
                />
              }
            >
              <Typography>Attractions</Typography>
              <div
                className="label-circle"
                style={{ backgroundColor: attractionsChecked ? '#fdffb6' : 'transparent' }}
              ></div>
            </AccordionSummary>

          <AccordionDetails>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={({ value }) => {
                setSuggestions(getAttractionSuggestions(value));
              }}
              onSuggestionsClearRequested={() => {
                setSuggestions([]);
              }}
              getSuggestionValue={getAttractionSuggestionValue}
              renderSuggestion={renderAttractionSuggestion}
              inputProps={attractionInputProps}
            />
          </AccordionDetails>
        </Accordion>
        <div className='itin-attraction'>
          {selectedAttractions.map((attraction, index) => (
            <div key={index} className="attraction-item">
              <div className="attraction-name">{attraction.name}</div>
              <div>Rating: {attraction.rating}</div>
              <div className="photo-container">
                <img src={attraction.photos[0]} alt={attraction.name} className="attraction-photo" />
                </div>
                <div><button onClick={() => handleRemoveAttraction(index)}>Remove</button></div>
            </div>
          ))}
        </div>
        <Accordion expanded={expanded === 'restaurants'} onChange={handleChange('restaurants')}>
          <AccordionSummary
            aria-controls="restaurants-content"
            id="restaurants-header"
            expandIcon={
              <Checkbox
                color="primary"
                inputProps={{ 'aria-label': 'checkbox' }}
                checked={restaurantsChecked}
              />
            }
            >
            <Typography>Restaurants</Typography>
            <div
              className="label-circle"
              style={{ backgroundColor: restaurantsChecked ? '#06d6a0' : 'transparent' }}
            ></div>
          </AccordionSummary>
          <AccordionDetails>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={({ value }) => {
                setSuggestions(getRestaurantSuggestions(value));
              }}
              onSuggestionsClearRequested={() => {
                setSuggestions([]);
              }}
              getSuggestionValue={getRestaurantSuggestionValue}
              renderSuggestion={renderRestaurantSuggestion}
              inputProps={restaurantInputProps}
            />
          </AccordionDetails>
        </Accordion>
        <div>
          {selectedRestaurants.map((restaurant, index) => (
            <div key={index} className="restaurant-item">
              <div className="restaurant-name">{restaurant.name}</div>
              <div>Rating: {restaurant.rating}</div>
              <div className="photo-container">
                <img src={restaurant.photos[0]} alt={restaurant.name} className="restaurant-photo" />
                </div>
                <div><button onClick={() => handleRemoveRestaurant(index)}>Remove</button></div>
            </div>
          ))}
        </div>
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
