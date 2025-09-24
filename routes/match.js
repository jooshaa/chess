//
const router = require('express').Router()
const { getMatchById, createMatch, getAllMatchs, updateMatch, deleteMatch } = require('../controller/match.js')
const authToken  = require('../middleware/authMiddleware.js')


router.get('/', getAllMatchs)
router.get('/:id', getMatchById)
router.post('/', createMatch)
router.patch('/:id',  updateMatch)
router.delete('/:id',  deleteMatch)


module.exports =router