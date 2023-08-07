import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ItineraryPage from './RecommendPage';

describe('<ItineraryPage />', () => {
  it('renders without crashing', () => {
    mount(
      <Router> 
        <ItineraryPage />
      </Router>
    );
    cy.contains('Money saving DAY Pass itineraries').should('be.visible');
  });

  it('displays pop recommendations when checkbox is checked', () => {
    mount(
      <Router> 
        <ItineraryPage />
      </Router>
    );

    cy.get('.enable input[type="checkbox"]').check();
    cy.get('.pop').should('be.visible');
  });

  it('adds a new item to the pop recommendations', () => {
    mount(
      <Router>
        <ItineraryPage />
      </Router>
    );

    cy.contains('POP Recommendations').click();
    cy.get('.pop li').should('have.length', 1);
  });

  it('removes an item from the pop recommendations', () => {
    mount(
      <Router> 
        <ItineraryPage />
      </Router>
    );
    cy.contains('POP Recommendations').click().click();
    cy.get('.pop li').should('have.length', 2);
    cy.get('.pop li').first().click();
    cy.get('.pop li').should('have.length', 1);
  });


  it('displays different content when selecting a button', () => {
    mount(
      <Router> 
        <ItineraryPage />
      </Router>
    );
    cy.contains('3-4 Days').click();
    cy.contains('New York City 4 Day Itinerary').should('be.visible');
  });

  it('opens the booking link in a new tab when clicking on the "Book now" button', () => {
    mount(
      <Router> 
        <ItineraryPage />
      </Router>
    );
    cy.contains('Book now').click();
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    cy.contains('Book now').click();
    cy.get('@windowOpen').should('be.calledWith', 'https://www.sightseeingpass.com/en/new-york/day-pass/itineraries/7-days-in-nyc', '_blank');
  });
});