// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/auth/signin')
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

// -- This is a child command --
Cypress.Commands.add('createVibe', (title: string, content: string, mood: string) => {
  cy.visit('/vibe/new')
  cy.get('input[name="title"]').type(title)
  cy.get('textarea[name="content"]').type(content)
  cy.get(`button[data-mood="${mood}"]`).click()
  cy.get('button[type="submit"]').click()
})

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      createVibe(title: string, content: string, mood: string): Chainable<void>
    }
  }
} 