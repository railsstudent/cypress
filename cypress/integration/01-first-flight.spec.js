/// <reference types="cypress" />

describe('Create a New Item', () => {
    beforeEach(() => {
        cy.visit('/jetsetter')
    })

    it('should have a form', () => {
        cy.get('form').should('exist')    
    })

    it('should not have a formm', () => {
        cy.get('formm').should('not.exist')    
    })

    it('should have the word Add Item', () => {
        cy.contains('Add Item')
    })

    it('should test an input field', () => {
        cy.get('[data-test="new-item-input"]').type('Good attitude')
        cy.get('[data-test="add-item"]').click()
    })
});
