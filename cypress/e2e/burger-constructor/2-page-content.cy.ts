describe("service is available", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
    cy.intercept("POST", "**/api/auth/login", { fixture: "login.json" }).as("postLogin");
    cy.intercept("POST", "**/api/orders", { fixture: "orders.json" }).as("postOrders");
    cy.visit("http://localhost:3000");
  });

  it("should have correct page heading", () => {
    cy.getByTestId("page-heading").should("have.text", "Соберите бургер");
  });

  it("should redirect to login page if user was not logged in", () => {
    cy.createBurger();
    cy.get("@makeOrderButton").click();

    cy.location("pathname").should("include", "login");
  });

  it("should create an order", () => {
    cy.login();
    cy.createBurger();
    cy.get("@makeOrderButton").click();
    cy.getByTestId("order-details").should("exist");
    cy.getByTestId("order-details").getByTestId("order-id").should("exist");
  });
});
