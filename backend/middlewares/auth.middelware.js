const jwt = require('jsonwebtoken');
const { requiredData } = require('../utils');

const authMiddleware = async (req, res, next) => {
    try {


        const authHeader = req.header.authorization;

        if (!authHeader || !authHeader.startswith('Bearer ')) {
            res.json({})
            return
        }

        const token = authHeader.split(' ')[1];

        const decode = await jwt.verify(token, requiredData.JWT_SECRETE)

        if (decode.userId) {
            req.userId = decode.userId;
            next()
        } else {
            res.json({})
        }


    } catch (error) {
        console.log("error at authMiddleware")
    }
}

module.exports = authMiddleware