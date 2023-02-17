/// <reference types="cypress" />
import "@4tw/cypress-drag-drop";

const defaultEmail = "my-email@custom.mail";
const defaultPassword = "FHGJHGgj$%^&&9426";

Cypress.Commands.add("getByTestId", (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add("login", (login = defaultEmail, password = defaultPassword) => {
  cy.visit(`${Cypress.env("host")}/login`);
  cy.getByTestId("login-filed").type(login);
  cy.getByTestId("password-filed").type(password);
  cy.getByTestId("login-button").click();
  cy.location("pathname").should("equal", "/");
});

Cypress.Commands.add("closeModal", () => {
  cy.getByTestId("modal").as("modal");
  cy.get("@modal").getByTestId("close-modal-button").click();
  cy.get("@modal").should("not.exist");
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
