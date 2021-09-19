describe("Admin Login Success", () => {
  it("tests admin login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#email")
      .type("admin@gmail.com")
      .should("have.value", "admin@gmail.com");
    cy.get("#password").type("123456").should("have.value", "123456");
    cy.get(".user-submit").click();
    cy.url().should("contain", "/dashboard");
    cy.get(".vertical-header-text").should("contain", "Admin");
  });
});
