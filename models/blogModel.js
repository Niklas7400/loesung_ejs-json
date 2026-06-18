var fs = require('fs');
const filePath = './models/blog.json';

function loadBlog() {
    let rawData = fs.readFileSync(filePath);
    let blog;
    if (rawData.length > 0) {
        return JSON.parse(rawData);
    } else {
        return [];
    }
}
function saveBlog(blog) {
    let data = JSON.stringify(blog, null, 2);
    fs.writeFileSync(filePath, data);
}

function getAllPosts() {
    return loadBlog();
}

function getPostById(id) {
    let blog = loadBlog();
    return blog.find(post => post.id == id);
}

function addPost(post) {
    let blog = loadBlog();
    post.id = blog.length > 0 ? blog[blog.length - 1].id + 1 : 1;

    blog.push(post);
    saveBlog(blog);
    return post;
}

function updatePost(id, updatedPost) {
    let blog = loadBlog();
    let index = blog.findIndex(post => post.id == id);
    if (index === -1) {
        return null;
    }
    updatedPost.id = blog[index].id;
    blog[index] = updatedPost;
    saveBlog(blog);
    return updatedPost;
}

function deletePost(id) {
    let blog = loadBlog();
    let index = blog.findIndex(post => post.id == id);
    if (index === -1) {
        return false;
    }
    blog.splice(index, 1);
    saveBlog(blog);
    return true;
}

module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost
};
