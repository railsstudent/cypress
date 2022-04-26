/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-submit"]').as('submit')
    cy.get('[data-test="sign-up-email"]').as('email')
  });

  it('should require an email', () => {
    cy.get('@submit').click()
    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill in this field')

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true')
  });

  it.only('should require that the email actually be an email address', () => {
    cy.get('@email').type('example.com')
    cy.get('@submit').click()
    
    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', `Please include an '@' in the email address. 'example.com' is missing an '@'`)

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validity')
      .its('typeMismatch')
      .should('be.true')
  });

  it('should require a password when the email is present', () => {
    cy.get('@email').type('abc@example.com')
    cy.get('@submit').click()

    cy.get('[data-test="sign-up-password"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', `Please fill in this field`)

    cy.get('[data-test="sign-up-password"]:invalid')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true')  
  });
});
