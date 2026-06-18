var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');

/* GET users listing. */
router.get('/', blogController.list);

router.post('/', blogController.create);

router.get('/newPost', blogController.newPost);

router.get('/:postID', blogController.showPost);

module.exports = router;
