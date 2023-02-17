describe("service is available", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
    cy.visit(Cypress.env("host"));
  });

  it("should open & close ingredient's modal", () => {
    cy.getByTestId("burger-ingredients-group")
      .filter(":contains('Соусы')")
      .find('[data-testid="burger-ingredient"]')
      .first()
      .click();
    cy.getByTestId("ingredient-details").getByTestId("name").should("not.be.empty");
    cy.closeModal();
    cy.getByTestId("ingredient-details").should("not.exist");
  });
});
