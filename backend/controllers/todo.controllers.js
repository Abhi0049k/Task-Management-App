const { todoModel } = require('../models/todos.model');

const allTasks = async (req, res)=>{
    try{
        const {email} = req.body;
        const data = await todoModel.find({email});
        res.status(200).send(data);
    }catch(err){
        res.status(400).send({"err": "Something went wrong!!!"});
    }
}

const addTask = async (req, res)=>{
    try{
        const {email, task, desc} = req.body;
        const newTask = new todoModel({email, task, desc});
        await newTask.save();
        res.status(201).send({"msg": "Task has been added in the database"});
    }catch(err){
        console.log(err);
        res.status(500).send({"err": "Something went Wrong!!"});
    }
}

const updateTask = async (req, res)=>{
    try{
        const {id} = req.params;
        const body = req.body;
        await todoModel.findByIdAndUpdate({_id: id}, body);
        res.status(200).send({"msg": "Changes made in the task"});
    }catch(err){
        res.status(400).send({"err": "Something went wrong!!!"});
    }
}

const deleteTask = async (req, res)=>{
    try{
        const {id} = req.params;
        await todoModel.findByIdAndDelete({_id: id});
        res.status(200).send({"msg": "Task deleted"});
    }catch(err){
        res.status(400).send({"err": "Something went wrong!!!"});
    }
}

module.exports = {
    allTasks, addTask, updateTask, deleteTask
}