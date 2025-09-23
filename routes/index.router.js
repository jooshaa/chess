// import userRoute from './users.js'
// import authRoute from './auth.js'
// import express from 'express'
// export const router = express.Router()

const router = require('express').Router()

const authRoute = require('./auth')
const userRoute = require('./users')

router.use("/auth", authRoute)
router.use("/user", userRoute)

module.exports = router