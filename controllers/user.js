'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services/jwtService')

module.exports = {
    singUp = (req,res)=>{
        const user = new User({
            email: require.body.email,
            displayName: req.body.displayName
        })
        user.save((err,document)=>{
            if(err) res.status(500).send({message:`Error al crear el usuario: ${err}`});
            return res.status(200).send({token:service.createToken(user),document});
        })
    },
    signIn= (req,res)=>{
        User.findOne({email:req.body.email},(err,user)=>{
            if(err)return res.status(500).send({message:`Error al logearse: ${err}`});
            if(!user)return res.status(404).send({message:`User with ${req.body.email} not found`});
            req.user = user;
            return res.status(200).send({message:'User authenticated',token:service.createToken(user)})
        });
    }
}
