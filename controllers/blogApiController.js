var blogModel = require('../models/blogModel');
var { validatePost } = require('../validators/blogValidator');

exports.list = function (req, res, next) {
    let sortQuery = req.query.sort ? req.query.sort : "id";
    let blog = blogModel.getAllPosts();
    let sorted;
    switch (sortQuery) {
        case 'id': sorted = blog.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)); break;
        case 'author': sorted = blog.sort((a, b) => (a.author > b.author) ? 1 : ((b.author > a.author) ? -1 : 0)); break;
        case 'date': sorted = blog.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)); break;
    }
    res.status(200).json(sorted);
};

exports.show = function (req, res, next) {
    let searchID = req.params.postID;
    let found = blogModel.getPostById(searchID);
    if (found) {
        res.status(200).json(found);
    } else {
        res.status(404).json({ error: "Post not found" });
    }
};

exports.create = function (req, res, next) {
    let errors = validatePost(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    let newPost = {
        date: new Date(),
        author: req.body.author,
        title: req.body.title,
        email: req.body.email,
        text: req.body.text,
    };
    blogModel.addPost(newPost);
    res.status(201).json(newPost);
};

exports.update = function (req, res, next) {
    let errors = validatePost(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    let searchID = req.params.postID;
    let found = blogModel.updatePost(searchID, req.body);
    if (found) {
        res.status(200).json(found);
    } else {
        res.status(404).json({ error: "Post not found" });
    }
};

exports.delete = function (req, res, next) {
    let searchID = req.params.postID;
    let success = blogModel.deletePost(searchID);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Post not found" });
    }
};  
