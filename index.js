const express = require("express");
const bodyParser = require("body-parser");
let app = express();
const port = process.env.PORT || 3001;
bodyParser.text()

var jsonParser = bodyParser.json();
var urlencoded = bodyParser.urlencoded({extended:false});
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

app.get('/products',(req,res)=>{
    res.send({name: "edgar"})
})
app.get('/products/:name',(req,res)=>{
    res.send({message: `HI ${req.params.name}`});
})
//specific middleware for every  route
app.post('/products',urlencoded,(req,res)=>{
    res.send(req.body);
})

app.listen(port,()=>{console.log(`API REST running at http://localhost:${port}`)});
