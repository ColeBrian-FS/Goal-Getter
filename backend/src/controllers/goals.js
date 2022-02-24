const asyncHandler = require("express-async-handler")
const validtation = require("../config/validation")
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
        validtation.notBlank(400, req.body.text, 'Please enter a goal', res)

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

        // Finds goal by id and checks if exist
        const goal = await Goal.findById(req.params.id)
        validtation.notBlank(400, goal, 'Goal not found', res)

        // Find user by id and checks if exists
        const user = await User.findById(req.user.id)
        validtation.notBlank(401, user, 'User not found ', res)

        // Comparing goal Id to user Id 
        validtation.comparingIds(401, goal.user.toString(), user.id, 'User not authorized', res)

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedGoal)
    })
    // @desc Delete Goal
    // @route DELETE /api/goals/1
    // @access Private
    deleteGoal = asyncHandler(async (req, res) => {

        // Finds goal by id and checks if exist
        const goal = await Goal.findById(req.params.id)
        validtation.notBlank(400, goal, 'Goal not found', res)

        // Find user by id and checks if exists
        const user = await User.findById(req.user.id)
        validtation.notBlank(401, user, 'User not found ', res)

        // Comparing goal Id to user Id 
        validtation.comparingIds(401, goal.user.toString(), user.id, 'User not authorized', res)

        const deleteGoal = await Goal.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteGoal)
    })
}





module.exports = new GoalsController()