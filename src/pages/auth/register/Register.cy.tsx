import { mount } from 'cypress/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from '../../../shared/auth/AuthContext'
import RegisterPage from './index'
import type React from 'react'

type RegisterFn = (
  email: string,
  password: string,
  name?: string,
  phone?: string,
) => Promise<void>

function MockAuthProvider({
  children,
  registerImpl,
}: {
  children: React.ReactNode
  registerImpl: RegisterFn
}) {
  const value = {
    user: null,
    isAuth: false,
    login: async () => {},
    register: registerImpl,
    logout: () => {},
    loading: false,
    error: null as string | null,
  } as any

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

describe('RegisterPage', () => {
  const mountWithRouter = (registerImpl: RegisterFn) => {
    mount(
      <MemoryRouter initialEntries={['/auth/register']}>
        <MockAuthProvider registerImpl={registerImpl}>
          <Routes>
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/home-after" element={<div data-testid="home-after-page">Home After</div>} />
          </Routes>
        </MockAuthProvider>
      </MemoryRouter>,
    )
  }

  it('renders main fields and link to login', () => {
    mountWithRouter(async () => {})

    cy.contains('h1', 'Registration').should('exist')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('have.length.at.least', 2)
    cy.contains('button', 'Create new account').should('exist')
    cy.contains('a', 'Log in').should('have.attr', 'href', '/auth/login')
  })

  it('shows error when required fields are empty', () => {
    mountWithRouter(async () => {})
  
    cy.get('input[type="email"]').invoke('removeAttr', 'required')
    cy.get('input[type="password"]').eq(0).invoke('removeAttr', 'required')
    cy.get('input[type="password"]').eq(1).invoke('removeAttr', 'required')
  
    cy.get('button[type="submit"]').click()
  
    cy.contains('Please fill required fields.').should('exist')
  })
  

  it('shows error when passwords do not match', () => {
    mountWithRouter(async () => {})

    cy.get('input[type="email"]').type('user@example.com')
    cy.get('input[type="password"]').first().type('secret123')
    cy.get('input[type="password"]').eq(1).type('other456')

    cy.get('button[type="submit"]').click()

    cy.contains('Passwords do not match.').should('exist')
  })

  it('submits valid data and navigates to home-after', () => {
    let called = false

    const register: RegisterFn = async () => {
      called = true
    }

    mountWithRouter(register)

    cy.get('input[type="email"]').type('user@example.com')
    cy.get('input[type="password"]').first().type('secret123')
    cy.get('input[type="password"]').eq(1).type('secret123')
    cy.get('input[type="text"]').first().type('Tinnie')

    cy.get('button[type="submit"]').click()

    cy.wrap(null).then(() => {
      expect(called).to.eq(true)
    })

    cy.get('[data-testid="home-after-page"]').should('exist')
  })
})
