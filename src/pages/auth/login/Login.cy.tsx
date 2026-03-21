import { mount } from 'cypress/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from '../../../shared/auth/AuthContext'
import LoginPage from './index'
import type React from 'react'

type LoginFn = (email: string, password: string) => Promise<void>

type ProviderOptions = {
  error?: string | null
  loading?: boolean
}

function MockAuthProvider({
  children,
  loginImpl,
  options,
}: {
  children: React.ReactNode
  loginImpl: LoginFn
  options?: ProviderOptions
}) {
  const value = {
    user: null,
    isAuth: false,
    login: loginImpl,
    register: async () => {},
    logout: () => {},
    loading: options?.loading ?? false,
    error: options?.error ?? null,
  } as any

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

describe('LoginPage', () => {
  const mountWithRouter = (loginImpl: LoginFn, options?: ProviderOptions) => {
    mount(
      <MemoryRouter initialEntries={['/auth/login']}>
        <MockAuthProvider loginImpl={loginImpl} options={options}>
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route
              path="/home-after"
              element={<div data-testid="home-after-page">Home After</div>}
            />
          </Routes>
        </MockAuthProvider>
      </MemoryRouter>,
    )
  }

  it('renders form fields and buttons', () => {
    mountWithRouter(async () => {})

    cy.contains('h1', 'Log in').should('exist')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.contains('button', 'Log in').should('exist')
    cy.contains('a', 'Registration').should('have.attr', 'href', '/auth/register')
  })

  it('submits valid credentials and navigates to home-after', () => {
    let calledWith: { email: string; password: string } | null = null

    const login: LoginFn = async (email, password) => {
      calledWith = { email, password }
    }

    mountWithRouter(login)

    cy.get('input[type="email"]').type('user@example.com')
    cy.get('input[type="password"]').type('secret123')
    cy.get('button[type="submit"]').click()

    cy.wrap(null).then(() => {
      expect(calledWith).deep.equal({
        email: 'user@example.com',
        password: 'secret123',
      })
    })

    cy.get('[data-testid="home-after-page"]').should('exist')
  })

  it('shows error message from auth context', () => {
    mountWithRouter(async () => {}, { error: 'Invalid email or password' })

    cy.contains('Invalid email or password').should('exist')
  })
})
