const express = require("express")
const router = express.Router()
const userController = require("../controllers/users")
const { protect } = require("../middleware/auth")

router.post('/', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/me', protect, userController.getMe)

module.exports = router
