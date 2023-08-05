import React from 'react'
import App from './App'
import { mount } from 'cypress-react-unit-test';

describe('<App />', () => {
  it('renders the Welcome component initially', () => {
    mount(<App />);
    cy.get('.Welcome').should('be.visible');
  });

  it('renders the MainMenu component after animation', () => {

    mount(<App />);
    cy.wait(2000);
    cy.get('.MainMenu').should('be.visible');
  });
});