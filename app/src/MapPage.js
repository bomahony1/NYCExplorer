import React, { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { MAPS_API_KEY } from 'login.js';

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
  useEffect(() => {
    // Load Google Maps API and call initMap after it's loaded
    const loadGoogleMapsAPI = () => {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key="+MAPS_API_KEY +"&callback=initMap";
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    };

    window.initMap = () => {
      const nyc = { lat: 40.7128, lng: -74.0060 };
      // The map, centered at NYC
      new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: nyc,
      });
    };

    loadGoogleMapsAPI();

    return () => {
      // Cleanup
      window.initMap = null;
    };
  }, []);

  return (
    <div>
      <div>
        <h1>New York Map</h1>
        <p>By searching in the search bar below or clicking on the map, you can access a detailed legend.</p>
      </div>
      <div>
        <SearchBar />
      </div>
      <div style={{ marginTop: '20px', height: '600px' }}>
        <div id="map" style={{ height: '100%' }}></div>
      </div>
    </div>
  );
}

export default MapPage;
