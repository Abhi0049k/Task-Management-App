const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    desc: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
},{
    versionKey: false
})

const todoModel = mongoose.model('todo', todoSchema);


module.exports = {
    todoModel
}