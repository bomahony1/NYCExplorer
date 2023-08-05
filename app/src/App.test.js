import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('animation is initially shown', () => {
  render(<App />);
  const animationElement = screen.getByTestId('animation');
  expect(animationElement).toBeInTheDocument();
});

test('animation is hidden after completion', () => {
  jest.useFakeTimers(); 
  render(<App />);
  jest.advanceTimersByTime(2000); 
  const animationElement = screen.queryByTestId('animation');
  expect(animationElement).not.toBeInTheDocument();
});

test('MainMenu is shown after animation completes', () => {
  jest.useFakeTimers(); 
  render(<App />);
  jest.advanceTimersByTime(2000); 
  const mainMenuElement = screen.getByTestId('main-menu');
  expect(mainMenuElement).toBeInTheDocument();
});

test('default state of showAnimation is true', () => {
  render(<App />);
  const animationElement = screen.getByTestId('animation');
  expect(animationElement).toBeInTheDocument();
});

test('useEffect cleanup clears the timeout', () => {
  jest.useFakeTimers();
  const { unmount } = render(<App />);
  unmount(); 
  jest.runAllTimers();
  const animationElement = screen.queryByTestId('animation');
  expect(animationElement).not.toBeInTheDocument();
});