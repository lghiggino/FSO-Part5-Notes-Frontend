describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2022"
    );
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#input-username").type("mluukkai");
    cy.get("#input-password").type("salainen");
    cy.get("#button-login").click();

    cy.contains("Matti Luukkainen logged-in");
  });

  describe.only("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#input-note").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.contains("new note").click();
        cy.get("#input-note").type("a note created by cypress");
        cy.contains("save").click();
        cy.contains("a note created by cypress");
      });

      it("it can be made important", function () {
        cy.contains("a note created by cypress").contains("make important").click();

        cy.contains("a note created by cypress").contains("make not important");
      });
    });

    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.contains("new note").click();
        cy.get("#input-note").type("first note");
        cy.contains("save").click();

        cy.contains("new note").click();
        cy.get("#input-note").type("second note");
        cy.contains("save").click();

        cy.contains("new note").click();
        cy.get("#input-note").type("third note");
        cy.contains("save").click();

        // cy.createNote({ content: "first note", important: false });
        // cy.get("html").should("contain", "first note");
        // cy.createNote({ content: "second note", important: false });
        // cy.get("html").should("contain", "second note");
        // cy.createNote({ content: "third note", important: false });
        // cy.get("html").should("contain", "third note");
      });

      it("one of those can be made important", function () {
        cy.contains("second note").contains("make important").click();

        cy.contains("second note").contains("make not important");
      });
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#input-username").type("mluukkai");
    cy.get("#input-password").type("wrong");
    cy.get("#button-login").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });
});
