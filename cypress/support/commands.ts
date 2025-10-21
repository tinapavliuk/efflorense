// ***********************************************************
// This example support/commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************************

/// <reference types="cypress" />

// Додаємо кастомні команди для тестів
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Кастомна команда для очікування завантаження
       * @example cy.waitForLoad()
       */
      waitForLoad(): Chainable<void>;

      /**
       * Кастомна команда для перевірки наявності елемента
       * @example cy.shouldBeVisible(selector)
       */
      shouldBeVisible(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('waitForLoad', () => {
  cy.get('body').should('be.visible');
  cy.window().should('have.property', 'document');
});

Cypress.Commands.add('shouldBeVisible', (selector: string) => {
  return cy.get(selector).should('be.visible');
});
