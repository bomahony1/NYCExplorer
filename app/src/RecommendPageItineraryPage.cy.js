import React from 'react'
import ItineraryPage from './RecommendPage'

describe('<ItineraryPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ItineraryPage />)
  })
})