describe("app is running", () => {
  it("should be available on localhost:3000", () => {
    cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
    cy.visit("http://localhost:3000");
  });
});
