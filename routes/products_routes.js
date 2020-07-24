const express = require('express');
const productController = require('../controllers/products');
let router = express.Router();

router.route('/products').post(productController.create);
router.route('/products/:id').get(productController.show);


module.exports = router;