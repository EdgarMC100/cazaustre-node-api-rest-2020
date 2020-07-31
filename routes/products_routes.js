const express = require('express');
const productController = require('../controllers/products');
let router = express.Router();


router.route('/api/products').post(productController.create).get(productController.showAll);
router.route('/api/products/:id').get(productController.showById).delete(productController.destroy).put(productController.edit);


module.exports = router;