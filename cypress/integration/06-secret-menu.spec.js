/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#restaurant-visibility-filter').as('restaurant-filter')
    cy.get('#minimum-rating-visibility').as('rating-filter')
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  })

  for (const property of properties) {
    it (`should have a column for ${property}`, () => {
      cy.get(`#${property}-column`)
    })

    it(`should hide ${property} if unchecked`, () => {
      cy.get(`#show-${property}`).click()
      cy.get(`#${property}-column`).should('be.hidden')
    })
  }

  for (const restaurant of restaurants) {
    it(`should find and filter ${restaurant}`, () => {
      cy.get('@restaurant-filter').select(restaurant)
      cy.get('td[headers="whereToOrder-column"]').contains(restaurant).and('have.length.at.least', 1)
    })
  }

  for (const rating of ratings) {
    it(`should filter item with minimum rating ${rating}`, () => {
      const strRating = `${rating}`
      cy.get('@rating-filter').invoke('val', strRating).trigger('input')

      cy.get('td[headers="popularity-column"] div').each(cell => {
        const intRating = parseInt(cell.text())
        expect(intRating).not.lessThan(rating)
      })
    })
  } 
});
