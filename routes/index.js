var express = require('express');
var router = express.Router();
var fs = require('fs');

let navItems = [
  {
    link: "/",
    name: "Home"
  },  
  {
    link: "/drei",
    name: "Ohne Benutzer"
  },  
  {
    link: "/list",
    name: "Benutzerliste"
  },
  {
    link: "/",
    name: "hallo"
  },{
    link: "/blog",
    name: "Blog"
  },
]

function loadModel() {
    let rawData = fs.readFileSync('./models/users.json');
    let blog;
    if (rawData.length > 0) {
        return JSON.parse(rawData);
    } else {
        return [];
    }
}
let users = loadModel();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',
    {
      title: 'Express',
      username: 'Manuel',
      url: '/zwei',
      linkname: 'zu Seite 2',
      navItems
    }
  );
});
router.get('/zwei', function (req, res, next) {
  res.render('index',
    {
      title: 'Express',
      username: 'Manuel',
      url: '/',
      linkname: 'zu Hauptseite',
      navItems
    }
  );
});
// Aufgabe 1
router.get('/drei', function (req, res, next) {
  res.render('index',
    {
      title: 'Express',
      url: '/',
      linkname: 'zu Hauptseite',
      navItems
    }
  );
});

router.get('/list', function (req, res, next) {
  res.render('index',
    {
      title: 'Express',
      url: '/',
      linkname: 'zu Hauptseite',
      list: users,
      navItems
    }
  );
});

router.get('/names', function (req, res, next) {
  let name = req.query.name;
  console.log(name);
  res.send("Name:" + name);
});

router.get('/:year/:month/:day', function (req, res, next) {
  let year = req.params.year;
  let month = req.params.month;
  let day = req.params.day;
  console.log("" + day + "." + month + "." + year);
  res.send("" + day + "." + month + "." + year);
});

router.get('/names/:year/:month/:day', function (req, res, next) {
  let year = req.params.year;
  let month = req.params.month;
  let day = req.params.day;
  let name = req.query.name;
  console.log("Name:" + name + " -> " + day + "." + month + "." + year);
  res.send("Name:" + name + " -> " + day + "." + month + "." + year);
});

module.exports = router;
