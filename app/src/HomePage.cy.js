import React from 'react';
import { mount } from 'cypress-react-unit-test';
import HomePage from './HomePage';
import 'cypress-react-unit-test/support';

describe('<HomePage />', () => {
  it('makes API calls for events and googleAttractions', () => {
    cy.intercept('GET', 'http://127.0.0.1:8000/api/events/', {
      body: [
        {
          "name": "Hamilton (NY)",
          "date": "2023-08-06",
          "time": "15:00:00",
          "image": "https://s1.ticketm.net/dam/a/00f/b9aebee0-d1cb-4a5c-8e0e-0ca03fd4d00f_ARTIST_PAGE_3_2.jpg",
          "url": "https://www.ticketmaster.com/hamilton-ny-new-york-new-york-08-06-2023/event/03005D54AF5E4DA0",
          "genres": "Theatre",
          "latitude": "40.75920382",
          "longitude": "-73.98676323"
        },
      ],
    }).as('getEvents');

    cy.intercept('GET', 'http://127.0.0.1:8000/api/googleAttractions/', {
      body: [
        {
          "place_id": "ChIJe7vKMf9YwokRIMYfDz7iF9o",
          "name": "Top of The Rock",
          "address": "30 Rockefeller Plaza, New York, NY 10112, United States",
          "latitude": 40.7593495,
          "longitude": -73.9794087,
          "rating": 4.7,
          "photos": [
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AUacShitsvJRDCe5__RudbOmdyFaz9HEstwAkTxkUt38zRInWHZTmLnprRp5GodGxKpGijCqXpxaczQctHA9ONz3HTY7Xz6D29L6aQG8y-Gc9strKS6kHcYrbHkGlmWSrMmX_XFPXJi1nNiX7CIIUc6_8szBefQJCeqKfQRr0ZxhtkOTVMOq&key=AIzaSyBNMhSlQuwLCTxkfw5Q859YubrpHW8s4RA"
          ],
          "opening_hours": {
            "opening_hours": {
              "open_now": true,
              "periods": [
                {
                  "close": {
                    "day": 1,
                    "time": "0000"
                  },
                  "open": {
                    "day": 0,
                    "time": "0900"
                  }
                },
              ],
              "weekday_text": [
                "Monday: 9:00 AM – 12:00 AM",
              ]
            }
          }
        },
      ],
    }).as('getGoogleAttractions');

    mount(<HomePage />);

    cy.wait('@getEvents');
    cy.wait('@getGoogleAttractions');

    cy.get('.Image').should('not.exist');
  });
});
