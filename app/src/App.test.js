import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the App component', () => {
  render(<App />);
  const learnReactElement = screen.getByText(/Learn React/i);
  expect(learnReactElement).toBeInTheDocument();
});