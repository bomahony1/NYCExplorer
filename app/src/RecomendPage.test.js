import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MapPage from './MapPage';
import '@testing-library/jest-dom/extend-expect';


jest.mock('./array.ts', () => ({
  removeItem: jest.fn(),
}));

describe('MapPage', () => {
  it('renders a list of items in Gallery component', () => {
    const mockItems = [
      { id: 1, text: 'Item 1', imageAlt: 'Image 1' },
      { id: 2, text: 'Item 2', imageAlt: 'Image 2' },
      { id: 3, text: 'Item 3', imageAlt: 'Image 3' },
      { id: 4, text: 'Item 4', imageAlt: 'Image 4' },
      { id: 5, text: 'Item 5', imageAlt: 'Image 5' },
    ];

    render(<MapPage />);
    const galleryItems = screen.getAllByText(/Item \d/); 

    expect(galleryItems.length).toBe(mockItems.length);
  });

  it('renders the correct content when Window component is passed different content', () => {
    render(<MapPage />);
    
    fireEvent.click(screen.getByText('1-2 Days'));
  
  });

  it('renders buttons with correct labels in Buttons component', () => {
    render(<MapPage />);
    expect(screen.getByText('1-2 Days')).toBeInTheDocument();
    expect(screen.getByText('3-4 Days')).toBeInTheDocument();
    expect(screen.getByText('5-7 Days')).toBeInTheDocument();
  });

  it('calls setSelectedTab with correct content when Buttons component button is clicked', () => {
    const setSelectedTabMock = jest.fn();
    render(<MapPage setSelectedTab={setSelectedTabMock} />);
    fireEvent.click(screen.getByText('1-2 Days'));
    expect(setSelectedTabMock).toHaveBeenCalledWith('Content for 1-2 Days');
  });

  it('adds a new item when "POP Recommendations" button is clicked in Pop component', () => {
    render(<MapPage />);
    const itemListBeforeClick = screen.queryAllByText(/Item \d/, { exact: false }); 
    fireEvent.click(screen.getByText('POP Recommendations'));
    const itemListAfterClick = screen.queryAllByText(/Item \d/, { exact: false });
    expect(itemListAfterClick.length).toBe(itemListBeforeClick.length + 1);
  });
});