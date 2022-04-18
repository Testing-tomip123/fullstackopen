const Blog = require('../models/blog')
const User = require('../models/user')
const jsonWebToken = require('jsonwebtoken')


exports.getBlogs = async function(req, res, next) {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.status(200).json(blogs)
}

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

exports.createBlog = async function(req, res, next) {
  if (!req.body.title || !req.body.url) {
    return res.status(400).json({ error: 'title and url are required' })
  } else {
    var token = getTokenFrom(req)
    const decodedToken = jsonWebToken.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes  || 0,
      user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

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