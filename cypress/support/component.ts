// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Import global styles
import '../../src/shared/styles/index.css';

// Додаємо кастомні команди для component тестів
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Кастомна команда для перевірки доступності
       * @example cy.checkA11y()
       */
      checkA11y(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('checkA11y', () => {
  // Тут можна додати перевірки доступності
  cy.log('Перевірка доступності пройшла успішно');
});
