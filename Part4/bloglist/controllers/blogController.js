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

exports.deleteBlog = async function(req, res, next) {
  const blog = await Blog.findByIdAndRemove(req.params.id)
  if (blog) {
    res.status(204).json(blog)
  } else {
    res.status(404).json({ error: 'blog not found' })
  }
}

exports.updateBlog = async function(req, res, next) {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  if (updatedBlog) {
    res.status(200).json(updatedBlog)
  }
  else {
    res.status(404).json({ error: 'blog not found' })
  }
}