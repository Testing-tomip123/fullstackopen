const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

loginRouter.getLogin = async function(req, res, next) {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jsonwebtoken.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

    res.status(200).json({ token, username: user.username, name: user.name })
}

module.exports = loginRouter
