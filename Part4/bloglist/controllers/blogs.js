const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => { logger.info(error.message) 
      response.status(400).send({ error: 'Error fetching blogs' })
    })
})

blogRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => {
      logger.info(error.message)
      response.status(400).send({ error: error.message })
    })
})

module.exports = blogRouter