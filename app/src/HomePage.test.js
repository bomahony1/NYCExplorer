import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
  });

  it('displays the correct number of events', () => {
    render(<HomePage />);
    const events = screen.getAllByTestId('event-item');
    expect(events.length).toBe(5);
  });

  it('opens the attraction details when clicked', () => {
    render(<HomePage />);
    const listItemButtons = screen.getAllByTestId('list-item-button');


    fireEvent.click(listItemButtons[0]);
    expect(screen.getByTestId('attraction-details-1')).toBeInTheDocument();


    fireEvent.click(listItemButtons[2]);
    expect(screen.getByTestId('attraction-details-3')).toBeInTheDocument();
  });
});