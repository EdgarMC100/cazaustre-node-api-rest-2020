'use strict'


const service = require('../services/jwtService');

module.exports = function isAuth(req,res,next){
    if(!req.header.authorization){
        return res.status(403).send({message: 'You don\'t have authorization'});
    }

    const token = req.headers.authorization.split(" ")[1]
    service.decodeToken(token).then((result)=>{
        req.user = result;
        next();
    }).catch((error)=>{
        res.status(error.status).send({message:error.message,error:error.error});
    });
}
