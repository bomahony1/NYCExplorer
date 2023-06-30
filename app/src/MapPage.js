import React, { useMemo, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { MAPS_API_KEY } from './login.js';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import attractionData from "./tourism.json";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

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

function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: 40.7128, lng: -74.0060 }), []);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      // Create markers array
      const newMarkers = attractionData.elements
        .filter(attraction => attraction.tags.name && attraction.tags.website) // Filter out attractions with no name or no website
        .map(attraction => ({
          id: attraction.id,
          position: { lat: attraction.lat, lng: attraction.lon },
          title: attraction.tags.name,
          info: {
            city: attraction.tags['addr:city'],
            country: attraction.tags['addr:country'],
            street: attraction.tags['addr:street'],
            website: attraction.tags.website,
          },
        }));
      // Update markers state
      setMarkers(newMarkers);
    }
  }, [isLoaded]);

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
    }
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
      <div style={{ marginTop: '20px', height: '600px' }}>
        {!isLoaded ? (
          <div>Loading...</div>
        ) : (
            <GoogleMap
              mapContainerStyle={{ height: '100%' }}
              center={center}
              zoom={12}
              mapId="DEMO_MAP_ID"
            >
              {origin && destination && (
                <DirectionsService
                  options={{
                    origin: origin,
                    destination: destination,
                    travelMode: "DRIVING",
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
              {markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  title={marker.title}
                  onClick={() => handleMarkerClick(marker)}
                >
                  {selectedMarker === marker && (
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
}

export default MapPage;
