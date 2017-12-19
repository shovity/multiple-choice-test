const express = require('express')

const user = require('./api/user')
const auth = require('./api/auth')

const router = express.Router()

// REST api
router.use('/api/user', user)
router.use('/api/auth', auth)

// Main router
router.get('/', (req, res, next) => {
  res.render('home')
})

module.exports = router