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

test('carousel displays events', () => {
  const mockEvents = [
    {
      name: 'Event 1',
      date: '2023-08-25',
      time: '14:00',
      image: 'https://example.com/event1.jpg',
      url: 'https://example.com/event1',
    },
    {
      name: 'Event 2',
      date: '2023-08-29',
      time: '19:30',
      image: 'https://example.com/event2.jpg',
      url: 'https://example.com/event2',
    },
    {
      name: 'Event 3',
      date: '2023-08-30',
      time: '10:00',
      image: 'https://example.com/event3.jpg',
      url: 'https://example.com/event3',
    },
  ];

  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(mockEvents),
  });

  render(<HomePage />);

  const eventNames = mockEvents.map((event) => event.name);
  eventNames.forEach((eventName) => {
    const eventElement = screen.getByText(eventName);
    expect(eventElement).toBeInTheDocument();
  });
});

test('list of attractions displays', async () => {
  const mockAttractions = [
    {
      name: 'Attraction 1',
      address: '123 Main St',
      rating: 4.5,
      photos: ['https://example.com/attraction1.jpg'],
      open: '09:00',
      close: '18:00',
    },
    {
      name: 'Attraction 2',
      address: '456 Elm St',
      rating: 4.2,
      photos: ['https://example.com/attraction2.jpg'],
      open: '10:00',
      close: '17:00',
    },
    {
      name: 'Attraction 3',
      address: '789 Oak St',
      rating: 4.8,
      photos: ['https://example.com/attraction3.jpg'],
      open: '08:30',
      close: '19:30',
    },
  ];

  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(mockAttractions),
  });

  render(<HomePage />);

  for (const attraction of mockAttractions) {
    const attractionName = await screen.findByText(attraction.name);
    expect(attractionName).toBeInTheDocument();

    const attractionAddress = screen.getByText(`Address: ${attraction.address}`);
    expect(attractionAddress).toBeInTheDocument();

    const attractionRating = screen.getByText(`Rating: ${attraction.rating}`);
    expect(attractionRating).toBeInTheDocument();
  }
});

test('images grid displays', () => {
  render(<HomePage />);

  const imageElements = screen.getAllByAltText('');
  expect(imageElements.length).toBeGreaterThanOrEqual(1);
});