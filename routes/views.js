var express = require('express');
var router = express.Router();
var viewsController = require('../controllers/viewsController');

router.get('/blog', viewsController.list);

module.exports = router;