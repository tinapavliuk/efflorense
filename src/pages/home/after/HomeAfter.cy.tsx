import { mount } from 'cypress/react'
import { MemoryRouter } from 'react-router-dom'
import HomeAfterPage from './index'

describe('HomeAfterPage', () => {
  const mountPage = () => {
    mount(
      <MemoryRouter initialEntries={['/home']}>
        <HomeAfterPage />
      </MemoryRouter>,
    )
  }

  it('renders brand and subtitle', () => {
    mountPage()

    cy.contains('h1', 'Efflorense').should('exist')
    cy.contains('It’s a place where your floral dreams come true').should('exist')
  })

  it('renders main action links', () => {
    mountPage()

    cy.contains('a', 'Make a bouquet')
      .should('exist')
      .and('have.attr', 'href', '/catalog')

    cy.contains('a', 'Mood constructor')
      .should('exist')
      .and('have.attr', 'href', '/mood')
  })

  it('shows location text', () => {
    mountPage()

    cy.contains('Location: Pretty girls avenue, 33').should('exist')
  })
})
