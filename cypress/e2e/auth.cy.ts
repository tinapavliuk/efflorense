/// <reference types="cypress" />

type TestUser = {
  email: string
  password: string
  name: string
  phone: string
}

function createTestUser(suffix: string): TestUser {
  const id = Date.now()
  return {
    email: `test+${suffix}+${id}@example.com`,
    password: 'Password123!',
    name: 'Test User',
    phone: '+380123456789',
  }
}

function registerViaUI(user: TestUser) {
  cy.visit('/auth/register')

  cy.get('input[type="email"]').clear().type(user.email)

  cy.get('input[type="password"]').eq(0).clear().type(user.password)
  cy.get('input[type="password"]').eq(1).clear().type(user.password)

  cy.get('input[type="text"]').eq(0).clear().type(user.name)
  cy.get('input[type="tel"]').clear().type(user.phone)

  cy.contains('button', 'Create new account').click()
}

describe('Auth flow', () => {
  it('registers a new user successfully when all fields are valid', () => {
    const user = createTestUser('register-success')

    registerViaUI(user)

    cy.url().should('include', '/home-after')
    cy.contains('Make a bouquet').should('exist')
  })

  it('shows validation error on registration when passwords do not match but all fields are filled', () => {
    const user = createTestUser('register-fail')

    cy.visit('/auth/register')

    cy.get('input[type="email"]').clear().type(user.email)

    cy.get('input[type="password"]').eq(0).clear().type(user.password)
    cy.get('input[type="password"]').eq(1).clear().type('Another123!')

    cy.get('input[type="text"]').eq(0).clear().type(user.name)
    cy.get('input[type="tel"]').clear().type(user.phone)

    cy.contains('button', 'Create new account').click()

    cy.contains('Passwords do not match').should('exist')
    cy.url().should('include', '/auth/register')
  })

  it('logs in a registered user with correct credentials', () => {
    const id = Date.now()
    const email = `test+login+${id}@example.com`
    const password = 'Password123!'
  
    cy.request('POST', 'http://localhost:3000/auth/register', {
      email,
      password,
      name: 'Login User',
      phone: '+380123456789',
    }).its('status').should('eq', 201)
  
    cy.visit('/auth/login')
  
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.contains('button', 'Log in').click()
  
    cy.url().should('include', '/home-after')
    cy.contains('Make a bouquet').should('exist')
  })
  

  it('shows error on login with invalid credentials', () => {
    cy.visit('/auth/login')

    cy.get('input[type="email"]').clear().type('wrong-user@example.com')
    cy.get('input[type="password"]').clear().type('invalid-password')

    cy.contains('button', 'Log in').click()

    cy.contains('Login failed').should('exist')
    cy.url().should('include', '/auth/login')
  })

  it('does not submit login form when required fields are empty', () => {
    cy.visit('/auth/login')
  
    cy.contains('button', 'Log in').click()
  
    cy.url().should('include', '/auth/login')
  
    cy.get('input[type="email"]').should('have.attr', 'required')
    cy.get('input[type="password"]').should('have.attr', 'required')
  })
  
})
