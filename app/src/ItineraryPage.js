import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

function Buttons(){
    const buttons = [
        <Button key="one">1-3 Days</Button>,
        <Button key="two">4-6 Days</Button>,
        <Button key="three">7-10 Days</Button>,
      ];
    return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 2,
            },
          }}
        >
          <ButtonGroup size="large" aria-label="large button group">
            {buttons}
          </ButtonGroup>
        </Box>
      );
}

function cards(imageUrl, title,time, description) {
    return (
      <div>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100"
              image={imageUrl}
              alt=""
              padding="10px"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <Typography gutterBottom variant="h7" component="div">
                {time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
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
    );
  }
function ItineraryPage() {
    return (
        <div>
            <div>
                <h2>How many days are you planning to stay?</h2>
                <Buttons />
            </div>
            <div>
            <h1>New York Day 1</h1>
            </div>
            <div>
            {cards(
        'https://example.com/image1.jpg',
        'Breakfast',
        '9:00 AM - 9:30 AM',
        'Example description for card 1'
      )}
      {cards(
        'https://example.com/image2.jpg',
        'Attractions 1',
        '9:30 AM - 11:30 AM',
        'Example description for card 2'
      )}
      {cards(
        'https://example.com/image1.jpg',
        'Attractions 2',
        '11:30 AM - 1:30 PM',
        'Example description for card 1'
      )}
      {cards(
        'https://example.com/image2.jpg',
        'Lunch',
        '1:30 PM - 2:30 PM',
        'Example description for card 2'
      )}
            </div>
        </div>
    );
}

export default ItineraryPage;