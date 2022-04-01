const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.getBlogs = async function(req, res, next) {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.status(200).json(blogs)
}

exports.createBlog = async function(req, res, next) {
  if (!req.body.title && !req.body.url) {
    return res.status(400).json({ error: 'title and url are required' })
  } else {
    const user = await User.findById(req.body.userId)

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0,
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

exports.createUser = async function(req, res, next) {
  if (req.body.password.length >= 3 && req.body.username.length >= 3) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      passwordHash: passwordHash
    })
    await user.save((err, savedUser) => {
      if (err) {
        res.status(400).json({ error: 'Username should be unique' })
      } else {
        res.status(201).json(savedUser)
      }
    })

  } else {
    res.status(400).json({ error: 'username and password must be at least 3 characters' })
  }
}

exports.getUsers = async function(req, res, next) {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  res.status(200).json(users)
}