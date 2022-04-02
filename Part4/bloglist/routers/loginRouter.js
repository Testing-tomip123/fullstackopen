const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

router.post('/api/login', loginController.getLogin)

module.exports = router