/// <reference types="cypress" />

const pokemon = [
  { id: 1, name: 'Bumblesaur' },
  { id: 2, name: 'Charmer' },
  { id: 3, name: 'Turtle' },
];

describe('Pokémon Search', () => {
  beforeEach(() => {
    cy.visit('/pokemon-search');

    cy.get('[data-test="search"]').as('search');
    cy.get('[data-test="search-label"]').as('label');

    cy.intercept('/pokemon-search/api?*').as('api');
  });

  it('should call the API when the user types', () => {
    cy.get('@search').type('Tur')
    // wait for the api call
    cy.wait('@api')
  });

  it('should update the query parameter', () => {
    cy.get('@search').type('Tur')
    cy.location('search').should('equal', '?name=Tur')
  });

  it('should call the API with correct query parameter', () => {
    cy.get('@search').type('Tur')
    cy.wait('@api').then(interception => {
      expect(interception.request.url).to.contain('name=Tur')
    })
  });

  it('should pre-populate the search field with the query parameter', () => {
    cy.visit('/pokemon-search', { qs: { 'name': 'Tur' }})
    cy.wait('@api').then(interception => {
      expect(interception.request.url).to.contain('name=Tur')
    })
    cy.get('@search').should('have.value', 'Tur')
  });

  it('should render the results to the page', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.get('@search').type('B')
    cy.wait('@stubbed-api')
    cy.get('[data-test="result"]').should('have.length', pokemon.length)
  });

  it('should link to the correct pokémon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.get('@search').type('B')
    cy.wait('@stubbed-api')
    cy.get('[data-test="results"] a').each((item, i) => {
      expect(item.attr('href')).to.contain('/pokemon-search/' + pokemon[i].id)
    })
  });

  it('should persist the query parameter in the link to a pokémon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.get('@search').type('B')
    cy.wait('@stubbed-api')
    cy.get('[data-test="results"] a').each((item) => {
      expect(item.attr('href')).to.contain('name=B')
    })
  });

  it('should bring you to the route for the correct pokémon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.intercept('/pokemon-search/api/1', { fixture: 'bulbasaur' }).as('individual-api');

    cy.get('@search').type('B')
    cy.wait('@stubbed-api')

    cy.get('[data-test="results"] a').first().click()
    cy.wait('@individual-api')

    cy.location('pathname').should('contain',   '/pokemon-search/1')
  });

  it('should immediately fetch a pokémon if a query parameter is provided', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.visit('/pokemon-search', { qs: { name: 'bulba' } })  

    cy.wait('@stubbed-api').its('response.url').should('contain', 'name=bulba')
  });
});
