// import { Typography, Link, Grid } from "@mui/material";
// import React, {useState} from "react";
// import HomePage from "./HomePage";
// import MapPage from "./MapPage";
// import ItineraryPage from "./ItineraryPage";


// function MainMenu() {
//     let content;
//     const [flag, setFlag] = useState(0);

//     if (flag === 0) {
//         content = <HomePage />
//     } else if (flag === 1) {
//         content = <MapPage />
//     } else if (flag === 2) {
//         content = <ItineraryPage />
//     }
//     return (
//         <div style={{margin: '10px'}}>
//             <Grid container direction="column" sx={{ padding: '50px' }}>
//                 <Grid item>
//                     <Typography>
//                         <Link href="#" onClick={() => setFlag(0)} sx={{ marginRight: "1rem" }}>
//                             Home
//                         </Link>
//                         <Link href="#" onClick={() => setFlag(1)} sx={{ marginRight: "1rem" }}>
//                             Map
//                         </Link>
//                         <Link href="#" onClick={() => setFlag(2)} sx={{ marginRight: "1rem" }}>
//                             Itinerary
//                         </Link>

//                     </Typography>
//                 </Grid>
//                 <Grid item sx={{ bgcolor: 'white'}}>
//                     {content}
//                 </Grid>
//             </Grid>     
//         </div>       
//     );
// }


// export default MainMenu;


import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PersonIcon from '@mui/icons-material/Person';
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
    <Box sx={{ margin: '10px' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Home" icon={<HomeOutlinedIcon />} />
        <Tab label="Map" icon={<SearchIcon />} />
        <Tab label="Itinerary" icon={<PersonPinIcon />} />
      </Tabs>
      <Box sx={{ bgcolor: 'white' }}>{content}</Box>
    </Box>
  );
}

