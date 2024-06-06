const express = require('express')
const { SignUp, UpdateUser } = require('../controller/auth.controller')
const authMiddleware = require('../middlewares/auth.middelware')

const userRouter = express.Router()

userRouter.post('/signup', SignUp)
userRouter.put('/updateUser', authMiddleware, UpdateUser)

module.exports = userRouter
