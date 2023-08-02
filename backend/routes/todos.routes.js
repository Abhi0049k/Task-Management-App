const express = require('express');
const { authorization } = require('../middlewares/authorization.middleware');
const { allTasks, addTask, updateTask, deleteTask } = require('../controllers/todo.controllers');

const todoRouter = express.Router();

todoRouter.use(authorization);

todoRouter.get('/', allTasks)

todoRouter.post('/add', addTask)

todoRouter.patch('/update/:id', updateTask)

todoRouter.delete('/delete/:id', deleteTask)

module.exports = {
    todoRouter
}