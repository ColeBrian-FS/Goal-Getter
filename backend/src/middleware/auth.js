const { decodeToken } = require("../config/jwt")
// const asyncHanlder = require("express-async-handler")
const User = require("../models/user")

const protect = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            // getting bearer token
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decode = decodeToken(token)

            // Get user from thw token
            req.user = await User.findById(decode.id).select('-password')

            // runs the next middleware
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json("Not authorized")
        }
    }

    if (!token) {
        res.status(401).json("Not Authorizd, no token")
    }

}
module.exports = { protect }