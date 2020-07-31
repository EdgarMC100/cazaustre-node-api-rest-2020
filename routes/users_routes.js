const express = require('express');
const userController = require('../controllers/user');

let router = express.Router();
router.route('/api/signup').post(userController.singUp);
router.route('/api/signin').post(userController.signIn);
module.exports = router