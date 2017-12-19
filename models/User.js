const mongoose = require('mongoose')
const md5 = require('md5')

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String
})


userSchema.methods.show = function () {
  console.log(`Hi! i am ${this.name}`)
}

userSchema.methods.isExists = function () {
  console.log(`Hi! i am ${this.name}`)
}

const User = mongoose.model('User', userSchema)

User.addUser = ({ username, password }, callback) => {
  const errors = []

  // validate
  if (username.length < 6 || username.length > 12) {
    errors.push('username.length < 6 || username.length > 12')
  }

  if (password.length < 6 || password.length > 12) {
    errors.push('password.length < 6 || password.length > 12')
  }

  if (errors.length !== 0) {
    return callback(errors)
  }


  User.findOne({ username }, (err, user) => {
    if (err) {
      return callback(err)
    }

    // generate token
    if (user !== null) {
      return callback(['username is exists'])
    }

    const token = Math.random().toString(16).slice(2)
    const newUser = new User({ username, password: md5(password), token })

    newUser.save((err) => {
      if (err) return callback([err])
      callback(null, { username, token })
    })

  })
}


module.exports = User

