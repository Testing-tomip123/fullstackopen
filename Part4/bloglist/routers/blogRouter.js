const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.get('/api/blogs', blogController.getBlogs)

router.post('/api/blogs', blogController.createBlog)

module.exports = router