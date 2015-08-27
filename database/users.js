var db = require('./connect_db');

var users = db.collection('users');

module.exports = users;
