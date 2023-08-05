import React from 'react';
import { mount } from 'cypress-react-unit-test';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  it('renders', () => {
    mount(<HomePage />);
  });

  it('renders the Image components correctly', () => {
    mount(<HomePage />);

    cy.get('.Image').first().should('have.attr', 'src');
    cy.get('.Image div')
      .first()
      .should(
        'have.css',
        'WebkitMaskImage',
        'repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)'
      );

    // Scroll to make the image in view
    cy.get('.Image').first().scrollIntoView();

    // After scrolling, the image should become visible
    cy.get('.Image div')
      .first()
      .should(
        'have.css',
        'WebkitMaskImage',
        'repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)'
      );
  });
});
