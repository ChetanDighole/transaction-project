const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('users', userSchema)
