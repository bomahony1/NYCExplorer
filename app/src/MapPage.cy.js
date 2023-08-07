import React from 'react';
import MapPage from './MapPage';
import { BrowserRouter } from 'react-router-dom';
import { mount } from '@cypress/react';

describe('<MapPage />', () => {
  let uncaughtException = false;
  beforeEach(() => {
    cy.intercept('GET', 'http://127.0.0.1:8000/api/googleAttractions/', {
      body: [
        {
          "name": "Attraction 1",
          "location": "Location 1",
          "rating": 4.5
        },
        {
          "name": "Attraction 2",
          "location": "Location 2",
          "rating": 4.2
        },
      ],
    }).as('getGoogleAttractions');

    cy.intercept('GET', 'http://127.0.0.1:8000/api/googleRestaurants/', {
      body: [
        {
          "name": "Restaurant 1",
          "location": "Location 1",
          "rating": 4.8
        },
        {
          "name": "Restaurant 2",
          "location": "Location 2",
          "rating": 4.3
        },
      ],
    }).as('getGoogleRestaurants');

    cy.intercept('GET', 'http://127.0.0.1:8000/api/googleHotels/', {
      body: [
        {
          "name": "Hotel 1",
          "location": "Location 1",
          "rating": 4.7
        },
        {
          "name": "Hotel 2",
          "location": "Location 2",
          "rating": 4.4
        },
      ],
    }).as('getGoogleHotels');


    mount(
      <BrowserRouter>
        <MapPage />
      </BrowserRouter>
    );
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Set the flag to true if there was an uncaught exception
    uncaughtException = true;
    // Return false to prevent Cypress from failing the test automatically
    return false;
  });
});

// Add an afterEach hook to check for uncaught exceptions after each test
afterEach(() => {
  // If there was an uncaught exception, fail the test
  if (uncaughtException) {
    throw new Error('Uncaught exception occurred during the test.');
  }
});

it('renders', () => {
  cy.wait('@getGoogleAttractions');
  cy.wait('@getGoogleRestaurants');
  cy.wait('@getGoogleHotels');
});

it('toggles markers visibility', () => {
  cy.get('[data-cy="toggle-markers"]').click();
  cy.get('[data-cy="marker"]').should('not.exist');
  cy.get('[data-cy="toggle-markers"]').click();
  cy.get('[data-cy="marker"]').should('exist');
});

it('selects origin and destination points', () => {
  cy.get('[data-cy="origin-input"]').type('New York');
  cy.get('[data-cy="destination-input"]').type('Los Angeles');
  cy.get('[data-cy="search-button"]').click();
  cy.get('[data-cy="directions"]').should('be.visible');
});

it('shows attractions markers', () => {
  cy.get('[data-cy="toggle-attractions"]').click();
  cy.get('[data-cy="attraction-marker"]').should('exist');
});

it('shows restaurants markers', () => {
  cy.get('[data-cy="toggle-restaurants"]').click();
  cy.get('[data-cy="restaurant-marker"]').should('exist');
});

it('shows hotels markers', () => {
  cy.get('[data-cy="toggle-hotels"]').click();
  cy.get('[data-cy="hotel-marker"]').should('exist');
});