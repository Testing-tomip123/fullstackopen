const User = require('../models/user')
const bcrypt = require('bcrypt')

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