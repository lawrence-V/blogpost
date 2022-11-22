const express = require('express')
const route = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const key = require('../../config/keys').secret
const User = require('../../models/User')

// @route post  api/users/regiter
// @desc Register the User
// @access Public

route.post('/register', (req, res) => {
  let { name, username, email, password, confirm_password } = req.body
  if (password !== confirm_password) {
    return res.status(400).json({
      msg: 'Password do not match',
    })
  }

  //   Check for the unique User
  User.findOne({ username: username }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: 'Username is already taken',
      })
    }
  })

  //   Check for the unique Email

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: 'Email is already registered',
      })
    }
  })

  // The data is valid and new we can register the user
  let newUser = new User({
    name,
    username,
    password,
    email,
  })

  //   Hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash
      newUser.save().then((user) => {
        return res.status(201).json({
          success: true,
          msg: 'User is now registered ',
        })
      })
    })
  })
})

// @route post  api/users/login
// @desc Signin the User
// @access Public

route.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: 'username is not found',
        success: false,
      })
    }
    // If there is user we are now going to compare the password against the
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // Users password is correct and we need to sed the JSON Token for that user
        const payload = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        }
        jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
          res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            msg: 'Hurry you are logged in',
          })
        })
      } else {
        return res.status(404).json({
          msg: 'Incorrect password',
          success: false,
        })
      }
    })
  })
})

// @route post  api/users/profile
// @desc return the users data
// @access private

route.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.json({
      user: req.user,
    })
  }
)

module.exports = route
