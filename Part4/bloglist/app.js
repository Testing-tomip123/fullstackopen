const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./routers/blogRouter')
const loginRouter = require('./routers/loginRouter')
const userRouter = require('./routers/userRouter')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB', config.MONGODB_URI)
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/', blogRouter)
app.use('/', loginRouter)
app.use('/', userRouter)

module.exports = app

