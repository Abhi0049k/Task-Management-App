const express = require('express');
const { userModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { blackTokenModel } = require('../models/blacklist.model');
require('dotenv').config();

const userRouter = express.Router();

userRouter.post('/register', async (req, res)=>{
    try{
        const data = req.body;
        const userExists = await userModel.findOne({email: data.email});
        if(userExists) return res.status(200).send({msg: 'User already exists'})
        data.password = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS));
        const newUser = new userModel(data);
        await newUser.save();
        res.send({"Msg": "New User added"});
    }catch(err){
        res.status(400).send({"err": err.message});
    }
})

userRouter.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) return res.status(400).send({msg: 'User Not Found!!!'})
        const id = user._id;
        result = await bcrypt.compare(password, user.password);
        if(result) return res.status(200).send({msg: 'Login Successfully', username: user.name, token: jwt.sign({id, email}, process.env.SECRET_KEY, {expiresIn: '7h'})});
        else return res.status(400).send({msg: 'Wrong Credentials'});
    }catch(err){
        console.log(err.message);
        res.status(400).send('Something went wrong');
    }
})

userRouter.get('/logout', async(req, res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
        let newtoken = await blackTokenModel({token});
        await newtoken.save();
        res.status(200).send({msg: 'Logout Successful'});
    }catch(err){
        console.log(err.message);
        res.status(400).send({msg: err.message});
    }
})

module.exports = {
    userRouter
}