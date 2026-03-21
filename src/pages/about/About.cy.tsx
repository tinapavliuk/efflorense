import { mount } from 'cypress/react'
import { MemoryRouter } from 'react-router-dom'
import AboutPage from './index'

describe('AboutPage', () => {
  const mountPage = () => {
    mount(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )
  }

  it('renders main sections', () => {
    mountPage()

    cy.contains('h2', 'About us').should('exist')
    cy.contains('h2', 'Our creator').should('exist')
  })

  it('mentions efflorense brand', () => {
    mountPage()

    cy.contains('efflorense').should('exist')
  })
})
