const express = require('express')
const md5 = require('md5')

const User = require('../../models/User')

const auth = express.Router()

// POST
auth.post('/', (req, res, next) => {
  const { username, password } = req.body

  // generate token
  const token = Math.random().toString(16).slice(2)

  User.findOneAndUpdate({ username, password: md5(password) }, { token }, (error, user) => {
    if (error) return res.json({ error })
    if (user === null) return res.json({ error: 'username or password invalid' })
    res.json({ token })
  })
})

// DELETE
auth.delete('/', (req, res, next) => {
  const { token } = req.query

  User.findOneAndUpdate({ token }, { token: '' }, (error, user) => {
    if (error) return res.json({ error })
    if (user === null) return res.json({ error: 'token invalid' })
    res.json({ result: 'success' })
  })
})

module.exports = auth