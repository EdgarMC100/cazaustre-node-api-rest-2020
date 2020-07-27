const Product = require('../models/product');
const product = require('../models/product');

module.exports = {
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
    showAll: (req,res)=>{
        Product.find((err,products)=>{
            if(err)return res.status(500).send({message:`Error al realizar la peticion ${error}`})
            if(!products) retun.status(200).send({message:`There are not products`})
            res.status(200).send({products})
        }) //check if return a promise
    },
    showById:async (req,res)=>{
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
    edit:(req,res)=>{
        let _id = req.params.id;
        Product.updateOne({_id},{name:req.body.name},(error,result)=>{
            if(error) return res.status(500).send({message:`Error al realizar la peticion`});
            if(!result) return res.status(400).send({message:`Product doesn't exist`});
            return res.status(200).send({message:`Product updated succesfully`,result});
        })
    },
    destroy:(req,res)=>{
        let productId = req.params.id;
        Product.findByIdAndDelete(productId,(err,product)=>{
            if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}`});
            if(!product) return res.status(400).send({message:`El producto no fue eliminado`})
            res.status(200).send({message:`Producto ${product.name} eliminado con exito`,product})
        })
    }
}