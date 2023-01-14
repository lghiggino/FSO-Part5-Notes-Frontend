describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2022"
    );
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
    cy.get("#input-username").type("mluukkai");
    cy.get("#input-password").type("salainen");
    cy.get("#button-login").click();

    cy.contains("Matti Luukkaineno logged-in");
  });

  localStorage.removeItem("loggedNoteappUser");

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#input-username").type("mluukkai");
      cy.get("#input-password").type("salainen");
      cy.get("#button-login").click();

      cy.contains("Matti Luukkaineno logged-in");
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#input-note").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });
  });
});
