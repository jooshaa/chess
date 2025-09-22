import express from 'express'
import {createUser, deleteUser, getAllUsers, getUserById, updateUser}  from '../controller/users.js'
export const router = express.Router()

router.get('/:id', getUserById)
router.post('/', createUser)
router.get('/', getAllUsers)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)


