const jsonWebToken = require('jsonwebtoken')
const User = require('../models/user')

exports.tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
}

exports.userExtractor = async (request, response, next) => {
    const token = request.token
    if (token) {
        const decodedToken = jsonWebToken.verify(token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        request.user = user
    }
    next()
}



