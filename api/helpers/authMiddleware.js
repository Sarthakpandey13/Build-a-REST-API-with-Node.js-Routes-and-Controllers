require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
    const authheader = req.headers.authorization
    const token = authheader && authheader.split(' ')[1]
    if (token == null) return res.status(401)

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return res.status(402)

        next()
    })

}