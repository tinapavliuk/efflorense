import { mount } from 'cypress/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './index'

describe('HomePage', () => {
  const mountPage = () => {
    mount(
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>,
    )
  }

  it('renders hero title and subtitle', () => {
    mountPage()

    cy.contains('h1', 'Efflorense').should('exist')
    cy.contains('It’s a place where your floral dreams come true').should('exist')
  })

  it('renders auth links', () => {
    mountPage()

    cy.contains('a', 'Registration')
      .should('exist')
      .and('have.attr', 'href', '/auth/register')

    cy.contains('a', 'Log in')
      .should('exist')
      .and('have.attr', 'href', '/auth/login')
  })

  it('shows location text', () => {
    mountPage()

    cy.contains('Location: Pretty girls avenue, 33').should('exist')
  })
})
