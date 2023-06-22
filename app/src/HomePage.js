import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, List, ListItemButton, ListItemText, ListSubheader, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import $ from 'jquery';

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
  

    return (
    <List
      sx={{ width: '100%', maxWidth: 999, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick1}>
        <ListItemText primary="Empire State Building" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      
      <ListItemButton onClick={handleClick2}>
        <ListItemText primary="Wall Street" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      
      <ListItemButton onClick={handleClick3}>
        <ListItemText primary="Time Square" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      
      <ListItemButton onClick={handleClick4}>
        <ListItemText primary="Statue of Liberty" />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

function HomePage() {
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventURL, setEventURL] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventImage, setEventImage] = useState('');

  useEffect(() => {
    // Make the AJAX request
    $.ajax({
      type: 'GET',
      url: 'https://app.ticketmaster.com/discovery/v2/events.json?size=1&city=boston&apikey=tpZiyonZeqnI84pouyaLdPeKLuwMQz4b',
      async: true,
      dataType: 'json',
      success: function (json) {
        console.log(json); // Print the API response to the console
        // Extract the event details from the response and update the component state
        const title = json?._embedded?.events?.[0]?.name || 'No event available';
        const location = json?._embedded?.events?.[0]?._embedded?.venues?.[0]?.name || 'Location not available';
        const url = json?._embedded?.events?.[0]?.url || '';
        const startTime = json?._embedded?.events?.[0]?.dates?.start?.localTime || '';
        const image = json?._embedded?.events?.[0]?.images?.[0]?.url || '';
        setEventTitle(title);
        setEventLocation(location);
        setEventURL(url);
        setEventStartTime(startTime);
        setEventImage(image);
      },
      error: function (xhr, status, err) {
        console.error(err);
      },
    });
  }, []);

  const handleBringMeThere = () => {
    window.open(eventURL, '_blank');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Card>
            <CardActionArea>
              <CardMedia component="img" height="150" width="999" image={eventImage} alt="" padding="10px" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Today: {eventTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Example of headline related to Today at {eventLocation}<br />
                  Start Time: {eventStartTime}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={handleBringMeThere}>
                Bring me there
              </Button>
            </CardActions>
          </Card>
        </div>
        <div style={{ marginTop: '30px' }}>
          <NestedList />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
