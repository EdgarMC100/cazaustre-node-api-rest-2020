'use strict'
const express = require("express");

const mongoose = require("mongoose");
const Product = require('./models/product');
const productRoutes = require('./routes/products_routes');
const bodyParser = require("body-parser");
const config = require("./config")

let app = express();
app.use(bodyParser.urlencoded({extended:false}));//var urlencoded = bodyParser.urlencoded({extended:false}); 
app.use(bodyParser.json());// var jsonParser = bodyParser.json(); 
app.use(productRoutes);



mongoose.connect(config.db,{useNewUrlParser: true,useUnifiedTopology:true},(err,res)=>{
    if(err)
        return console.log(`Error al conectar a la base de datos\nError:\t${err}  `)
    console.log("conexion a la base de datos establecida")
    app.listen(config.port,()=>{console.log(`API REST running at http://localhost:${config.port}`)});
})


// mongoose.connect('mongodb://localhost/webstore', {useNewUrlParser: true,useUnifiedTopology:true});
// const db = mongoose.connection;
// db.on('error',console.error.bind(console,'connection error'));
// db.once('open',function () {
//     console.log("conexion a la base de datos establecida")
//     app.listen(port,()=>{console.log(`API REST running at http://localhost:${port}`)});
// });
