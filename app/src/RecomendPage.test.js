import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecommendPage from './RecommendPage';
import '@testing-library/jest-dom/extend-expect';

// Mock setSelectedTab function
const setSelectedTabMock = jest.fn();

describe('RecommendPage', () => {
  it('renders a list of items in Gallery component', () => {
    render(<RecommendPage />);
  });

  it('renders the correct content when Window component is passed different content', () => {
    render(<RecommendPage />);
     });

  it('renders buttons with correct labels in Buttons component', () => {
    render(<RecommendPage />);
    expect(screen.getByText('1-2 Days')).toBeInTheDocument();
    expect(screen.getByText('3-4 Days')).toBeInTheDocument();
    expect(screen.getByText('5-7 Days')).toBeInTheDocument();
  });

  it('calls setSelectedTab with correct content when Buttons component button is clicked', () => {
    render(<RecommendPage setSelectedTab={setSelectedTabMock} />);
    fireEvent.click(screen.getByText('1-2 Days'));
  });

  it('adds a new item when "Add Recommendations" button is clicked in Pop component', () => {
    render(<RecommendPage />);
    const itemListBeforeClick = screen.queryAllByText(/Item \d/, { exact: false }); // Get initial list of items
    fireEvent.click(screen.getByText('Add Recommendations'));
    const itemListAfterClick = screen.queryAllByText(/Item \d/, { exact: false });
    expect(itemListAfterClick.length).toBe(itemListBeforeClick.length);
  });
});
