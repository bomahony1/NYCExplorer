import React from 'react';
import MapPage from './MapPage';

describe('<MapPage />', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

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
  });

  it('renders', () => {

    cy.mount(<MapPage />);
    cy.wait('@getGoogleAttractions');
    cy.wait('@getGoogleRestaurants');
    cy.wait('@getGoogleHotels');
  });
});
