/// <reference types="cypress" />

const user = {
  email: `first@example.com`,
  password: 'password123',
};

describe('Sign Up', () => {
  beforeEach(() => {
    cy.task('reset')
  })

  it('should successfully create a user when entering an email and a password', () => {
    // Sign Up
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-email"]').type(user.email);
    cy.get('[data-test="sign-up-password"]').type(user.password);
    cy.get('[data-test="sign-up-submit"]').click();

    // Sign In
    cy.visit('/echo-chamber/sign-in');
    cy.get('[data-test="sign-in-email"]').type(user.email);
    cy.get('[data-test="sign-in-password"]').type(user.password);
    cy.get('[data-test="sign-in-submit"]').click();

    cy.location('pathname').should('contain', '/echo-chamber/posts');
    cy.contains('Signed in as ' + user.email);
  });
});

describe('Sign In (Failure case)', () => {
  beforeEach(() => {
    cy.task('reset')
  })

  it('should not sign in with a non-existent user', () => {
    // Sign In
    cy.visit('/echo-chamber/sign-in');
    cy.get('[data-test="sign-in-email"]').type(user.email);
    cy.get('[data-test="sign-in-password"]').type(user.password);
    cy.get('[data-test="sign-in-submit"]').click();

    cy.contains('Signed in as ' + user.email).should('not.exist')
    cy.contains('No such user exists')
  });
});

describe('Sign In', () => {
  beforeEach(() => {
    cy.task('seed')
  })

  it('should sign in', () => {
    // Sign In
    cy.visit('/echo-chamber/sign-in');
    cy.get('[data-test="sign-in-email"]').type(user.email);
    cy.get('[data-test="sign-in-password"]').type(user.password);
    cy.get('[data-test="sign-in-submit"]').click();

    cy.location('pathname').should('contain', '/echo-chamber/posts')
    cy.contains('Signed in as ' + user.email)
  });
});