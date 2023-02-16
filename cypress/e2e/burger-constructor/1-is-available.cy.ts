describe("app is running", () => {
  it("should be available", () => {
    cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
    cy.visit(Cypress.env("host"));
  });
});
