import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('animation is initially shown', () => {
  render(<App />);
  const animationElement = screen.getByTestId('animation');
  expect(animationElement).toBeInTheDocument();
});

test('animation is hidden after completion', () => {
  jest.useFakeTimers(); // Mock timers for the setTimeout in useEffect
  render(<App />);
  jest.advanceTimersByTime(2000); // Advance timers by the animationDuration
  const animationElement = screen.queryByTestId('animation');
  expect(animationElement).not.toBeInTheDocument();
});

test('MainMenu is shown after animation completes', () => {
  jest.useFakeTimers(); // Mock timers for the setTimeout in useEffect
  render(<App />);
  jest.advanceTimersByTime(2000); // Advance timers by the animationDuration
  const mainMenuElement = screen.getByTestId('main-menu');
  expect(mainMenuElement).toBeInTheDocument();
});