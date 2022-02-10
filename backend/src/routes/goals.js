const express = require("express")
const router = express.Router()
const GoalsController = require("../controllers/goals")
const { protect } = require("../middleware/auth")

router
    .get("/", protect, GoalsController.getGoals)
    .post("/", protect, GoalsController.postGoal)
router
    .get("/:id", protect, GoalsController.getSingleGoal)
    .put("/:id", protect, GoalsController.updateGoal)
    .delete("/:id", protect, GoalsController.deleteGoal)

module.exports = router