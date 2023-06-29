
import React, { useMemo,useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { MAPS_API_KEY } from './login.js';
import { GoogleMap, Marker, useLoadScript,InfoWindow } from "@react-google-maps/api";
import hotelsData from "./hotels.json";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
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
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function SearchBar() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}

// function MapPage() {
//   useEffect(() => {
//     const loadGoogleMapsAPI = () => {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap`;
//       script.defer = true;
//       script.async = true;
//       script.onerror = () => {
//         console.error('Failed to load Google Maps API.');
//       };
//       document.body.appendChild(script);
//     };

//     const initMap = () => {
//       const nyc = { lat: 40.7128, lng: -74.0060 };
//       new window.google.maps.Map(document.getElementById('map'), {
//         zoom: 12,
//         center: nyc,
//       });
//     };

//     // Check if the Google Maps API script is already loaded
//     if (!window.google || !window.google.maps) {
//       // Google Maps script not loaded yet, so load it
//       window.initMap = initMap;
//       loadGoogleMapsAPI();
//     } else {
//       // Google Maps script already loaded, so directly call initMap
//       initMap();
//     }

//     return () => {
//       // Cleanup
//       window.initMap = null;
//     };
//   }, []);

//   // Set a flag to track whether the Google Maps API error has occurred
//   const [apiError, setApiError] = useState(false);

//   useEffect(() => {
//     // Handle the error by setting the flag
//     const handleError = () => {
//       setApiError(true);
//     };

//     // Add an event listener for error events on the Google Maps API script
//     window.addEventListener('error', handleError);

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener('error', handleError);
//     };
//   }, []);

//   return (
//     <div>
//       <div>
//         <h1>New York Map</h1>
//         <p>By searching in the search bar below or clicking on the map, you can access a detailed legend.</p>
//       </div>
//       <div>
//         <SearchBar />
//       </div>
//       <div style={{ marginTop: '20px', height: '600px' }}>
//         {apiError ? (
//           <div>There was an error loading the map.</div>
//         ) : (
//           <div id="map" style={{ height: '100%' }}></div>
//         )}
//       </div>
//     </div>
//   );
// }
function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: 40.7128, lng: -74.0060 }), []);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      // Create markers array
      const newMarkers = hotelsData.elements.map((hotel) => ({
        id: hotel.id,
        position: { lat: hotel.lat, lng: hotel.lon },
        title: hotel.tags.name,
        info: {
          city: hotel.tags['addr:city'],
          country: hotel.tags['addr:country'],
          street: hotel.tags['addr:street'],
          website: hotel.tags.website,
        },
      }));
      // Update markers state
      setMarkers(newMarkers);
    }
  }, [isLoaded]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <div>
      <div>
        <h1>New York Map</h1>
        <p>
          By searching in the search bar below or clicking on the map, you can
          access a detailed legend.
        </p>
      </div>
      <div>
        <SearchBar />
      </div>
      {/* Map initialization code */}
      <div style={{ marginTop: '20px', height: '600px' }}>
        {!isLoaded ? (
          <div>Loading...</div>
        ) : (
          <GoogleMap
            mapContainerStyle={{ height: '100%' }}
            center={center}
            zoom={12}
            mapId= "DEMO_MAP_ID"
          >
             {/* Add markers or additional map components here */}
              {/* Add markers with associated info windows */}
              {markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  title={marker.title}
                  onClick={() => handleMarkerClick(marker)} // Add onClick event handler
                >
                  {selectedMarker === marker && ( // Render InfoWindow if selectedMarker matches the current marker
                    <InfoWindow
                      position={selectedMarker.position}
                      onCloseClick={handleInfoWindowClose}
                    >
                      <div>
                        <h3>{selectedMarker.title}</h3>
                        <p>City: {selectedMarker.info.city}</p>
                        <p>Country: {selectedMarker.info.country}</p>
                        <p>Street: {selectedMarker.info.street}</p>
                        <p>
                          Website: <a href={selectedMarker.info.website}>{selectedMarker.info.website}</a>
                        </p>
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
};

export default MapPage;