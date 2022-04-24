/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    const ironMan = 'Iron Man'
    cy.get('[data-test="select-input"]').select(ironMan);
    cy.get('[data-test="select-result"]').contains(ironMan);
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-tomato"]').check();
    cy.get('[data-test="checkbox-onion"]').check();
    cy.get('[data-test="checkbox-result"]').contains('Tomato, Onion');
  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]').check();
    cy.get('[data-test="radio-result"]').contains('Ringo');

    cy.get('[data-test="radio-george"]').check();
    cy.get('[data-test="radio-result"]').contains('George');
  });

  it('should find and control a color input', () => {
    const color = '#ff00ff'
    cy.get('[data-test="color-input"]').invoke('val', color).trigger('input');
    cy.get('[data-test="color-result"]').contains(color);
  });

  it('should find and control a date input', () => { 
    const date = '2022-04-25'
    cy.get('[data-test="date-input"]').type(date);
    cy.get('[data-test="date-result"]').contains(date)
  });

  it('should find and control a range input', () => {
    cy.get('[data-test="range-input"]').invoke('val', '8').trigger('input');
    cy.get('[data-test="range-result"]').contains('8');
  });

  it('should find and control a file input', () => {
    cy.get('[data-test="file-input"]');
    cy.get('[data-test="file-result"]');
  }); 
});
