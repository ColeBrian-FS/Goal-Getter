const asyncHandler = require("express-async-handler")
const Goal = require("../models/goal")
const User = require("../models/user")
// @desc Goals Controller
class GoalsController {
    // @desc Get Goals
    // @route GET /api/goals
    // @access Private
    getGoals = asyncHandler(async (req, res) => {
        const goals = await Goal.find({ user: req.user.id })
        res.status(200).json(goals)

    })
    // @desc Get Goal
    // @route GET /api/goals/1
    // @access Private
    getSingleGoal = asyncHandler(async (req, res) => {
        const goal = await Goal.findById(req.params.id)
        res.status(200).json(goal)

    })
    // @desc Set Goal
    // @route POST /api/goals
    // @access Private
    postGoal = asyncHandler(async (req, res) => {

        // checks if text is not blank 
        if (!req.body.text) {
            res.status(400)
            throw new Error("Please enter a goal")
        }

        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id
        })
        console.log(req.body)
        res.status(200).json(goal)

    })

    // @desc Update Goal
    // @route PUT /api/goals/1
    // @access Private
    updateGoal = asyncHandler(async (req, res) => {

        const goal = await Goal.findById(req.params.id)

        // checks if goals exist
        if (!goal) {
            res.status(400)
            throw new Error("Goal Not Found")
        }
        const user = await User.findById(req.user.id)

        // Check if user exist
        if (!user) {
            res.status(401)
            throw new ('User not found')

        }
        // checks login user matches goal user 
        if (goal.user.toString() !== user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedGoal)

    })
    // @desc Delete Goal
    // @route DELETE /api/goals/1
    // @access Private
    deleteGoal = asyncHandler(async (req, res) => {
        const goal = await Goal.findById(req.params.id)

        // checks if goals exist
        if (!goal) {
            res.status(400)
            throw new Error("Goal Not Found")
        }
        const user = await User.findById(req.user.id)
        // Check if user exist
        if (!user) {
            res.status(401)
            throw new ('User not found')
        }

        // checks login user matches goal user 
        if (goal.user.toString() !== user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }

        const deleteGoal = await Goal.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteGoal)
    })
}





module.exports = new GoalsController()