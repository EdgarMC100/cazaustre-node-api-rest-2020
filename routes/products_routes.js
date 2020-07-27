const express = require('express');
const productController = require('../controllers/products');
let router = express.Router();

router.route('/products').post(productController.create).get(productController.showAll);
router.route('/products/:id').get(productController.showById).delete(productController.destroy).put(productController.edit);


module.exports = router;