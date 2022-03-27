const Blog = require('../models/blog')

exports.getBlogs = async function(req, res, next) {
  const blogs = await Blog.find({})
  res.status(200).json(blogs)
}

exports.createBlog = async function(req, res, next) {
  if (!req.body.title && !req.body.url) {
    return res.status(400).json({ error: 'title and url are required' })
  } else {
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0
    })
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  }
}