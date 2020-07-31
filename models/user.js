'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const cryptojs = require('crypto-js/md5')
const Schema = mongoose.Schema;

const UserSchema = Schema({
    email: {type: String, unique: true, lowercase:true},
    displayName: String,
    avatar: String,
    password:{type:String, select:false},
    signupDate: {type:Date,default: Date.now()},
    lastLogin: Date
});
//Antes de que se guarde
UserSchema.pre(/save/,(next)=>{
    let user = this;
    //Check if password has been modified
    // if(!user.isModified('password')) return next();

    bcrypt.genSalt(10,(err,salt,)=>{
        if(err) return next()
        bcrypt.hash(user.password,salt,null,(error,hashValue)=>{
            if(error) return next(err)
            user.password = hashValue
            next()
        });
    });
})

UserSchema.methods.gravatar = ()=>{
    if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'
    const md5 = crypto.createHash('md5').update(this.email,'utf8').digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

module.exports = mongoose.model('User',UserSchema);