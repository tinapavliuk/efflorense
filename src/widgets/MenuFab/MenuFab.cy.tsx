import { mount } from 'cypress/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import MenuFab from './MenuFab'

function renderAt(path: string) {
  mount(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="*" element={<MenuFab />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('MenuFab', () => {
  it('is hidden on home page "/"', () => {
    renderAt('/')

    cy.contains('Menu').should('not.exist')
  })

  it('is hidden on auth pages', () => {
    renderAt('/auth/login')
    cy.contains('Menu').should('not.exist')

    renderAt('/auth/register')
    cy.contains('Menu').should('not.exist')
  })

  it('is hidden on menu page itself', () => {
    renderAt('/menu')

    cy.contains('Menu').should('not.exist')
  })

  it('is visible on catalog page', () => {
    renderAt('/catalog')

    cy.contains('a', 'Menu')
      .should('exist')
      .and('have.attr', 'href', '/menu')
      .and('have.attr', 'aria-label', 'Open menu')
  })
})
