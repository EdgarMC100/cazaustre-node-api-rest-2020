const express = require('express');
const userController = require('../controllers/user');
const user = require('../models/user');

let router = express.Router();
router.route('/api/signup').post(userController.singUp);
router.route('/api/signin').post(userController.signIn);
router.route('/api/login').get(userController.logIn);

module.exports = router