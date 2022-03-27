const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogrouter = require('./controllers/blogController')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB', config.MONGODB_URI)
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/', blogrouter)

module.exports = app

