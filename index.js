'use strict'
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Product = require('./models/product');
const productRoutes = require('./routes/products_routes');


let app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended:false}));//var urlencoded = bodyParser.urlencoded({extended:false}); 
app.use(bodyParser.json());// var jsonParser = bodyParser.json(); 
app.use(productRoutes);



// app.get('/products',(req,res)=>{
//     res.send({name: "edgar"})
// })
// app.get('/products/:name',(req,res)=>{
//     res.send({message: `HI ${req.params.name}`});
// })

// mongoose.connect('mongodb://localhost/webstore', {useNewUrlParser: true,useUnifiedTopology:true});
// const db = mongoose.connection;
// db.on('error',console.error.bind(console,'connection error'));
// db.once('open',function () {
//     console.log("conexion a la base de datos establecida")
//     app.listen(port,()=>{console.log(`API REST running at http://localhost:${port}`)});
// });

mongoose.connect('mongodb://localhost/shop',{useNewUrlParser: true,useUnifiedTopology:true},(err,res)=>{
    if(err)
        return console.log(`Error al conectar a la base de datos\nError:\t${err}  `)
    console.log("conexion a la base de datos establecida")
    app.listen(port,()=>{console.log(`API REST running at http://localhost:${port}`)});
})
