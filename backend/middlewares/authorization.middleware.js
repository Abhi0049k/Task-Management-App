const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorization = async (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) return res.status(400).send({msg: 'Login First'});
        req.body.email = decode.email;
        req.body.id = decode.id;
        next();
    }catch(err){
        console.log(err.message);
        res.status(400).send({msg: 'Token Not Found, Login First'});
    }
}

module.exports = {
    authorization
}