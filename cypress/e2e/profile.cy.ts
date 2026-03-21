/// <reference types="cypress" />

type ProfileUser = {
    email: string
    password: string
    name: string
    phone: string
  }
  
  function createProfileUser(prefix: string): ProfileUser {
    const id = Date.now()
    return {
      email: `test+${prefix}+${id}@example.com`,
      password: 'Password123!',
      name: `${prefix} User`,
      phone: '+380123456789',
    }
  }
  
  function registerProfileUser(user: ProfileUser) {
    cy.visit('/')
  
    cy.contains('a', 'Registration').click()
    cy.url().should('include', '/auth/register')
  
    cy.get('input[type="email"]').type(user.email)
    cy.get('input[type="password"]').eq(0).type(user.password)
    cy.get('input[type="password"]').eq(1).type(user.password)
  
    cy.get('input[type="text"]').eq(0).type(user.name)
    cy.get('input[type="tel"]').type(user.phone)
  
    cy.contains('button', 'Create new account').click()
    cy.url().should('include', '/home-after')
  }
  
  describe('Profile page', () => {
    it('shows user data after registration', () => {
      const user = createProfileUser('profile-view')
  
      registerProfileUser(user)
  
      cy.visit('/menu')
  
      cy.contains(/your profile/i).click()
  
      cy.contains(/profile/i).should('exist')
      cy.contains(user.email).should('exist')
      cy.contains(user.phone).should('exist')
      cy.contains(user.name).should('exist')
    })
  
    it('logs out and blocks access to menu again', () => {
      const user = createProfileUser('profile-logout')
  
      registerProfileUser(user)
  
      cy.visit('/menu')
      cy.contains(/your profile/i).click()
  
      cy.contains('button', /log out/i).click()
  
      cy.url().should('include', '/auth/login')
  
      cy.visit('/menu')
      cy.url().should('include', '/auth/login')
    })
  
    it('redirects unauthenticated user from menu to login', () => {
      cy.visit('/menu')
      cy.url().should('include', '/auth/login')
    })
  })
  