/// <reference types="cypress" />

type NavUser = {
  email: string
  password: string
  name: string
}

function createNavUser(prefix: string): NavUser {
  const id = Date.now()
  return {
    email: `test+${prefix}+${id}@example.com`,
    password: 'Password123!',
    name: `${prefix} User`,
  }
}

function registerNavUser(user: NavUser) {
  cy.visit('/')

  cy.contains('a', 'Registration').click()
  cy.url().should('include', '/auth/register')

  cy.get('input[type="email"]').type(user.email)
  cy.get('input[type="password"]').eq(0).type(user.password)
  cy.get('input[type="password"]').eq(1).type(user.password)
  cy.get('input[type="text"]').first().type(user.name)

  cy.contains('button', 'Create new account').click()
  cy.url().should('include', '/home-after')
}

describe('Navigation and protected routes', () => {
  it('redirects guest from About page to login', () => {
    cy.visit('/about')

    cy.url().should('include', '/auth/login')
  })

  it('allows logged-in user to open About page', () => {
    const user = createNavUser('nav-about')

    registerNavUser(user)

    cy.visit('/about')

    cy.url().should('include', '/about')
    cy.contains(/about/i).should('exist')
  })

  it('shows 404 page for unknown route', () => {
    cy.visit('/some/very/unknown/route-123')

    cy.contains('404 missed calls').should('exist')
  })

  it('from 404 page user can go back to home page', () => {
    cy.visit('/some/very/unknown/route-456')
  
    cy.contains('404 missed calls').should('exist')
  
    cy.contains(/home/i).click()
  
    cy.location('pathname').should('eq', '/')
  })
  
  
})
