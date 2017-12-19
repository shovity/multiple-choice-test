const express = require('express')

const User = require('../../models/User')

const user = express.Router()

// POST
user.post('/', (req, res, next) => {
  const { username, password } = req.body
  User.addUser({ username, password }, (errors, user) => {
    res.json({ errors, user })
  })
})

// GET
user.get('/', (req, res, next) => {
  const { token } = req.query
  User.findOne({ token }, (errors, user) => {
    if (user === null) return res.json({ error: 'token invalid' })
    res.json({ username: user.username })
  })
})



module.exports = user