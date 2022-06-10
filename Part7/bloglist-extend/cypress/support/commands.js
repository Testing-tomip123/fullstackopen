/** @format */

Cypress.Commands.add('createBlog', blog => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        body: {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes,
        },
        headers: {
            Authorization: `bearer ${
                JSON.parse(localStorage.getItem('loggedBlogappUser')).token
            }`,
        },
    })
    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/login',
        body: {
            username,
            password,
        },
    }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('logout', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/logout',
        headers: {
            Authorization: `bearer ${
                JSON.parse(localStorage.getItem('loggedBlogappUser')).token
            }`,
        },
    }).then(() => {
        localStorage.removeItem('loggedBlogappUser')
        cy.visit('http://localhost:3000')
    })
})
