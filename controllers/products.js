const Product = require('../models/product');
const product = require('../models/product');
module.exports = {
    show:async (req,res)=>{
        let productId = req.params.id;
        //Using Promises
        // Product.findById(productId).exec().then((result)=>{
        //     res.status(200).send(result)
        // }).catch(error=>{
        //     res.status(500).send(error)
        // })

        //Using Async/Await
        try {
            let product = await Product.findById(productId).exec();
            if(!product) return res.status(400).send({message:`El producto no existe`});
            res.status(200).send(product);

        } catch (error) {
            if(error) return res.status(500).send({message:`Error al realizar la peticion ${error}`});

        }

        //Using Callback
        // Product.findById(productId,(err,product)=>{
        //     if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}`});
        //     if(!product) return res.status(400).send({message:`El producto no existe`});
        //     res.status(200).send(product);
        // });
    },
    create: (req,res)=>{
            console.log(req.body);
            let product = new Product();    
            product.name = req.body.name;
            product.picture = req.body.picture;
            product.price = req.body.price;
            product.category = req.body.category;
            product.description = req.body.description;
            product.save((err,product)=>{
                if(err) res.status(500).send({message:'Error al guardarlo en la base de datos',errorType:err});
                res.status(200).send({product});
            })
    },
    destroy:()=>{

    }
}