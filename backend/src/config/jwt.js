// generate user token
const jwt = require("jsonwebtoken")

const geterateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}
const decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}
module.exports = { geterateToken, decodeToken }