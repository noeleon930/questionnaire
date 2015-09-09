var db = require('./connect_db');

var groups = db.collection('groups');

module.exports = groups;
