describe('Cart and order flow', () => {
  it('registers user, creates bouquet and places order', () => {
    const id = Date.now()
    const email = `test+cart+${id}@example.com`
    const password = 'Password123!'

    cy.visit('/')

    cy.contains('a', 'Registration').click()
    cy.url().should('include', '/auth/register')

    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').eq(0).type(password)
    cy.get('input[type="password"]').eq(1).type(password)
    cy.get('input[type="text"]').first().type('Cart User')

    cy.contains('button', 'Create new account').click()

    cy.contains('Make a bouquet').should('exist')
    cy.contains('Mood constructor').should('exist')

    cy.visit('/catalog')
    cy.url().should('include', '/catalog')

    cy.contains('button', 'Tap').first().click()

    cy.contains('button', 'Add to bouquet').click()

    cy.contains('button', 'Go to cart').click()
    cy.url().should('include', '/cart')

    cy.contains('button', 'ribbon').click()

    cy.contains('button', 'Order').click()
    cy.contains('Your cart is empty yet').should('exist')
  })
})
