const jwt = require('jsonwebtoken')

const authorization = async (req, res, next) => {
    if(!req.headers.access_token) {
        throw new Error()
    }

    try {
        const decoded = await jwt.verify(
            req.headers.access_token,
            'JWT_SECRET'
        )

        if(decoded) {
            next()
        }

    } catch (error) {
        next(error)
    }
}

module.exports = authorization