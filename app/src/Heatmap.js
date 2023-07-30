import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { Button} from '@mui/material';

const Heatmap = ({ onHeatmapDataReceived, heatmapVisible, onToggleHeatmap }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      console.log("Please select a date and time.");
      return;
    }
    
    // Fetch heatmap data for the selected date
    fetchHeatmapData(selectedDate);

    // Toggle heatmap visibility
    onToggleHeatmap();
  };

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
        // Format the backend data to an array of LatLng objects
        const heatmapArray = Object.keys(data.prediction).map((latLng) => {
            const [lat, lng] = latLng.split(',').map((value) => parseFloat(value));
            const weight = data.prediction[latLng];
            if (isNaN(lat) || isNaN(lng)) {
              throw new Error('Invalid latLng format: ' + latLng);
            }
            return { lat, lng, weight };
          });
          onHeatmapDataReceived(heatmapArray);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
              Predict Busyness
        </Button>
 
    </div>
  );
};

export default Heatmap;
