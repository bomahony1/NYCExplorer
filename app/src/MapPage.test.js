import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MapPage from './MapPage';



describe('MapPage Component', () => {

  it('should render MapPage component', () => {
    render(<MapPage />);
    const mapPageElement = screen.getByTestId('map-page');
    expect(mapPageElement).toBeInTheDocument();
  });

  it('should open DateRangePicker dialog when the button is clicked', () => {
    render(<MapPage />);
    const dateRangeButton = screen.getByRole('button', { name: /Date Range Picker/i });
    fireEvent.click(dateRangeButton);
    const dialogTitle = screen.getByText(/Select Date Range/i);
    expect(dialogTitle).toBeInTheDocument();
  });


  it('should show suggestions for attractions', async () => {
    render(<MapPage />);
    const attractionInput = screen.getByPlaceholderText(/Search attractions/i);
    fireEvent.change(attractionInput, { target: { value: 'Central Park' } });
  });


  it('should allow dragging and dropping places into the itinerary', () => {
    render(<MapPage />);
    const attractionItem = screen.getByText(/Central Park/i);
    const itineraryDayContainer = screen.getByText(/Day 1/i);
    fireEvent.dragStart(attractionItem);
    fireEvent.dragOver(itineraryDayContainer);
    fireEvent.drop(itineraryDayContainer);
    const addedPlace = screen.getByText(/Central Park - Rating: 4.5/i);
    expect(addedPlace).toBeInTheDocument();
  });


  it('should remove a place from the itinerary when the remove button is clicked', () => {
    render(<MapPage />);
    const removeButton = screen.getByRole('button', { name: /Remove/i });
    fireEvent.click(removeButton);
    const removedPlace = screen.queryByText(/Central Park - Rating: 4.5/i);
    expect(removedPlace).not.toBeInTheDocument();
  });
  

});