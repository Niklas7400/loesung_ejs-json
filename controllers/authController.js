var userModel = require('../models/userModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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

exports.register = function register(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let hashedPassword = bcrypt.hashSync(password, 10);
    userModel.addUser({ username: username, hashedPassword: hashedPassword });
    res.send("User registered");
}

exports.login = function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let user = userModel.getUserByUsername(username);
    if (user == null) {
        res.status(401).send("Invalid username");
    } else if (bcrypt.compareSync(password, user.hashedPassword)) {
        let token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/blog');
    } else {
        res.status(401).send("Invalid password");
    }
}

exports.logout = function logout(req, res) {
    res.clearCookie('token');
    res.redirect('/'); // Redirect to home page after logout
};

exports.requireLogin = function requireLogin(req, res, next) {
    let token = req.cookies.token;
    if (token==null) {
        return res.redirect('/auth/login');
    }  
    try {
        let decoded = jwt.verify(token, 'secret');
        req.user = decoded.username;
        next();
    } catch {
        return res.redirect('/auth/login');
    }
};

exports.loginPage = function loginPage(req, res) {
    res.render('login', { title: "Login", navItems });
};
