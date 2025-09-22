import express from 'express'
import { register, login, authentication, logout } from '../controller/auth.js' 
import { authToken } from '../middleware/authMiddleware.js'
export const router = express.Router()


router.post('/register', register)
router.post('/verify-otp', authentication)
router.post('/login', authToken, login)
router.post('/logout', authToken, logout)


