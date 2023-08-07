import React from 'react';
import MapPage from './MapPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<MapPage />', () => {
  before(() => {
    cy.window().then((win) => {
      const script = win.document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBNMhSlQuwLCTxkfw5Q859YubrpHW8s4RA&libraries=places`;
      win.document.head.appendChild(script);
    });
  });

  it('renders', () => {
    cy.on('window:before:load', (win) => {
      const googleMapsLoaded = 'google' in win;
      expect(googleMapsLoaded).to.be.true;

      cy.mount(
        <Router>
          <MapPage />
        </Router>
      );
    });

  it('renders', () => {
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
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AUacShi_2RWVti4pZyO3LXYcsGMII2YnnFWGFNIBlVYYhqPjbtcKgMWPMjk7xA77Ny4S9I8hJ0PTBAZL5niqMPP2_quGgt6VHwTHYAo5_TKCsLZTCefce_o5PskyX9fpty_7_yaxVHeoA2WGwMyszIlCX3M2DBga-sq3KyRX1cRk8aozNUCs&key=AIzaSyBNMhSlQuwLCTxkfw5Q859YubrpHW8s4RA"
          ],
          "opening_hours": {
            "open_now": false,
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
              {
                "close": {
                  "day": 2,
                  "time": "0000"
                },
                "open": {
                  "day": 1,
                  "time": "0900"
                }
              },
              {
                "close": {
                  "day": 3,
                  "time": "0000"
                },
                "open": {
                  "day": 2,
                  "time": "0900"
                }
              },
              {
                "close": {
                  "day": 4,
                  "time": "0000"
                },
                "open": {
                  "day": 3,
                  "time": "0900"
                }
              },
              {
                "close": {
                  "day": 5,
                  "time": "0000"
                },
                "open": {
                  "day": 4,
                  "time": "0900"
                }
              },
              {
                "close": {
                  "day": 6,
                  "time": "0000"
                },
                "open": {
                  "day": 5,
                  "time": "0900"
                }
              },
              {
                "close": {
                  "day": 0,
                  "time": "0000"
                },
                "open": {
                  "day": 6,
                  "time": "0900"
                }
              }
            ],
            "weekday_text": [
              "Monday: 9:00 AM – 12:00 AM",
              "Tuesday: 9:00 AM – 12:00 AM",
              "Wednesday: 9:00 AM – 12:00 AM",
              "Thursday: 9:00 AM – 12:00 AM",
              "Friday: 9:00 AM – 12:00 AM",
              "Saturday: 9:00 AM – 12:00 AM",
              "Sunday: 9:00 AM – 12:00 AM"
            ]
          }
        },

      ],
    }).as('getGoogleAttractions');

    cy.intercept('GET', 'http://127.0.0.1:8000/api/googleRestaurants/', {
      body: [
        {
          "place_id": "ChIJ5zM53_lYwokREUcpQkveG1w",
          "name": "Indian Accent Restaurant, New York",
          "address": "123 W 56th St, New York, NY 10019, United States",
          "latitude": 40.7642896,
          "longitude": -73.97884429999999,
          "rating": 4.4,
          "photos": [
              "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AUacShiaCdDUxC0ylDHRzWnYEsLehqnKlXQNLMKWV4d6f4vsAakoM9_TuzHeVEoTW7pkSftpxv6-f0G75ad7pa6LukfZuPnQdSkFXlWNlFbOT9j_NJRNKjapzsN9qVSR_6wLE2nEuJhVgZObUGUmdrv4zFRzM_wG1bszGleFlUZ5Gjs8olUH&key=AIzaSyBNMhSlQuwLCTxkfw5Q859YubrpHW8s4RA"
          ],
          "opening_hours": {
              "opening_hours": {
                  "open_now": false,
                  "periods": [
                      {
                          "close": {
                              "day": 0,
                              "time": "2200"
                          },
                          "open": {
                              "day": 0,
                              "time": "1700"
                          }
                      },
                      {
                          "close": {
                              "day": 1,
                              "time": "2200"
                          },
                          "open": {
                              "day": 1,
                              "time": "1700"
                          }
                      },
                      {
                          "close": {
                              "day": 2,
                              "time": "2200"
                          },
                          "open": {
                              "day": 2,
                              "time": "1700"
                          }
                      },
                      {
                          "close": {
                              "day": 3,
                              "time": "2200"
                          },
                          "open": {
                              "day": 3,
                              "time": "1700"
                          }
                      },
                      {
                          "close": {
                              "day": 4,
                              "time": "2200"
                          },
                          "open": {
                              "day": 4,
                              "time": "1700"
                          }
                      },
                      {
                          "close": {
                              "day": 5,
                              "time": "2230"
                          },
                          "open": {
                              "day": 5,
                              "time": "1700"
                          }
                      },
                      {
                          "close": {
                              "day": 6,
                              "time": "2230"
                          },
                          "open": {
                              "day": 6,
                              "time": "1700"
                          }
                      }
                  ],
                  "weekday_text": [
                      "Monday: 5:00 – 10:00 PM",
                      "Tuesday: 5:00 – 10:00 PM",
                      "Wednesday: 5:00 – 10:00 PM",
                      "Thursday: 5:00 – 10:00 PM",
                      "Friday: 5:00 – 10:30 PM",
                      "Saturday: 5:00 – 10:30 PM",
                      "Sunday: 5:00 – 10:00 PM"
                  ]
              }
          }
      },
      ],
    }).as('getGoogleRestaurants');

    cy.intercept('GET', 'http://127.0.0.1:8000/api/googleHotels/', {
      body: [
        {
          "place_id": "ChIJw_JUgvhYwokRIgBAxZdF4eA",
          "name": "The Manhattan at Times Square Hotel",
          "address": "790 7th Ave, New York, NY 10019, United States",
          "latitude": 40.7622856,
          "longitude": -73.98264040000001,
          "rating": 3.1,
          "photos": [
              "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AUacShi90AzcaXMx7s-vuBGXussDO-yCVifLRPecyP6rvhV0PHzOPFiGLe3I7roMoHw_LhFpKn2AsC28SHaYob-N_HrHPKpDreWf0VY_9IcTXLyfBwTO52ucI7yPxNC6hCgtzyiVqoGaoEmXKNArY5BUJpOrm0BJV4E3crWGw032xUDIXoLy&key=AIzaSyBNMhSlQuwLCTxkfw5Q859YubrpHW8s4RA"
          ]
      },
      {
          "place_id": "ChIJsS1xLQJZwokRGfXJPMwXA1A",
          "name": "Hyatt Grand Central New York",
          "address": "At Grand Central Terminal, 109 E 42nd St, New York, NY 10017, United States",
          "latitude": 40.7520617,
          "longitude": -73.9762995,
          "rating": 4.1,
          "photos": [
              "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AUacShjy3iNi1QQ7n2TiEJt67nLlBYtQ0K_VRmnJJGBMW213FsUvtn3IFQnN3pymPC0I3Won-oIUxR6oS5_HddJ52kHFOcrRbK9ajrKM093MtqW2eKjnbpA1bIgMtS9YbwfFPfxx9Tn691wLqvyuPT4cAtrGjWr8DNJg-Bci6K9LTLnfwmqZ&key=AIzaSyBNMhSlQuwLCTxkfw5Q859YubrpHW8s4RA"
          ]
      }
      ],
    }).as('getGoogleHotels');


    

    cy.wait('@getGoogleAttractions');
    cy.wait('@getGoogleRestaurants');
    cy.wait('@getGoogleHotels');


  });
});
});