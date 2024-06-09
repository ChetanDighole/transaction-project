const express = require('express')
const { Hellow } = require('../controller')
const { Search } = require('../controller/test.controller')
const authMiddleware = require('../middlewares/auth.middelware')

const MainRouter = express.Router()

MainRouter.get('/', Hellow)
MainRouter.get('/search', authMiddleware, Search)


module.exports = MainRouter
