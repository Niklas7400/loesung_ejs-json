var fs = require('fs');
const filePath = './models/authUsers.json';

function loadUsers() {
    let rawData = fs.readFileSync(filePath);
    if (rawData.length > 0) {
        return JSON.parse(rawData);
    } else {
        return [];
    }
}

function saveUsers(users) {
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync(filePath, data);
}

function getUserByUsername(username) {
    let users = loadUsers();
    return users.find(user => user.username == username);
}

function addUser(user) {
    let users = loadUsers();
    users.push(user);
    saveUsers(users);
}

module.exports = {
    getUserByUsername,
    addUser
};


