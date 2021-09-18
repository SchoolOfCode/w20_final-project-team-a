describe("Login Success", () => {
  it("tests if user is registered", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#email")
      .type("user@fakemail.com")
      .should("have.value", "user@fakemail.com");
    cy.get("#password").type("123456").should("have.value", "123456");
    cy.get(".user-submit").click();
    cy.url().should("contain", "/dashboard");
  });
});
