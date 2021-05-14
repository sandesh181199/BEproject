const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken =  (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).json({message : 'Unauthorised'});
    }
    let token = req.headers.authorization;
    let payload = jwt.verify(token,config.secretKey);
    if(!payload){
        return res.status(401).json({message : 'Unauthorised'});
    }
    req.payload  = payload;
    next();
}

module.exports.verifyToken = verifyToken;