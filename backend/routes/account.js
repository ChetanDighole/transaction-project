const express = require('express')
const { GetBalance } = require('../controller/account.controller')

const accountRout = express.Router()

accountRout.post('/balance', GetBalance)

module.exports = accountRout
