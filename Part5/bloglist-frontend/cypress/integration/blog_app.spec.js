describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.contains('cancel')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpass')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Welcome Test User')
        .and('have.css', 'background-color', 'rgb(0, 255, 0)')

      cy.contains('logout')
      cy.contains('Create Blog')
      cy.contains('Test User logged in')
      cy.contains('Blogs')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpass')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'background-color', 'rgb(255, 0, 0)')

      cy.contains('login')
      cy.contains('cancel')

    })
  })
  describe('Logout', function() {
    it('logs out', function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpass')
      cy.get('#login-button').click()
      cy.contains('logout').click()

      cy.get('.notification')
        .should('contain', 'Logged out Test User')
        .and('have.css', 'background-color', 'rgb(0, 255, 0)')

      cy.contains('login')
      cy.contains('cancel')
      cy.contains('Log in to application')
    })
  })
})