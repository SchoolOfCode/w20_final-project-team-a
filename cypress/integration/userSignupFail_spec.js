describe("Signup Tests", () => {
  it("user already registered", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get("#email")
      .type("admin@gmail.com")
      .should("have.value", "admin@gmail.com");
    cy.get("#displayName").type("Admin").should("have.value", "Admin");
    cy.get("#password").type("123456").should("have.value", "123456");
    cy.get("#confirmPassword").type("123456").should("have.value", "123456");
    cy.get(".user-submit").click();
    cy.get(".user-messages-text-failure").should(
      "include.text",
      "already registered"
    );
  });
});
