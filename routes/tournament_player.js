//
const router = require('express').Router()
const { createTournament_player, getAllTournament_players, updateTournament_player, getTournament_playerById, deleteTournament_player } = require('../controller/tournament_player.js')
const authToken  = require('../middleware/authMiddleware.js')


router.get('/', getAllTournament_players)
router.get('/:id', getTournament_playerById)
router.post('/', createTournament_player)
router.patch('/:id', updateTournament_player)
router.delete('/:id',  deleteTournament_player)


module.exports =router