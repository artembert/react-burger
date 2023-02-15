describe("service is available", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
    cy.visit("http://localhost:3000");
  });

  it("should have correct page heading", () => {
    cy.getByTestId("page-heading").should("have.text", "Соберите бургер");
  });

  describe("constructor functionality", () => {
    beforeEach(() => {
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
    });

    it("should move ingredients to constructor", () => {
      cy.get("@bun").drag('[data-testid="burger-constructor-drop-target"]');
      cy.get("@souse").drag('[data-testid="burger-constructor-drop-target"]');
      cy.get("@mainIngredient").drag('[data-testid="burger-constructor-drop-target"]');
    });
  });
});
