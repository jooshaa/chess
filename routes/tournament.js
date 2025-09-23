//
const router = require('express').Router()
const { getTournamentById, createTournament, getAllTournaments, updateTournament, deleteTournament } = require('../controller/tournament.js')
const authToken  = require('../middleware/authMiddleware.js')


router.get('/', getAllTournaments)
router.get('/:id', getTournamentById)
router.post('/', createTournament)
router.patch('/:id',  updateTournament)
router.delete('/:id',  deleteTournament)


module.exports =router