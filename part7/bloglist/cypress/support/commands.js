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
Cypress.Commands.add('login', (credentials) => {
  cy.request('POST', 'http://localhost:3003/login', credentials)
    .then((response) => {
      console.log(response)
      const data = response.body.data;
      localStorage.setItem('user', JSON.stringify({...data.user, token: data.token}))
    });
})

Cypress.Commands.add('createBlog', (note) => {
  cy.contains('New note').click();

  cy.get('#title').type(note.title || 'dummy title');
  cy.get('#author').type(note.author || 'test_author');
  cy.get('#url').type(note.url || 'test_url');

  cy.contains('Create').click();
  cy.contains('a new blog')
})
