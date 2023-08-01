import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the App component', () => {
  render(<App />);
  const learnReactElement = screen.getByText(/Learn React/i);
  expect(learnReactElement).toBeInTheDocument();
});

test('renders the Welcome component during the animation', () => {
  render(<App />);
  const welcomeElement = screen.getByText('Welcome');
  expect(welcomeElement).toBeInTheDocument();
});

test('renders the MainMenu component after the animation', () => {
  render(<App />);
  const mainMenuElement = screen.getByText('Main Menu');
  expect(mainMenuElement).toBeInTheDocument();
});

test('hides animation elements after the animation is completed', () => {
  render(<App />);
  const animationDuration = 2000; // Match the duration used in useEffect of App.js
  jest.advanceTimersByTime(animationDuration);
  const elements = screen.queryAllByTestId('mojs-shape');
  elements.forEach((element) => {
    expect(element).not.toBeVisible();
  });
});