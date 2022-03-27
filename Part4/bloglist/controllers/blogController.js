const Blog = require('../models/blog')

exports.getBlogs = function(req, res, next) {
  Blog.find({})
    .then(blogs => {
      res.json(blogs)
    })
    .catch(err => {
      next(err)
    })
}

exports.createBlog = function(req, res, next) {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  })
  blog.save()
    .then(blog => {
      res.json(blog)
    })
    .catch(err => {
      next(err)
    })
}