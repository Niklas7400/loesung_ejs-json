var express = require('express');
var router = express.Router();
var blogApiController = require('../controllers/blogApiController');

router.get('/', blogApiController.list);

router.get('/:postID', blogApiController.show);

router.post('/', blogApiController.create);

router.put('/:postID', blogApiController.update);

router.delete('/:postID', blogApiController.delete);

module.exports = router;
