const express = require("express");
const { connectToDB } = require("./db");
const app = express()
const MainRouter = require('./routes/index.js');
const userRouter = require("./routes/user.js");
const cors = require('cors')

connectToDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', MainRouter)
app.use('/api/v1/user', userRouter)


app.listen(4000, () => {
    console.log("connected")
})
