const express = require('express');
const productController = require('../controllers/products');
const product = require('../models/product');
let router = express.Router();
const authMiddleware = require('../middlewares/auth_user');

router.route('/api/products/list').get(productController.list)
router.route('/api/products').post(productController.create).get(productController.showAll);
router.route('/api/products/new').get(productController.new);
router.route('/api/products/:id').get(productController.showById).delete(productController.destroy).put(productController.edit);


module.exports = router;