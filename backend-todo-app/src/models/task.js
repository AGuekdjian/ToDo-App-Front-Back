const { Schema, model } = require('mongoose')

const TaskSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("Task", TaskSchema, "tasks")