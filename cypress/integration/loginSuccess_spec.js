const { createJSDocTypeExpression } = require("typescript");

describe("Login Success", () => {
  it("tests if user is registered", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#email")
      .type("newuser@fakemail.com")
      .should("have.value", "newuser@fakemail.com");
    cy.get("#password").type("123456").should("have.value", "123456");
    cy.get(".user-submit").click();
    cy.url().should("contain", "/dashboard");
    cy.get(".vertical-header-text").should("contain", "Edit Profile");
  });
});
