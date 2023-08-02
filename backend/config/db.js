const mongoose = require('mongoose');
require('dotenv').config();

const connection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connection Established');
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {
    connection
}