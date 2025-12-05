import { mount } from 'cypress/react'
import { MemoryRouter } from 'react-router-dom'
import NotFoundPage from './index'

describe('NotFoundPage', () => {
  const mountPage = () => {
    mount(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )
  }

  it('renders 404 title and text', () => {
    mountPage()

    cy.contains('h1', '404 missed calls').should('exist')
    cy.contains('My little flower, why are not you with us?').should('exist')
    cy.contains('sincerely yours, Tinnie').should('exist')
  })

  it('has link back to home', () => {
    mountPage()

    cy.contains('a', 'Back to home').should('have.attr', 'href', '/')
  })
})
