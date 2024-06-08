const express = require('express')
const { GetBalance, Transfer } = require('../controller/account.controller')
const authMiddleware = require('../middlewares/auth.middelware')

const accountRout = express.Router()

accountRout.get('/balance', authMiddleware, GetBalance)
accountRout.post('/transfer', authMiddleware, Transfer)

module.exports = accountRout
