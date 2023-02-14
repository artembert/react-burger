describe("service is available", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have correct page heading", () => {
    cy.getByTestId("page-heading").should("have.text", "Соберите бургер");
  });
});
