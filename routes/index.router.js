// import userRoute from './users.js'
// import authRoute from './auth.js'
// import express from 'express'
// export const router = express.Router()

const router = require('express').Router()

const authRoute = require('./auth')
const userRoute = require('./users')
const playerRoute = require('./player')
const tournamentRoute = require('./tournament')
const tournamenPlayertRoute = require('./tournament_player')
const matchRoute = require('./match')

router.use("/auth", authRoute)
router.use("/user", userRoute)
router.use("/player", playerRoute)
router.use("/tournament", tournamentRoute)
router.use("/tournament-player", tournamenPlayertRoute)
router.use("/match", matchRoute)

module.exports = router