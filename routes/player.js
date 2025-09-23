//
const router = require('express').Router()
const { getPlayerById, createPlayer, getAllPlayers, updatePlayer, deletePlayer } = require('../controller/player.js')
const authToken  = require('../middleware/authMiddleware.js')


router.get('/', getAllPlayers)
router.get('/:id', getPlayerById)
router.post('/', createPlayer)
router.patch('/:id',  updatePlayer)
router.delete('/:id',  deletePlayer)


module.exports =router