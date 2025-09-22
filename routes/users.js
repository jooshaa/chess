import express from 'express'
import {createUser, deleteUser, getAllUsers, getUserById, updateUser}  from '../controller/users.js'
import { authToken } from '../middleware/authMiddleware.js'
export const router = express.Router()

router.get('/:id',authToken, getUserById)
router.post('/',authToken, createUser)
router.get('/',authToken, getAllUsers)
router.patch('/:id', authToken, updateUser)
router.delete('/:id', authToken, deleteUser)


