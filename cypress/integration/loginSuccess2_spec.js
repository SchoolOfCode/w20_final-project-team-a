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
    // });
    // it("add project to database", () => {
    Cypress.Cookies.preserveOnce("http://localhost:3000");
    cy.visit("http://localhost:3000/submit");
    cy.get("#projectName")
      .type("Final Project")
      .should("have.value", "Final Project");
    cy.get("#problemStatement")
      .type("To come up with an amazing app to showcase what we've learned")
      .should(
        "have.value",
        "To come up with an amazing app to showcase what we've learned"
      );
    cy.get("#additionalInformation")
      .type("An erstwhile ToDo app with a difference")
      .should("have.value", "An erstwhile ToDo app with a difference");
    cy.get("#GithubRepo")
      .type("www.github.com/SchoolOfCode/w20_final-project-team-a/")
      .should(
        "have.value",
        "www.github.com/SchoolOfCode/w20_final-project-team-a/"
      );
    cy.get("#WeekNumber").type("20").should("have.value", "20");
  });
});
