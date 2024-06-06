const mongoose = require('mongoose')
const { requiredData } = require('./utils')

exports.connectToDB = async () => {
    await mongoose.connect(requiredData.mongoURI)
    console.log('db connected')
}
