const users = require('../models/userSchema.js')

exports.Search = async (req,res) => {
    const { text } = req.body
    const data = await users.find({
        $or:[
            {
                firstName: { $regex: text, $options: 'i' }
            },
            {
                lastName: { $regex: text, $options: 'i' }
            }
        ]
    })
    res.json(data)
}