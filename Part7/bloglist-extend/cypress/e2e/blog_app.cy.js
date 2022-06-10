/** @format */

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Test User',
            username: 'testuser',
            password: 'testpass',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function () {
        cy.contains('Log in to application')
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
        cy.contains('cancel')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
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
        it('fails with wrong credentials', function () {
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
    describe('Logout', function () {
        it('logs out', function () {
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
    describe('When logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'testuser',
                password: 'testpass',
            }).then(response => {
                localStorage.setItem(
                    'loggedBlogappUser',
                    JSON.stringify(response.body)
                )
                cy.visit('http://localhost:3000')
            })
        })

        it('A blog can be created', function () {
            cy.contains('Create Blog').click()
            cy.get('#title').type('Test Blog')
            cy.get('#author').type('Test Author')
            cy.get('#url').type('www.test.com')
            cy.get('#likes').type('6')
            cy.get('#create-button').click()

            cy.contains('Test Blog')
            cy.contains('Test Author')
        })
        it('A blog can be liked', function () {
            cy.contains('Create Blog').click()
            cy.get('#title').type('Test Blog')
            cy.get('#author').type('Test Author')
            cy.get('#url').type('www.test.com')
            cy.get('#likes').type('6')
            cy.get('#create-button').click()

            cy.contains('Test Blog')
            cy.contains('Test Author')
            cy.contains('show').click()
            cy.get('.like').click()
            cy.contains('likes 7')
        })
        it('A blog can be deleted', function () {
            cy.contains('Create Blog').click()
            cy.get('#title').type('Test Blog')
            cy.get('#author').type('Test Author')
            cy.get('#url').type('www.test.com')
            cy.get('#likes').type('6')
            cy.get('#create-button').click()

            cy.contains('Test Blog')
            cy.contains('Test Author')
            cy.contains('show').click()
            cy.get('.delete').click()

            cy.on('window:confirm', () => true)

            cy.get('.notification')
                .should('contain', 'Blog Test Blog by Test Author deleted')
                .and('have.css', 'background-color', 'rgb(0, 255, 0)')

            cy.contains('Test Blog').should('not.exist')
        })
    })
    describe('Blog with most likes is first', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'testuser',
                password: 'testpass',
            }).then(response => {
                localStorage.setItem(
                    'loggedBlogappUser',
                    JSON.stringify(response.body)
                )
                cy.visit('http://localhost:3000')
            })
            const blog1 = {
                title: 'Test Blog 1',
                author: 'Test Author 1',
                url: 'www.test.com',
                likes: 6,
            }
            const blog2 = {
                title: 'Test Blog 2',
                author: 'Test Author 2',
                url: 'www.test.com',
                likes: 5,
            }

            const blog3 = {
                title: 'Test Blog 3',
                author: 'Test Author 3',
                url: 'www.test.com',
                likes: 7,
            }

            cy.createBlog(blog1)
            cy.createBlog(blog2)
            cy.createBlog(blog3)
        })
        it('blogs are sorted by likes', function () {
            cy.get('.blog').eq(0).should('contain', 'Test Blog 3')
            cy.get('.blog').eq(1).should('contain', 'Test Blog 1')
            cy.get('.blog').eq(2).should('contain', 'Test Blog 2')
        })
    })
})
