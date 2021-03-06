const express = require('express')
const jwt = require('jsonwebtoken')


const User = require('../models/User')

const user = require('./api/user')
const auth = require('./api/auth')

const router = express.Router()

const jwtSecrect = process.env.JWT_SECRET

// REST api
router.use('/api/user', user)
router.use('/api/auth', auth)

// authen middleware
router.use((req, res, next) => {
  const { token } = req.cookies || {}
  if (!token) return next()
  jwt.verify(token, jwtSecrect, (err, decoded) => {
    if (err) return next(err)

    const { username } = decoded || {}
    req.username = username
    return next()
  })
})

// Main router

// GET root
router.get('/', (req, res, next) => {
  res.redirect('/home')
})

// GET home
router.get('/home', (req, res, next) => {
  const title = 'Home'
  const username = req.username
  res.render('home', { title, username })
})

// GET login
router.get('/sign-in', (req, res, next) => {
  const title = 'Login'
  const username = req.username
  if (username) return res.redirect('/home')
  res.render('sign-in', { title, username })
})

// POST login
router.post('/sign-in', (req, res, next) => {
  const title = 'Login'
  if (req.username) return res.redirect('/home')
  const { username, password } = req.body

  User.auth({ username, password }, (err, token) => {
    if (err) return res.render('sign-in', { title, err })
    res.cookie('token', token, { maxAge: 30*24*60*60*1000 })
    res.redirect('/home')
  })
})

// GET register
router.get('/sign-up', (req, res, next) => {
  const title = 'Create Account'
  if (req.username) return res.redirect('/home')
  res.render('sign-up', { title })
})

// POST register
router.post('/sign-up', (req, res, next) => {
  const title = 'Create Account'
  if (req.username) return res.redirect('/home')

  const { username, password, rePassword } = req.body
  if (password !== rePassword) return res.render('sign-up', { title: 'Sign Up', err: 'Re-type password not match' })

  User.addUser({ username, password }, (err, payload) => {
    if (err) {
      res.render('sign-up', { title, err })
    } else {
      res.cookie('token', payload.token, { maxAge: 30*24*60*60*100 })
      res.redirect('/home')
    }
  })
})

// GET logout
router.get('/sign-out', (req, res, next) => {
  res.cookie('token', '', { maxAge: -1 })
  res.redirect('/sign-in')
})

module.exports = router
