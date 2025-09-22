// import express from 'express'
// import { register, login, authentication, logout } from '../controller/auth.js' 
// import { authToken } from '../middleware/authMiddleware.js'
// export const router = express.Router()
const router = require('express').Router()
const {register, login, logout, authentication} = require('../controller/auth.js')
const { authToken } = require('../middleware/authMiddleware.js')




router.post('/register', register)
router.post('/verify-otp', authentication)
router.post('/login',  login)
router.post('/logout',  logout)

module.exports = router


