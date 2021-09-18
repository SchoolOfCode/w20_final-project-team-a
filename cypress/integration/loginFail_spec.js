describe("Login Fail", () => {
  it("tests if user is registered", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
    cy.get("#password").type("123456").should("have.value", "123456");
    cy.get(".user-submit").click();
    cy.get(".user-messages-text-failure").should(
      "contain",
      "That email is not registered"
    );
  });
});
