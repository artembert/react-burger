describe("app is running", () => {
  it("should has correct page heading", () => {
    cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
    cy.visit(Cypress.env("host"));
    cy.getByTestId("page-heading").should("have.text", "Соберите бургер");
  });
});
