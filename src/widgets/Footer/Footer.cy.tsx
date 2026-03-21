import { mount } from 'cypress/react'
import { Footer } from './index'

describe('Footer', () => {
  it('renders title and brand name', () => {
    mount(<Footer />)

    cy.contains('Let moments bloom.').should('exist')
    cy.contains('Efflorense').should('exist')
  })
})
