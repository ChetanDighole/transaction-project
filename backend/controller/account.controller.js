const account = require('../models/accountSchema.js')
const zod = require('zod')

const zodString = zod.string()

exports.GetBalance = async (req, res) => {
    const { userId } = req.body

    const success = zodString.safeParse(userId)

    if (!success.success) {
        res.json({ success, message: "userId should be in string" })
        return
    }

    const user = await account.findOne({ userId: userId })

    if (!user) {
        res.json({ message: "user not found" })
        return
    }
    res.json(user)
}