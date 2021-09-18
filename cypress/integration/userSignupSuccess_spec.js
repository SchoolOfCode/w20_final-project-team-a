describe("Signup Tests", () => {
  it("user registration", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get("#email")
      .type("newuser@fakemail.com")
      .should("have.value", "newuser@fakemail.com");
    cy.get("#displayName").type("Demo User").should("have.value", "Demo User");
    cy.get("#password").type("123456").should("have.value", "123456");
    cy.get("#confirmPassword").type("123456").should("have.value", "123456");
    cy.get(".user-submit").click();
    cy.get(".user-messages-text-success").should(
      "include.text",
      "successfully registered"
    );
  });
});
