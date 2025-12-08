describe('Static pages & routing', () => {
  it('redirects guest to login when opening About page', () => {
    cy.visit('/about')

    cy.url().should('include', '/auth/login')
  })

  it('shows Not Found page for unknown route', () => {
    cy.visit('/some/unknown/route-123')

    cy.contains('404 missed calls').should('exist')
  })
})
