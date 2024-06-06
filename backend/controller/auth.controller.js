const users = require('../models/userSchema.js')
const Account = require('../models/accountSchema.js')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const { requiredData } = require('../utils.js')

const signupBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
    username: zod.string()
})

exports.SignUp = async (req, res) => {
    try {
        const { firstName, lastName, password, username } = req.body
        const success = signupBody.safeParse(req.body)
        if (!success.success) {
            res.json({
                message: 'incorrect inputs',
                success
            })
            return
        }

        const existingUser = await users.findOne({ username })
        if (existingUser) {
            res.json({ message: 'username already taken' })
            return
        }

        const newUser = await users.create({
            username, firstName, lastName, password
        })
        const newuserId = newUser._id

        const token = await jwt.sign({
            newuserId
        }, requiredData.JWT_SECRETE)

        await Account.create({
            userId: newUser._id,
            balance: 1 + Math.random() * 10000
        })

        res.json({
            success: true,
            token: token
        })


    } catch (error) {
        console.log(error)
    }
}


exports.UpdateUser = async (req, res) => {
    try {

        const { firstName, lastName, password, username } = req.body

        const success = zod.safeParse(req.body)

        if (!success.success) {
            res.status(401).json({
                message: 'error while updating info'
            })
            return
        }

        await users.updateOne(req.body, {
            id: req.userId
        })

        res.json({
            message: 'updated successfully'
        })

    } catch (error) {
        console.log(error)
    }
}
