function deletePost(id) {
    const index = blog.findIndex(post => post.id === id);
    if (index !== -1) {
        blog.splice(index, 1);
        return { status: 200, message: "deleted" };
    } else {
        return { status: 404, message: "not found" };
    }
}

router.get('/blog/:id/edit', requireLogin, blogController.editForm);

router.delete('/api/blog/:id', requireLogin, blogController.deletePost);

async function loadUserWithPosts(userId) {
    const [user, posts] = await Promise.all([
        User.findByPk(userId),
        Post.findAll({ where: { userId: userId } }) 
    ]);
    return { user, posts };
}

function isValidPLZ(input) {
    const plzRegex = /^\d{5}$/;
    return plzRegex.test(input);
}

async function getUserData(req, res) {
    let user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "not found" });
    }
}
function filterPostsByAuthor(author) {
    const filteredPosts = blog.filter(post => post.author === author);
    return filteredPosts;
}

function getPost(id) {
    const post = blog.find(p => p.id === id);
    if (post) {
        return { status: 200, data: post };
    } else {
        return { status: 404, message: "not found" };
    }
}

function updatePost(id, updates) {
    const post = blog.find(post => post.id === id);
    if (post) {
        const updatedPost = Object.assign(post, updates);
        return { status: 200, data: updatedPost };
    } else {
        return { status: 404, message: "not found" };
    }   
}

function logRequest(req, res, next) {
    console.log(new Date().toISOString()+" - "+req.method+" "+req.originalUrl);
    next();
};


async function getUserWithPosts(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "not found" });
  }
  res.json(user);
}

router.post('/login', (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ error: "token ungültig" });
  }
});

async function getPostsByAuthor(authorName) {
    const posts = await Post.findAll({ where: { author: authorName } });
    return posts;
}

async function updatePostTitle(id, newTitle) {
    const post = await Post.findByPk(id);
    post.title = newTitle;
    await post.save();
}

router.patch('/:id', async (req, res) => {
    await Post.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'updated' });
});

function sortPostsByDateDesc(posts) {
    const copy = [];
    for (let i = 0; i < posts.length; i++) {
        copy.push(posts[i]);
    }
    return copy.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function requestLogger(req, res, next) {
    console.log(req.method + " " + req.originalUrl);
    next();
};

router.post('/users', async (req, res) => {
    try {
        const user = await User.create({ username: req.body.username, email: req.body.email });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

async function deleteAllPostsByAuthor(authorName) {
    await Post.destroy({ where: { author: authorName } });
}

function countPostsByAuthor(authorName){
    return blog.filter(post => post.author === authorName).length;
}

router.get('/api/posts/count/:author', (req, res) => {
    const count = countPostsByAuthor(req.params.author.trim());
    res.json({ count });
});

router.get('/todos/:id', (req, res) => {
    let searchID = req.params.id;
    let found = todos.find(todos => todos.id == searchID);
        if (found) {
            res.status(200).json(found);
        } else {
            res.status(404).json({ error: "not found" });
        }
});

function parsePrice(input) {
    const parseResult = parseFloat(input);
    if (isNaN(parseResult)) {
        return null;
    }
    return parseResult;
}

app.get('/api/users', (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

function requireAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'unauthorized' });
  }
}

function getUserRole(user) {
  if (user.role === 'admin') {
    return 'Admin-Zugriff';
  }
  return 'Standard-Zugriff';
}

function isValidAge(input) {
    const age = parseInt(input);
    if (isNaN(age) || age < 0 || age > 120) {
        return false;
    }
    return true;
}
