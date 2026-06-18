var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var authController = require('../controllers/authController');

/* GET users listing. */
router.get('/', blogController.list);

router.post('/', authController.requireLogin, blogController.create);

router.get('/newPost', authController.requireLogin, blogController.newPost);

router.get('/:postID', blogController.showPost);

module.exports = router;
