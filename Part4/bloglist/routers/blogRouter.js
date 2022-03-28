const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.get('/api/blogs', blogController.getBlogs)
router.post('/api/blogs', blogController.createBlog)
router.delete('/api/blogs/:id', blogController.deleteBlog)
router.put('/api/blogs/:id', blogController.updateBlog)

module.exports = router