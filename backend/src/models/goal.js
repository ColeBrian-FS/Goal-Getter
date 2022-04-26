const mongoose = require("mongoose")

const goalSchema = mongoose.Schema({
    // Relation to User Model 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        require: ['true', 'please add a name value'],
    },
    description: {
        type: String,
        require: ['true', 'please add a description value'],
    },
    goal: {
        type: String,
        require: ['true', 'please add a goal value'],
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)