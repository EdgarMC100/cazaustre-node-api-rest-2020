const express = require('express');
const productController = require('../controllers/products');
let router = express.Router();
const bodyParser = require("body-parser");


router.route('/api/products').post(productController.create).get(productController.showAll);
router.route('/api/products/:id').get(productController.showById).delete(productController.destroy).put(productController.edit);


module.exports = router;