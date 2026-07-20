let navItems = [
    {
        link: "/",
        name: "Home"
    },
    {
        link: "/views/blog",
        name: "Blog"
    },
    {
        link: "/views/blog/new",
        name: "Neuer Post"
    }
]

exports.list = function (req, res, next) {
    res.render('blogView', {
        title: 'Blog',
        navItems
    });
};

exports.newForm = function (req, res, next) {
    res.render('postEditView', {
        title: 'Neuer Post',
        navItems
    });
}

exports.editForm = function (req, res, next) {
    res.render('postEditView', {
        postID: req.params.postID,
        title: 'Post bearbeiten',
        navItems
    });
}

exports.show = function (req, res, next) {
    res.render('postView', {
        postID: req.params.postID,
        title: 'Post anzeigen',
        navItems
    });
}
