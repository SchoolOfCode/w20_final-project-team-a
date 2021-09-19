describe("Project Submit", () => {
  Cypress.Cookies.preserveOnce("http://localhost:3000");
  it("add project to database", () => {
    // cy.set("loginStatus", "true");
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
    cy.get(".user-submit").click();
  });
});
// get each field for project submit and complete
// #projectName
// "Final Project"
// #problemStatement
// "To come up with an amazing app to showcase what we've learned"
// #additionalInformation
// "An erstwhile ToDo app with a difference"
// #GithubRepo
// "www.github.com/SchoolOfCode/w20_final-project-team-a/"
// #WeekNumber
// "20"

// #DeployedAppUrl
// "www.becksmaybury.live"
// .contributors-input
// "newuser@fakemail.com"
// "user@fakemail.com"
// [click contributor.button.add]
// .builtUsing-input
// [click id=]
// "HTML"
// "CSS"
// "React"
// "MongoDB"
// .appImage-input
// "http://localhost:5000/uploads/projects/9d53d2c6-079_demo_site.gif"
// .additionalAppImage1-input
// "http://localhost:5000/uploads/projects/9bba0642-c4b_demo_project_2.png"
// .additionalAppImage2-input
// .additionalAppImage3-input
