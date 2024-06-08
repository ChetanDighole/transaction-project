const { mongoose } = require('mongoose')
const account = require('../models/accountSchema.js')
const zod = require('zod')

const zodString = zod.string()

exports.GetBalance = async (req, res) => {
    const userId = req.userId

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


exports.Transfer = async (req, res) => {

    // start a session
    const session = await mongoose.startSession();
    session.startTransaction();

    const { ammount, to } = req.body;

    const giver = await account.findOne({ userId: req.userId }).session(session); //link session to a specific session this will undo the chage if transaction fails

    if (!giver || ammount > giver.balance) {
        await session.abortTransaction();
        res.json({ message: "transaction failed as giver not detected or ammount is larger than balance" })
        return
    }

    const receiver = await account.findOne({ userId: to }).session(session); //link session to a specific session this will undo the chage if transaction fails

    if (!receiver) {
        await session.abortTransaction(); //abortingthe transaction
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await account.updateOne({ userId: req.userId }, { $inc: { balance: -ammount } }).session(session);
    await account.updateOne({ userId: to }, { $inc: { balance: ammount } }).session(session);

    await session.commitTransaction(); // before commiting the transaction all the changes are the changes are run on local machines and db operations are memorised in transaction context
    res.json({
        message: "Transfer successful"
    });
}
