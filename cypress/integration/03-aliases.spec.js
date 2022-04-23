/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    cy.get('[data-test="filter-items"]').as('filter-items')
    cy.get('[data-test="items-unpacked"]').as('unpackedItems')
    cy.get('[data-test="items-packed"]').as('packedItems')
  });

  describe('verify only items that match the filter are shown on the page', () => {
    it('it should filter the item', () => {
      cy.get('@filter-items').type('Tooth')
      cy.get('@filter-items').invoke('val').as('filterValue')
      cy.get('@unpackedItems').find('li label').as('unpackedItemsLabels')

      cy.get('@filterValue').then((value) => {
        cy.get('@unpackedItemsLabels').each(item => {
          const text = item.text()
          expect(text).to.contain(value)
        })
      })
    })

    it('should move the item to packed item', () => {
      cy.get('@filter-items').type('Tooth')
      cy.get('@unpackedItems').find('li').first().as('firstUnpackedItem')        
      cy.get('@firstUnpackedItem').find('label').as('firstUnpackedItemLabel')
      cy.get('@firstUnpackedItemLabel').invoke('text').as('labelText')

      cy.get('@labelText').then(text => { 
        cy.get('@firstUnpackedItemLabel').click()
        cy.get('@packedItems').contains(text)
      })
    })
  })
});
