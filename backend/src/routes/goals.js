const express = require("express")
const router = express.Router()
const GoalsController = require("../controllers/goals")

router
    .get("/", GoalsController.getGoals)
    .post("/", GoalsController.postGoal)
router
    .get("/:id", GoalsController.getSingleGoal)
    .put("/:id", GoalsController.updateGoal)
    .delete("/:id", GoalsController.deleteGoal)

module.exports = router