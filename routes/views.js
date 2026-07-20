var express = require('express');
var router = express.Router();
var viewsController = require('../controllers/viewsController');

router.get('/blog', viewsController.list);

router.get('/blog/new', viewsController.newForm);

router.get('/blog/:postID', viewsController.show);

router.get('/blog/:postID/edit', viewsController.editForm);


module.exports = router;
