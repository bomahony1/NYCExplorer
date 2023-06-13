import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, List, ListItemButton ,ListItemText, ListSubheader, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
    <div style={{textAlign: 'center', marginTop: "30px" }}>
      <Card >
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            width= "999"
            image=""
            alt=""
            padding="10px"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Today:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Example of headline related to Today
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Bring me there
          </Button>
        </CardActions>
      </Card>
    </div>
    <div style={{ marginTop: "30px" }}>
         <NestedList /></div>
    </div>
    </div>
  );
}

export default HomePage;
