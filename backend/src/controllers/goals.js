const asynchandler = require("express-async-handler")
// @desc Goals Controller
class GoalsController {
    // @desc Get Goals
    // @route GET /api/goals
    // @access Private
    getGoals = asyncHandler(async (req, res) => {
        res.status(200).json({ msg: "Get Goals" })

    })
    // @desc Get Goal
    // @route GET /api/goals/1
    // @access Private
    getSingleGoal = asyncHandler(async (req, res) => {

        res.status(200).json({ msg: `Get Goal ${req.params.id} ` })

    })
    // @desc Set Goal
    // @route POST /api/goals
    // @access Private
    postGoal = asyncHandler(async (req, res) => {

        // if (!req.body.text) {
        //     res.status(400)
        //     throw new Error("Please enter a goal")
        // }
        console.log(req.body)
        res.status(200).json({ msg: "Set Goals" })
    })

    // @desc Update Goal
    // @route PUT /api/goals/1
    // @access Private
    updateGoal = asyncHandler(async (req, res) => {
        res.status(200).json({ msg: `Update Goals ${req.params.id}` })

    })
    // @desc Delete Goal
    // @route DELETE /api/goals/1
    // @access Private
    deleteGoal = asyncHandler(async (req, res) => {
        res.status(200).json({ msg: `Delete Goals ${req.params.id}` })
    })
}





module.exports = new GoalsController()