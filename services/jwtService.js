'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
module.exports = {
    encodeToken:(user)=>{
        const payload = {
            sub: user._id,
            iat: moment().unix(),//issued at - emitido en 
            exp: moment().add(14,'days').unix(),//token expiration
        }

        return jwt.encode(payload,config.SECRET_TOKEN)
    },
    decodeToken:(token)=>{
        const decoded = new Promise((resolve,reject)=>{
            try {
                const payload = jwt.decode(token,config.SECRET_TOKEN)
                if(payload.exp <= moment().unix()){
                    reject({
                        status: 401,
                        message:'Token expired',
                    });
                }
                resolve(payload.sub);
            } catch (error) {
                reject({
                    status:500,
                    message:'Invalid Token',
                    error
                });
            }
        });
        return decoded;
    }
}