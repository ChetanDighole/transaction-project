const express = require('express')
const { Hellow } = require('../controller')
const { Search } = require('../controller/test.controller')

const MainRouter = express.Router()

MainRouter.get('/', Hellow)
MainRouter.post('/search', Search)


module.exports = MainRouter
