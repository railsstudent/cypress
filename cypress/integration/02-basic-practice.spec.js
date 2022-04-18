/// <reference types="cypress" />

const { xorBy } = require("lodash");

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test="new-item-input"]').type('new item')
      cy.get('[data-test="add-item"]').click()
      cy.contains('new item')
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('new item')
      cy.get('[data-test="add-item"]').click()
      cy.get('[data-test="items-unpacked"] li').contains('new item')
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('new item')
      cy.get('[data-test="add-item"]').click()
      cy.get('[data-test="items-unpacked"] li').last().contains('new item')
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth')
      cy.get('[data-test="items-unpacked"] li').contains('Tooth')
      cy.get('[data-test="items-unpacked"] li').should('have.length', 2)
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth')
      cy.get('[data-test="items-unpacked"] li').should('have.length', 2)
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click()
        cy.get('[data-test="items-unpacked"] li').should('not.exist')
        cy.get('[data-test="items-packed"] li').should('not.exist')
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items-unpacked"] li').contains('button', 'Remove')
      });

      it('should remove an item from the page', () => {
        cy.get('[data-test="items-unpacked"] li').first().find('button').click()
        cy.get('[data-test="items-unpacked"] li').should('have.length', 3)
        cy.get('[data-test="items-packed"] li').should('have.length', 1)
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click()
      cy.get('[data-test="items-packed"]').find('li').should('not.exist')
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click()
      cy.get('[data-test="items-unpacked"]').find('li').should('have.length', 5)
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items-unpacked"] li').contains('label', 'Tooth Brush').click()
      cy.get('[data-test="items-packed"] li').should('contain.text', 'Tooth Brush')
    });
  });
});
