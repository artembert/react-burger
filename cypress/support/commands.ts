/// <reference types="cypress" />
import "@4tw/cypress-drag-drop";
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add("getByTestId", (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add("login", (login = "my-email@custom.mail", password = "FHGJHGgj$%^&&9426") => {
  cy.visit("http://localhost:3000/login");
  cy.getByTestId("login-filed").type(login);
  cy.getByTestId("password-filed").type(password);
  cy.getByTestId("login-button").click();
  cy.location("pathname").should("equal", "/");
});

Cypress.Commands.add("createBurger", () => {
  cy.getByTestId("burger-ingredients-group").contains("Булки").getByTestId("burger-ingredient").first().as("bun");
  cy.getByTestId("burger-ingredients-group")
    .filter(":contains('Соусы')")
    .find('[data-testid="burger-ingredient"]')
    .first()
    .as("souse");
  cy.getByTestId("burger-ingredients-group")
    .contains("Начинки")
    .getByTestId("burger-ingredient")
    .last()
    .as("mainIngredient");
  cy.getByTestId("make-order-button").as("makeOrderButton");

  cy.get("@bun").drag('[data-testid="burger-constructor-drop-target"]');
  cy.get("@souse").drag('[data-testid="burger-constructor-drop-target"]');
  cy.get("@mainIngredient").drag('[data-testid="burger-constructor-drop-target"]');
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
