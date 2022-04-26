const { hash, compare } = require('../config/hash')
const { geterateToken } = require("../config/jwt")
const asyncHanlder = require("express-async-handler")
const User = require("../models/user")
// @desc Register new user 
// @route POST /api/users
// @access Public 

class userController {
    // Password Verfication
    registerUser = asyncHanlder(async (req, res) => {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(400)
                .json('Please add all fields')
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400)
                .json('User Already exists')
        }

        // Hash pasword 
        const hashedPassword = await hash(10, password)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: geterateToken(user._id)
            })
        }
        else {
            res.status(400)
                .json('Invalid user data')
        }
    })
    // @desc Register new user 
    // @route POST /api/users
    // @access Public 
    loginUser = asyncHanlder(async (req, res) => {
        const { email, password } = req.body
        // check for user email 
        const user = await User.findOne({ email })
        // compares user and client password and db password 

        if (user && (await compare(password, user.password))) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: geterateToken(user._id)
            })
        }
        else {
            res.status(400)
                .json('Invalid credentials')
        }
    })

    // @desc Register new user 
    // @route POST /api/users
    // @access Public 
    getMe = asyncHanlder(async (req, res) => {
        const { _id, name, email } = await User.findById(req.user.id)
        res.status(200)
            .json({
                id: _id,
                name,
                email
            })
    })
}
module.exports = new userController()