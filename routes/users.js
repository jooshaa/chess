// import express from 'express'
// import {createUser, deleteUser, getAllUsers, getUserById, updateUser}  from '../controller/users.js'
// import { authToken } from '../middleware/authMiddleware.js'
// export const router = express.Router()
const router = require('express').Router()
const { getUserById, createUser, getAllUsers, updateUser, deleteUser } = require('../controller/users.js')
const {authToken } = require('../middleware/authMiddleware.js')


router.get('/:id', getUserById)
router.post('/', createUser)
router.get('/', getAllUsers)
router.patch('/:id',  updateUser)
router.delete('/:id',  deleteUser)


module.exports =router