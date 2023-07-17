import React, { useMemo, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { MAPS_API_KEY } from './login.js';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Button from '@mui/material/Button';
import TemporaryDrawer from './TemporaryDrawer';




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
    // useEffect(() => {
    //   if (isLoaded) {
    //     fetch('http://127.0.0.1:8000/api/restaurants/')
    //       .then((response) => response.json())
    //       .then((data) => {
    //         const newMarkers = data.results.map((restaurant) => ({
    //           id: restaurant.fsq_id,
    //           position: {
    //             lat: restaurant.geocodes.main.latitude,
    //             lng: restaurant.geocodes.main.longitude,
    //           },
    //           title: restaurant.name,
    //           info: {
    //             categories: restaurant.categories,
    //             address: restaurant.location.address,
    //             link: restaurant.link,
    //           },
    //           options: {
    //             icon: {
    //               path: window.google.maps.SymbolPath.CIRCLE,
    //               fillColor: '#ff6b35', // Color for restaurants
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


    // fetch restaurants data
useEffect(() => {
  if (isLoaded) {
    fetch('http://127.0.0.1:8000/api/googleAttractions/')
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
              fillColor: '#ff6b35', // Color for restaurants
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


    // fetch hotels data
    useEffect(() => {
      if (isLoaded) {
        fetch('http://127.0.0.1:8000/api/hotels/')
          .then((response) => response.json())
          .then((data) => {
            const newMarkers = data.results.map((hotel) => ({
              id: hotel.fsq_id,
              position: {
                lat: hotel.geocodes.main.latitude,
                lng: hotel.geocodes.main.longitude,
              },
              title: hotel.name,
              info: {
                categories: hotel.categories,
                address: hotel.location.address,
                link: hotel.link,
              },
              options: {
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: '#efefd0', // Color for hotels
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
              },
              options: {
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: '#f7c59f', // Set the desired color for Google restaurants
                  fillOpacity: 0.8,
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
    <div style={{ margin: '0 50px', color: '#1C2541' }}>
    <div className='fixed-box'>
    <div>
     <TemporaryDrawer />
    </div>
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
      {/* map div */}
      <div style={{ marginTop: '20px', height: '800px' }}>
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
  );
}

export default MapPage;
