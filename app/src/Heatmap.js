import React, { useState,useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { Button} from '@mui/material';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import L from 'leaflet';


const Heatmap = ({ onHeatmapDataReceived, heatmapVisible, onToggleHeatmap }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [lastSelectedDate, setLastSelectedDate] = useState(null);
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      console.log("Please select a date and time.");
      return;
    }
    
    if (selectedDate !== lastSelectedDate) {
        // Fetch heatmap data for the selected date
        fetchHeatmapData(selectedDate);
  
        // Update the last selected date
        setLastSelectedDate(selectedDate);
      }
    // Toggle heatmap visibility
    onToggleHeatmap();
  };

  useEffect(() => {
    if (!heatmapVisible) {
      setLastSelectedDate(null);
    }
  }, [heatmapVisible]);

  const fetchHeatmapData = (selectedDate) => {
    // Format the selected date to match the API's query string format
    const formData = {
      hour: selectedDate.format("H"), // Get the hour in 24-hour format
      day: selectedDate.date(),
      month: selectedDate.month() + 1,
    };

    const apiUrl = 'http://127.0.0.1:8000/api/heatMap/';
    const queryParams = new URLSearchParams(formData).toString();

    fetch(apiUrl + '?' + queryParams)
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data into an array of polygons with corresponding weights
      const polygonsWithWeights = data.prediction.map((zone) => {
        const coordinates = zone.coordinates.map(([lat, lng]) => [lat, lng]);
        return { coordinates, weight: zone.prediction };
      });

      // Send the processed heatmap data to the parent component
      onHeatmapDataReceived(polygonsWithWeights);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const getColor = (prediction) => {
    // Define your color ranges and breakpoints here
    const colors = ['#f7f7f7', '#fdd49e', '#fdbb84', '#fc8d59', '#e34a33', '#b30000'];
    const breakpoints = [1, 2, 3, 4, 5];
  
    // Find the appropriate color based on the prediction value
    return prediction === 0
      ? colors[0]
      : colors.find((color, index) => prediction <= breakpoints[index]) || colors[colors.length - 1];
  };
  
   

  return (
    <div style={{ marginTop: '20px',clor:"#1C2541"}}>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DateTimePicker
          label="Select month,day,hour"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          ampm={false} // Use 24-hour format
          minutes={false} // Hide the minutes component
          seconds={false} // Hide the seconds component
          
        />
      </LocalizationProvider>
      <Button
              variant="contained"
              size="media"
              onClick={handleSubmit}
              style={{ marginTop: '20px',backgroundColor: '#E0d5ec', color: '#ffffff' ,fontWeight: 'bold'}}
            >
            {heatmapVisible ? 'Hide Heatmap' : 'Predict Busyness'}
        </Button>
 
    </div>
  );
};

export default Heatmap;
