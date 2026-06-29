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
    res.render('blogView', {
        title: 'Blog',
        navItems
    });
};