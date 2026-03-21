/// <reference types="cypress" />

type CartUser = {
  email: string
  password: string
  name: string
}

function createCartUser(prefix: string): CartUser {
  const id = Date.now()
  return {
    email: `test+${prefix}+${id}@example.com`,
    password: 'Password123!',
    name: `${prefix} User`,
  }
}

function registerCartUser(user: CartUser) {
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

function addSingleFlowerAndOpenCart() {
  cy.visit('/catalog')
  cy.url().should('include', '/catalog')

  cy.contains('button', 'Tap').first().click()
  cy.contains('button', 'Add to bouquet').click()
  cy.contains('button', 'Go to cart').click()
  cy.url().should('include', '/cart')
}

describe('Cart and order flow', () => {
  it('registers user, creates bouquet and places order', () => {
    const user = createCartUser('cart-main')

    registerCartUser(user)
    addSingleFlowerAndOpenCart()

    cy.contains('button', 'ribbon').click()
    cy.contains('button', 'Order').click()
    cy.contains('Your cart is empty yet').should('exist')
  })

  it('allows changing quantity before adding flowers to bouquet', () => {
    const user = createCartUser('cart-qty')

    registerCartUser(user)

    cy.visit('/catalog')
    cy.url().should('include', '/catalog')

    cy.contains('button', 'Tap').first().click()

    cy.contains('button', '+').click()
    cy.contains('button', '+').click()

    cy.contains('button', 'Add to bouquet').click()

    cy.contains('There are:').should('contain', '3')
  })

  it('allows choosing ribbon packaging', () => {
    const user = createCartUser('cart-ribbon')

    registerCartUser(user)
    addSingleFlowerAndOpenCart()

    cy.contains('button', 'ribbon').click()
    cy.contains('ribbon packaging').should('exist')
  })

  it('allows choosing paper packaging', () => {
    const user = createCartUser('cart-paper')

    registerCartUser(user)
    addSingleFlowerAndOpenCart()

    cy.contains('button', 'paper').click()
    cy.contains('paper packaging').should('exist')
  })

  it('allows choosing basket packaging', () => {
    const user = createCartUser('cart-basket')

    registerCartUser(user)
    addSingleFlowerAndOpenCart()

    cy.contains('button', 'basket').click()
    cy.contains('basket packaging').should('exist')
  })
})
