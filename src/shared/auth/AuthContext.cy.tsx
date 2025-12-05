import { mount } from 'cypress/react'
import { AuthProvider } from './AuthContext'
import { useAuth } from './useAuth'

function AuthConsumer() {
  const { user, isAuth, login, register, logout, loading, error } = useAuth()

  return (
    <div>
      <div data-testid="is-auth">{isAuth ? 'yes' : 'no'}</div>
      <div data-testid="user-email">{user?.email ?? 'none'}</div>
      <div data-testid="loading">{loading ? 'loading' : 'idle'}</div>
      <div data-testid="error">{error ?? ''}</div>

      <button
        type="button"
        data-testid="login-btn"
        onClick={() => login('login@example.com', 'password123').catch(() => {})}
      >
        login
      </button>

      <button
        type="button"
        data-testid="register-btn"
        onClick={() =>
          register('reg@example.com', 'password123', 'Reg User', '123456789').catch(() => {})
        }
      >
        register
      </button>

      <button type="button" data-testid="logout-btn" onClick={logout}>
        logout
      </button>
    </div>
  )
}

describe('AuthProvider + useAuth', () => {
  const mountWithProvider = () =>
    mount(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    )

  it('provides default state when there is no user in localStorage', () => {
    cy.window().then((win) => {
      win.localStorage.clear()
    })

    mountWithProvider()

    cy.get('[data-testid="is-auth"]').should('have.text', 'no')
    cy.get('[data-testid="user-email"]').should('have.text', 'none')
    cy.get('[data-testid="loading"]').should('have.text', 'idle')
    cy.get('[data-testid="error"]').should('have.text', '')
  })

  it('restores user from localStorage on mount', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'test-token')
      win.localStorage.setItem('email', 'saved@example.com')
      win.localStorage.setItem('name', 'Saved User')
      win.localStorage.setItem('phone', '380000000000')
      win.localStorage.setItem('userId', '42')
    })

    mountWithProvider()

    cy.get('[data-testid="is-auth"]').should('have.text', 'yes')
    cy.get('[data-testid="user-email"]').should('have.text', 'saved@example.com')
  })

  it('login stores token and user with optional fields', () => {
    const fakeResponse = {
      accessToken: 'login-token',
      user: {
        id: 10,
        email: 'login@example.com',
        name: 'Login User',
        phone: '555-000',
      },
    }

    cy.window().then((win) => {
      cy.stub(win, 'fetch')
        .as('fetchLoginOk')
        .resolves({
          ok: true,
          json: () => Promise.resolve(fakeResponse),
        } as any)
      win.localStorage.clear()
    })

    mountWithProvider()

    cy.get('[data-testid="login-btn"]').click()

    cy.get('@fetchLoginOk').should(
      'have.been.calledWithMatch',
      'http://localhost:3000/auth/login',
    )

    cy.get('[data-testid="is-auth"]').should('have.text', 'yes')
    cy.get('[data-testid="user-email"]').should('have.text', 'login@example.com')

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('login-token')
      expect(win.localStorage.getItem('email')).to.eq('login@example.com')
      expect(win.localStorage.getItem('userId')).to.eq('10')
      expect(win.localStorage.getItem('name')).to.eq('Login User')
      expect(win.localStorage.getItem('phone')).to.eq('555-000')
    })
  })

  it('login handles user without optional fields', () => {
    const fakeResponse = {
      accessToken: 'login-no-optional',
      user: {
        id: 11,
        email: 'noname@example.com',
      },
    }

    cy.window().then((win) => {
      cy.stub(win, 'fetch')
        .as('fetchLoginNoOptional')
        .resolves({
          ok: true,
          json: () => Promise.resolve(fakeResponse),
        } as any)
      win.localStorage.clear()
    })

    mountWithProvider()

    cy.get('[data-testid="login-btn"]').click()

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('login-no-optional')
      expect(win.localStorage.getItem('email')).to.eq('noname@example.com')
      expect(win.localStorage.getItem('userId')).to.eq('11')
      expect(win.localStorage.getItem('name')).to.be.null
      expect(win.localStorage.getItem('phone')).to.be.null
    })
  })

  it('sets error when login response is not ok', () => {
    cy.window().then((win) => {
      cy.stub(win, 'fetch')
        .as('fetchLoginFail')
        .resolves({
          ok: false,
          status: 401,
          json: () => Promise.resolve({}),
        } as any)
      win.localStorage.clear()
    })

    cy.on('uncaught:exception', () => false)

    mountWithProvider()

    cy.get('[data-testid="login-btn"]').click()

    cy.get('[data-testid="error"]').should('contain', 'Login failed')
    cy.get('[data-testid="is-auth"]').should('have.text', 'no')
  })

  it('sets unknown error when login throws non Error', () => {
    cy.window().then((win) => {
      cy.stub(win, 'fetch')
        .as('fetchLoginReject')
        .rejects('network error' as any)
      win.localStorage.clear()
    })

    cy.on('uncaught:exception', () => false)

    mountWithProvider()

    cy.get('[data-testid="login-btn"]').click()

    cy.get('[data-testid="error"]').should('contain', 'Unknown error')
  })

  it('register stores token and user and navigates happy path', () => {
    const fakeResponse = {
      accessToken: 'reg-token',
      user: {
        id: 7,
        email: 'reg@example.com',
        name: 'Reg User',
        phone: '777-777',
      },
    }

    cy.window().then((win) => {
      cy.stub(win, 'fetch')
        .as('fetchRegisterOk')
        .resolves({
          ok: true,
          json: () => Promise.resolve(fakeResponse),
        } as any)
      win.localStorage.clear()
    })

    mountWithProvider()

    cy.get('[data-testid="register-btn"]').click()

    cy.get('@fetchRegisterOk').should(
      'have.been.calledWithMatch',
      'http://localhost:3000/auth/register',
    )

    cy.get('[data-testid="is-auth"]').should('have.text', 'yes')
    cy.get('[data-testid="user-email"]').should('have.text', 'reg@example.com')

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('reg-token')
      expect(win.localStorage.getItem('email')).to.eq('reg@example.com')
      expect(win.localStorage.getItem('userId')).to.eq('7')
      expect(win.localStorage.getItem('name')).to.eq('Reg User')
      expect(win.localStorage.getItem('phone')).to.eq('777-777')
    })
  })

  it('register handles user without optional fields', () => {
    const fakeResponse = {
      accessToken: 'reg-no-optional',
      user: {
        id: 8,
        email: 'reg-noname@example.com',
      },
    }

    cy.window().then((win) => {
      cy.stub(win, 'fetch')
        .as('fetchRegisterNoOptional')
        .resolves({
          ok: true,
          json: () => Promise.resolve(fakeResponse),
        } as any)
      win.localStorage.clear()
    })

    mountWithProvider()

    cy.get('[data-testid="register-btn"]').click()

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('reg-no-optional')
      expect(win.localStorage.getItem('email')).to.eq('reg-noname@example.com')
      expect(win.localStorage.getItem('userId')).to.eq('8')
      expect(win.localStorage.getItem('name')).to.be.null
      expect(win.localStorage.getItem('phone')).to.be.null
    })
  })

  it('sets error when register response is not ok', () => {
    cy.window().then((win) => {
      cy.stub(win, 'fetch')
        .as('fetchRegisterFail')
        .resolves({
          ok: false,
          status: 400,
          json: () => Promise.resolve({}),
        } as any)
      win.localStorage.clear()
    })

    cy.on('uncaught:exception', () => false)

    mountWithProvider()

    cy.get('[data-testid="register-btn"]').click()

    cy.get('[data-testid="error"]').should('contain', 'Register failed')
    cy.get('[data-testid="is-auth"]').should('have.text', 'no')
  })

  it('sets unknown error when register throws non Error', () => {
    cy.window().then((win) => {
      cy.stub(win, 'fetch')
        .as('fetchRegisterReject')
        .rejects('register network error' as any)
      win.localStorage.clear()
    })

    cy.on('uncaught:exception', () => false)

    mountWithProvider()

    cy.get('[data-testid="register-btn"]').click()

    cy.get('[data-testid="error"]').should('contain', 'Unknown error')
  })

  it('logout clears localStorage and resets user', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 't')
      win.localStorage.setItem('email', 'user@example.com')
      win.localStorage.setItem('userId', '1')
      win.localStorage.setItem('name', 'User')
      win.localStorage.setItem('phone', '123')
    })

    mountWithProvider()

    cy.get('[data-testid="is-auth"]').should('have.text', 'yes')

    cy.get('[data-testid="logout-btn"]').click()

    cy.get('[data-testid="is-auth"]').should('have.text', 'no')
    cy.get('[data-testid="user-email"]').should('have.text', 'none')

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.be.null
      expect(win.localStorage.getItem('email')).to.be.null
      expect(win.localStorage.getItem('userId')).to.be.null
      expect(win.localStorage.getItem('name')).to.be.null
      expect(win.localStorage.getItem('phone')).to.be.null
    })
  })
})
