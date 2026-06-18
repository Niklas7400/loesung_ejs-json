var blogModel = require('../models/blogModel');

let navItems = [
    {
        link: "/",
        name: "Home"
    },
    {
        link: "/blog",
        name: "Blog"
    },
    {
        link: "/blog/newPost",
        name: "Neuer Post"
    }
]

exports.list = function (req, res, next) {
    let sortQuery = req.query.sort ? req.query.sort : "id";
    let blog = blogModel.getAllPosts();
    let sorted;
    switch (sortQuery) {
        case 'id': sorted = blog.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)); break;
        case 'author': sorted = blog.sort((a, b) => (a.author > b.author) ? 1 : ((b.author > a.author) ? -1 : 0)); break;
        case 'date': sorted = blog.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)); break;
    }
    res.render('blog', {
        title: 'Blog',
        navItems,
        blog: sorted,
        singleView: false
    });
};
exports.create = function (req, res, next) {
    let img = req.files ? req.files.img : null;
    let uploadURL = "";
    if (img) {
        img.mv('./uploads/' + img.name);
        uploadURL = "/uploads/" + img.name;
    }
    let newPost = {
        date: new Date(),
        author: req.body.author,
        title: req.body.title,
        text: req.body.text,
        img: uploadURL
    };
    blogModel.addPost(newPost);
    res.redirect('/blog');
};
exports.newPost = function (req, res, next) {
    res.render('newPost', {
        title: 'Blog',
        navItems
    });  
};

exports.showPost = function (req, res, next) {
    let searchID = req.params.postID;
    let found = blogModel.getPostById(searchID);
    if (found) {
        //res.send(found);
        res.render('singleView', {
            title: found.title,
            navItems,
            post: found,
            singleView: true
        });
    } else {
        res.send("nicht gefunden");
    }
};