const jwt = require('jsonwebtoken');
const { requiredData } = require('../utils');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.json({})
        return
    }

    const token = authHeader.split(' ')[1];


    try {
        const decode = await jwt.verify(token, requiredData.JWT_SECRETE)

        if (decode.newuserId) {
            req.userId = decode.newuserId;
            next()
        } else {
            res.json({})
        }


    } catch (error) {
        console.log("error at authMiddleware")
    }
}

module.exports = authMiddleware