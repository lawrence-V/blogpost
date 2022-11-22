const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authControllers')
const isAuth = require('../middleware/isAuth')

router.post('/signin', authController.postSignin)
router.post('/login', authController.postLogin)
router.get('/user', isAuth, authController.getUser)
router.get('/logout', isAuth, authController.logoutUser)

module.exports = router
