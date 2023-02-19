// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// import noteService from "./services/notes";
const noteService = require("../../src/services/notes");

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/api/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedNoteappUser", JSON.stringify(body));
    cy.visit("");
  });
});

Cypress.Commands.add("createNote", ({ content, important }) => {
  const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
  const user = JSON.parse(loggedUserJSON);
  noteService.setToken(user.token);
  const userId = noteService.setUserId(user.token);

  cy.request({
    url: `${Cypress.env("BACKEND")}/api/notes`,
    method: "POST",
    body: { content, important, userId },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedNoteappUser")).token
      }`,
    },
  });

  cy.visit("");
});
