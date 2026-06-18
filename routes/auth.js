var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/login', authController.loginPage);

module.exports = router;
