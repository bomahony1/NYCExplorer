
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomePage from './HomePage';
import MapPage from './MapPage';
import ItineraryPage from './ItineraryPage';


export default function MainMenu() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let content;
  if (value === 0) {
    content = <HomePage />;
  } else if (value === 1) {
    content = <MapPage />;
  } else if (value === 2) {
    content = <ItineraryPage />;
  }

  return (
    <Box >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)' // Add shadow effect to the border
        }}
      >
        <Tab
          label="Home"
          icon={<HomeOutlinedIcon />}
          sx={{ color: '#1C2541' }} // Customize the font color of the tab
        />
        <Tab
          label="Map"
          icon={<SearchIcon />}
          sx={{ color: '#1C2541' }} // Customize the font color of the tab
        />
        <Tab
          label="Itinerary"
          icon={<PersonPinIcon />}
          sx={{ color: '#1C2541' }} // Customize the font color of the tab
        />
      </Tabs>
      <Box sx={{ bgcolor: 'white' }}>{content}</Box>
    </Box>
  );
}
