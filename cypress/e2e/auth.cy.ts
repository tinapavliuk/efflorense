/// <reference types="cypress" />

describe('Auth flow', () => {
  it('registers a new user and shows logged-in home', () => {
    const id = Date.now()
    const email = `test+${id}@example.com`
    const password = 'Password123!'

    cy.visit('/')

    cy.contains('a', 'Registration').click()

    cy.url().should('include', '/auth/register')

    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').eq(0).type(password)
    cy.get('input[type="password"]').eq(1).type(password)

    cy.get('input[type="text"]').first().type('Test User')

    cy.contains('button', 'Create new account').click()

    cy.contains('Make a bouquet').should('exist')
    cy.contains('Mood constructor').should('exist')
    cy.url().should('not.include', '/auth')
  })

  it('shows error on invalid login', () => {
    cy.visit('/auth/login')

    cy.get('input[type="email"]').type('wrong-user@example.com')
    cy.get('input[type="password"]').type('invalid-password')

    cy.contains('button', 'Log in').click()

    cy.contains('Login failed').should('exist')
    cy.url().should('include', '/auth/login')
  })
})
