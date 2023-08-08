import React from 'react';
import MapPage from './MapPage';
import { BrowserRouter as Router } from 'react-router-dom';

const handleDragStart = (event, data) => {
  event.dataTransfer.setData('text/plain', JSON.stringify(data));
};

describe('<MapPage />', () => {
  beforeEach(() => {
    cy.intercept('https://maps.googleapis.com/**', {
      statusCode: 200,
      body: 'mocked response',
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
      console.error('Caught an uncaught exception:', err);
      return false;
    });
  });

  it('renders and checks if Google Maps API is loaded', () => {
    cy.on('window:before:load', (win) => {
      const googleMapsLoaded = 'google' in win;
      expect(googleMapsLoaded).to.be.true;

      cy.mount(
        <Router>
          <MapPage />
        </Router>
      );
    });
  });

  describe('handleDragStart', () => {
    it('sets dataTransfer with JSON.stringify of data', () => {
      const event = {
        dataTransfer: {
          setData: cy.stub()
        }
      };
      const data = { name: 'TestPlace' };

      handleDragStart(event, data);

      expect(event.dataTransfer.setData).to.be.calledWith('text/plain', JSON.stringify(data));
    });
  });
});

describe('MapPage with Search Options', () => {
  beforeEach(() => {
    cy.intercept('https://maps.googleapis.com/**', {
      statusCode: 200,
      body: 'mocked response',
    });
  });

  it('should render search options with country restrictions', () => {
    const searchOptions = {
      componentRestrictions: { country: ['us'] }
    };

    cy.visit('http://localhost:3000/');
    cy.window().then((win) => {
      cy.stub(win.google.maps.places, 'AutocompleteService').callsFake(() => ({
        getPlacePredictions: (request, callback) => {
          expect(request.componentRestrictions).to.deep.equal(searchOptions.componentRestrictions);
          callback([{ description: 'Place 1' }], 'OK');
        },
      }));
    });

    cy.get('input').type('Search Query');
    cy.get('.suggestion').should('exist');
    cy.get('input').type('{enter}');

  });
  describe('MapPage', () => {
    beforeEach(() => {
      cy.visit('/your-map-page-url');
    });
  
    it('displays weather data', () => {
      cy.get('.weather-data').should('be.visible');
    });
  
    it('toggles heatmap visibility', () => {
      cy.get('#heatmap-toggle-button').click();
      cy.get('.heatmap-element').should('be.visible');
      cy.get('#heatmap-toggle-button').click();
      cy.get('.heatmap-element').should('not.be.visible');
    });
  
    it('searches for directions', () => {
      cy.get('#origin-input').type('Your origin');
      cy.get('#destination-input').type('Your destination');
      cy.get('#search-button').click();
      cy.get('.directions-panel').should('be.visible');
    });
  
    it('toggles markers', () => {
      cy.get('#toggle-markers-button').click();
      cy.get('.marker').should('be.visible');
      cy.get('#toggle-markers-button').click();
      cy.get('.marker').should('not.be.visible');
    });
  
    it('selects a marker', () => {
      cy.get('.marker').first().click();
      cy.get('.selected-marker-info').should('be.visible');
    });
  });
  it('shows attractions when "Show Attractions" button is clicked', () => {
    cy.get('#show-attractions-button').click();
    cy.get('.attraction-marker').should('be.visible');
  });

  it('shows hotels when "Show Hotels" button is clicked', () => {
    cy.get('#show-hotels-button').click();
    cy.get('.hotel-marker').should('be.visible');
  });

  it('shows restaurants when "Show Restaurants" button is clicked', () => {
    cy.get('#show-restaurants-button').click();
    cy.get('.restaurant-marker').should('be.visible');
  });

  it('shows distance and time information after searching for directions', () => {
    cy.get('#origin-input').type('Your origin');
    cy.get('#destination-input').type('Your destination');
    cy.get('#search-button').click();
    cy.get('.distance-text').should('be.visible');
    cy.get('.duration-text').should('be.visible');
  });

  it('shows a custom info window when a marker is selected', () => {
    cy.get('.marker').first().click();
    cy.get('.custom-info-window').should('be.visible');
  });
});